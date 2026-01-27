-- Create service_categories table for admin-editable categories
CREATE TABLE public.service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  letter TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view published categories
CREATE POLICY "Anyone can view published categories"
  ON public.service_categories
  FOR SELECT
  USING (published = true);

-- Admin/editors can view all categories
CREATE POLICY "Admin/editors can view all categories"
  ON public.service_categories
  FOR SELECT
  USING (is_admin_or_editor(auth.uid()));

-- Admin/editors can manage categories
CREATE POLICY "Admin/editors can manage categories"
  ON public.service_categories
  FOR ALL
  USING (is_admin_or_editor(auth.uid()))
  WITH CHECK (is_admin_or_editor(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON public.service_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.service_categories (letter, title, description, sort_order) VALUES
  ('A', 'Signage & Neon & LED Signs', 'High-impact signage that attracts attention day and night.', 1),
  ('B', 'Outdoor Signage', 'Strong visibility for shops, buildings, and public spaces.', 2),
  ('C', '3D Signage (Indoor)', 'Premium 3D lettering for professional interiors.', 3),
  ('D', 'Indoor Signage', 'Clean, modern signage for offices and interiors.', 4),
  ('E', 'Marketing & Promotional Items', 'Everyday items that advertise your business.', 5),
  ('F', 'Branding Materials', 'Brand visibility beyond the office.', 6),
  ('G', 'Display & Promotional Products', 'Portable displays that promote your brand anywhere.', 7),
  ('H', 'T-Shirts & Apparel Printing', 'Custom apparel for branding and promotion.', 8),
  ('I', 'Banners & Large Format Printing', 'High-quality prints for maximum visibility.', 9),
  ('J', 'Stickers & Vinyl Printing', 'Durable and attractive sticker solutions.', 10),
  ('K', 'Printing & Business Materials', 'Professional print for everyday business needs.', 11),
  ('L', 'Design & Marketing Services', 'Creative support for your brand.', 12),
  ('M', 'Production, Installation & Support', 'From factory to final installation.', 13);