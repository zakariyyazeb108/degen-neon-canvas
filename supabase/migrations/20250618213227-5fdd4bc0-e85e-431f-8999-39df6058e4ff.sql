
-- Remove the foreign key constraint from degen_sessions table
-- This allows us to insert temporary user IDs for degen mode without requiring actual auth users
ALTER TABLE public.degen_sessions DROP CONSTRAINT IF EXISTS degen_sessions_user_id_fkey;

-- Also remove the foreign key constraint from upload_logs table for consistency
ALTER TABLE public.upload_logs DROP CONSTRAINT IF EXISTS upload_logs_user_id_fkey;
