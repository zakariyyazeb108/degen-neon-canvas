
-- Create a table to store Degen Mode access permissions
CREATE TABLE public.degen_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  is_degen_user BOOLEAN NOT NULL DEFAULT false,
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  granted_by UUID REFERENCES auth.users,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to track Degen Mode sessions for additional security
CREATE TABLE public.degen_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  activated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '24 hours'),
  ip_address TEXT,
  user_agent TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to log all upload activities for security auditing
CREATE TABLE public.upload_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  action TEXT NOT NULL, -- 'upload', 'edit', 'delete'
  item_type TEXT NOT NULL, -- 'banner', 'uiux', 'pnl', 'graphics'
  item_id TEXT NOT NULL,
  item_data JSONB,
  session_token TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.degen_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.degen_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upload_logs ENABLE ROW LEVEL SECURITY;

-- Policies for degen_permissions (only admins can manage these)
CREATE POLICY "Only system can manage degen permissions" 
  ON public.degen_permissions 
  FOR ALL 
  USING (false);

-- Policies for degen_sessions (users can only see their own sessions)
CREATE POLICY "Users can view their own degen sessions" 
  ON public.degen_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own degen sessions" 
  ON public.degen_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own degen sessions" 
  ON public.degen_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policies for upload_logs (users can only see their own logs)
CREATE POLICY "Users can view their own upload logs" 
  ON public.upload_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own upload logs" 
  ON public.upload_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to check if user has valid degen access
CREATE OR REPLACE FUNCTION public.check_degen_access(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.degen_permissions dp
    WHERE dp.user_id = check_degen_access.user_id
    AND dp.is_degen_user = true
    AND (dp.expires_at IS NULL OR dp.expires_at > now())
  );
$$;

-- Create a function to validate degen session
CREATE OR REPLACE FUNCTION public.validate_degen_session(session_token TEXT)
RETURNS TABLE(user_id UUID, is_valid BOOLEAN)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    ds.user_id,
    (ds.is_active AND ds.expires_at > now() AND dp.is_degen_user = true) as is_valid
  FROM public.degen_sessions ds
  JOIN public.degen_permissions dp ON ds.user_id = dp.user_id
  WHERE ds.session_token = validate_degen_session.session_token
  LIMIT 1;
$$;
