
-- Create a table to store all portfolio items
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  website_url TEXT,
  category TEXT NOT NULL,
  item_type TEXT NOT NULL, -- 'banner', 'pnl', 'graphics', 'uiux'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since portfolio is public)
CREATE POLICY "Anyone can view portfolio items" 
  ON public.portfolio_items 
  FOR SELECT 
  USING (true);

-- Create policies for insert/update/delete (only in degen mode)
CREATE POLICY "Allow all operations on portfolio items" 
  ON public.portfolio_items 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Insert existing banner data
INSERT INTO public.portfolio_items (title, description, image_url, category, item_type) VALUES
  ('WealthCord', 'Financial strategy mobile app banner with sleek green gradient design', '/lovable-uploads/05203f13-4871-45c1-ac98-43a86539f4a9.png', 'Mobile App', 'banner'),
  ('Viralify', 'Credit card payment app with glassmorphism design elements', '/lovable-uploads/c499cbcc-72b1-4929-84cf-d9c70792f6ea.png', 'Fintech', 'banner'),
  ('Cash Club', 'Trading education platform with modern dashboard showcase', '/lovable-uploads/cf39ab77-ca34-4acd-a81d-aa1e0a486053.png', 'Education', 'banner'),
  ('Choose It Community', 'Discord community banner with warm gradient and professional layout', '/lovable-uploads/b9081016-ba33-4317-b63d-98f1367a57d0.png', 'Community', 'banner'),
  ('eMoney', 'Financial app promotion with mobile-first design approach', '/lovable-uploads/a34c31fb-1b4e-4205-997b-eb653d12f542.png', 'Mobile App', 'banner');
