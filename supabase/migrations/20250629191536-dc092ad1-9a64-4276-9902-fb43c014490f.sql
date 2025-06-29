
-- Add function to reset rate limit for debugging/admin purposes
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
