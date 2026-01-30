-- FORCE FIX CATEGORIES AND POLICIES
-- Run this in Supabase SQL Editor to ensure categories are visible

-- 1. Ensure Table Exists
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    letter TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Force Enable RLS but clear old policies first to avoid conflicts
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public View Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Anyone can view published service_categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin Manage Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can view all service_categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can manage service_categories" ON public.service_categories;

-- 3. Create Simple, Permissive Policies
-- Allow anyone to read published categories
CREATE POLICY "Public View Categories" 
ON public.service_categories 
FOR SELECT 
USING (true); 

-- Allow admins to do everything
CREATE POLICY "Admin Manage Categories" 
ON public.service_categories 
FOR ALL 
TO authenticated 
USING (public.is_admin_or_editor(auth.uid())) 
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- 4. Delete existing data to prevent duplicates if any partial data exists
DELETE FROM public.service_categories;

-- 5. Insert Fresh Data
INSERT INTO public.service_categories (letter, title, description, sort_order, published) VALUES
('A', 'Outdoor Signage', 'High-quality outdoor branding and signage solutions including billboards, shop fronts, and directional signs.', 1, true),
('B', 'Indoor Branding', 'Interior branding, glass frosting, wall graphics, and reception signage for your business office.', 2, true),
('C', 'Vehicle Branding', 'Turn your vehicle into a moving billboard with full vinyl wraps or magnetic stickers.', 3, true),
('D', 'Promotional Items', 'Customized gifts, corporate giveaways, pens, mugs, and branded apparel.', 4, true),
('E', 'Digital Printing', 'High-resolution digital printing for flyers, brochures, business cards, and posters.', 5, true),
('F', 'Offset Printing', 'Large volume offset printing for books, magazines, and corporate stationery.', 6, true);

-- 6. Ensure Services have matching tags so they appear inside the categories
-- We update the 'tags' array column in the 'services' table to match the category format "Letter. Title"
UPDATE public.services 
SET tags = ARRAY['A. Outdoor Signage'] 
WHERE slug IN ('pvc-banners', '3d-signage', 'billboards', 'light-boxes');

UPDATE public.services 
SET tags = ARRAY['B. Indoor Branding'] 
WHERE slug IN ('rollup-banners', 'backdrops', 'wall-graphics', 'glass-frosting');

UPDATE public.services 
SET tags = ARRAY['D. Promotional Items'] 
WHERE slug IN ('sticker-printing', 'custom-prints', 'mugs', 't-shirts');

-- 7. Add 'features' column to services if missing (Critical for page load)
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
