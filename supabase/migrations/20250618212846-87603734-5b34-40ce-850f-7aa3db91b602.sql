
-- Update RLS policies for degen_sessions to allow direct inserts for degen mode
-- Remove the existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own degen sessions" ON public.degen_sessions;
DROP POLICY IF EXISTS "Users can insert their own degen sessions" ON public.degen_sessions;
DROP POLICY IF EXISTS "Users can update their own degen sessions" ON public.degen_sessions;

-- Create more permissive policies that allow degen mode functionality
CREATE POLICY "Allow degen session creation" 
  ON public.degen_sessions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow degen session validation" 
  ON public.degen_sessions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow degen session updates" 
  ON public.degen_sessions 
  FOR UPDATE 
  USING (true);

-- Update upload_logs policies to be more permissive for degen mode
DROP POLICY IF EXISTS "Users can view their own upload logs" ON public.upload_logs;
DROP POLICY IF EXISTS "Users can insert their own upload logs" ON public.upload_logs;

CREATE POLICY "Allow upload log creation" 
  ON public.upload_logs 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow upload log viewing" 
  ON public.upload_logs 
  FOR SELECT 
  USING (true);
