
-- Add a secure validation system for degen sessions
-- Create a function to generate cryptographically secure session tokens
CREATE OR REPLACE FUNCTION public.generate_secure_token()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    token TEXT;
BEGIN
    -- Generate a cryptographically secure random token
    SELECT encode(gen_random_bytes(32), 'hex') INTO token;
    RETURN token;
END;
$$;

-- Create a function to validate degen sessions with proper security checks
CREATE OR REPLACE FUNCTION public.validate_degen_session_secure(session_token TEXT)
RETURNS TABLE(is_valid BOOLEAN, user_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (ds.is_active AND ds.expires_at > now()) as is_valid,
        ds.user_id
    FROM public.degen_sessions ds
    WHERE ds.session_token = validate_degen_session_secure.session_token
    AND ds.is_active = true
    AND ds.expires_at > now()
    LIMIT 1;
END;
$$;

-- Create a function to create a secure degen session
CREATE OR REPLACE FUNCTION public.create_degen_session(p_user_id UUID)
RETURNS TABLE(session_token TEXT, expires_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_token TEXT;
    expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Generate secure token
    SELECT generate_secure_token() INTO new_token;
    
    -- Set expiry time (24 hours from now)
    SELECT now() + interval '24 hours' INTO expiry_time;
    
    -- Deactivate any existing sessions for this user
    UPDATE public.degen_sessions 
    SET is_active = false 
    WHERE user_id = p_user_id;
    
    -- Create new session
    INSERT INTO public.degen_sessions (
        user_id,
        session_token,
        expires_at,
        ip_address,
        user_agent,
        is_active
    ) VALUES (
        p_user_id,
        new_token,
        expiry_time,
        'client_side',
        'browser',
        true
    );
    
    RETURN QUERY SELECT new_token, expiry_time;
END;
$$;
