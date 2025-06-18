
-- Enhanced security for degen sessions with IP tracking and rate limiting
CREATE TABLE public.session_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  last_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to session attempts
ALTER TABLE public.session_attempts ENABLE ROW LEVEL SECURITY;

-- Only system can manage session attempts
CREATE POLICY "System manages session attempts" 
  ON public.session_attempts 
  FOR ALL 
  USING (false);

-- Create function to check and log failed attempts
CREATE OR REPLACE FUNCTION public.check_rate_limit(client_ip TEXT)
RETURNS TABLE(is_blocked BOOLEAN, remaining_attempts INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    attempt_record RECORD;
    max_attempts INTEGER := 5;
    block_duration INTERVAL := '1 hour';
BEGIN
    -- Get or create attempt record
    SELECT * INTO attempt_record 
    FROM public.session_attempts 
    WHERE ip_address = client_ip;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.session_attempts (ip_address, attempt_count)
        VALUES (client_ip, 0);
        RETURN QUERY SELECT false::BOOLEAN, max_attempts;
        RETURN;
    END IF;
    
    -- Check if currently blocked
    IF attempt_record.blocked_until IS NOT NULL AND attempt_record.blocked_until > now() THEN
        RETURN QUERY SELECT true::BOOLEAN, 0;
        RETURN;
    END IF;
    
    -- If block period has passed, reset attempts
    IF attempt_record.blocked_until IS NOT NULL AND attempt_record.blocked_until <= now() THEN
        UPDATE public.session_attempts 
        SET attempt_count = 0, blocked_until = NULL, last_attempt = now()
        WHERE ip_address = client_ip;
        RETURN QUERY SELECT false::BOOLEAN, max_attempts;
        RETURN;
    END IF;
    
    -- Return current status
    RETURN QUERY SELECT 
        (attempt_record.attempt_count >= max_attempts)::BOOLEAN,
        GREATEST(0, max_attempts - attempt_record.attempt_count);
END;
$$;

-- Create function to record failed attempt
CREATE OR REPLACE FUNCTION public.record_failed_attempt(client_ip TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    max_attempts INTEGER := 5;
    block_duration INTERVAL := '1 hour';
    current_attempts INTEGER;
BEGIN
    -- Update attempt count
    UPDATE public.session_attempts 
    SET 
        attempt_count = attempt_count + 1,
        last_attempt = now(),
        blocked_until = CASE 
            WHEN attempt_count + 1 >= max_attempts 
            THEN now() + block_duration 
            ELSE blocked_until 
        END
    WHERE ip_address = client_ip;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.session_attempts (ip_address, attempt_count, blocked_until)
        VALUES (
            client_ip, 
            1, 
            CASE WHEN 1 >= max_attempts THEN now() + block_duration ELSE NULL END
        );
    END IF;
END;
$$;

-- Enhanced session validation with additional security checks
CREATE OR REPLACE FUNCTION public.validate_degen_session_advanced(
    session_token TEXT,
    client_ip TEXT DEFAULT 'unknown',
    user_agent_header TEXT DEFAULT 'unknown'
)
RETURNS TABLE(is_valid BOOLEAN, user_id UUID, security_level TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    session_record RECORD;
    security_score INTEGER := 0;
    security_level_result TEXT := 'low';
BEGIN
    -- Get session record
    SELECT * INTO session_record
    FROM public.degen_sessions ds
    WHERE ds.session_token = validate_degen_session_advanced.session_token
    AND ds.is_active = true
    AND ds.expires_at > now()
    LIMIT 1;
    
    -- If no valid session found
    IF NOT FOUND THEN
        RETURN QUERY SELECT false::BOOLEAN, NULL::UUID, 'invalid'::TEXT;
        RETURN;
    END IF;
    
    -- Calculate security score based on various factors
    -- IP consistency check
    IF session_record.ip_address = client_ip THEN
        security_score := security_score + 2;
    END IF;
    
    -- User agent consistency check
    IF session_record.user_agent = user_agent_header THEN
        security_score := security_score + 1;
    END IF;
    
    -- Session age check (newer sessions are more secure)
    IF session_record.activated_at > (now() - interval '1 hour') THEN
        security_score := security_score + 1;
    END IF;
    
    -- Determine security level
    IF security_score >= 3 THEN
        security_level_result := 'high';
    ELSIF security_score >= 2 THEN
        security_level_result := 'medium';
    ELSE
        security_level_result := 'low';
    END IF;
    
    -- Log the validation attempt
    INSERT INTO public.upload_logs (
        user_id,
        action,
        item_type,
        item_id,
        session_token,
        ip_address,
        user_agent,
        item_data
    ) VALUES (
        session_record.user_id,
        'session_validation',
        'security_check',
        session_record.id::TEXT,
        session_token,
        client_ip,
        user_agent_header,
        jsonb_build_object(
            'security_score', security_score,
            'security_level', security_level_result,
            'validation_time', now()
        )
    );
    
    RETURN QUERY SELECT true::BOOLEAN, session_record.user_id, security_level_result;
END;
$$;
