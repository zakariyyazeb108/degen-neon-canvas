
-- Fix rate limiting to be more reasonable and add reset functionality
CREATE OR REPLACE FUNCTION public.check_rate_limit(client_ip TEXT)
RETURNS TABLE(is_blocked BOOLEAN, remaining_attempts INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    attempt_record RECORD;
    max_attempts INTEGER := 10; -- Increased from 5 to 10
    block_duration INTERVAL := '15 minutes'; -- Reduced from 1 hour to 15 minutes
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

-- Update record_failed_attempt function with new limits
CREATE OR REPLACE FUNCTION public.record_failed_attempt(client_ip TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    max_attempts INTEGER := 10; -- Increased from 5 to 10
    block_duration INTERVAL := '15 minutes'; -- Reduced from 1 hour to 15 minutes
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

-- Add function to reset attempts for debugging/admin purposes
CREATE OR REPLACE FUNCTION public.reset_rate_limit(client_ip TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.session_attempts 
    SET attempt_count = 0, blocked_until = NULL, last_attempt = now()
    WHERE ip_address = client_ip;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.session_attempts (ip_address, attempt_count)
        VALUES (client_ip, 0);
    END IF;
END;
$$;

-- Clear all current blocks to give everyone a fresh start
UPDATE public.session_attempts 
SET attempt_count = 0, blocked_until = NULL, last_attempt = now();
