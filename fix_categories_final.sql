-- ==========================================
-- FIX CATEGORIES: PERMISSIONS AND DATA
-- Run this ENTIRE script in Supabase SQL Editor
-- ==========================================

-- 1. Create table permissions helper function (if missing)
-- This checks the checks directly against user_roles to be safe
CREATE OR REPLACE FUNCTION public.check_user_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND (role = 'admin' OR role = 'editor')
  );
$$;

-- 2. Clean up Policies
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public View Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin Manage Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Anyone can view published service_categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can view all service_categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can manage service_categories" ON public.service_categories;

-- 3. Create SIMPLE Policies
-- VIEW: Everyone can see everything (we filter hidden ones on frontend if needed)
CREATE POLICY "Public Read Categories"
ON public.service_categories
FOR SELECT
USING (true);

-- MODIFY: Only admins/editors can Insert/Update/Delete
CREATE POLICY "Admin Write Categories"
ON public.service_categories
FOR ALL
TO authenticated
USING (
  (SELECT COUNT(*) FROM public.user_roles WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'editor')) > 0
)
WITH CHECK (
  (SELECT COUNT(*) FROM public.user_roles WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'editor')) > 0
);

-- 4. Initial Seed Data (Only if empty)
INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'A', 'Signage & Neon & LED Signs', 'Custom neon, LED, and backlit signage for maximum visibility.', 1, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'A');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'B', 'Large Format Printing', 'High quality banners, billboards, and posters.', 2, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'B');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'C', 'Screen Printing', 'T-shirts, caps, and fabric printing.', 3, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'C');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'D', 'Corporate Giveaways', 'Branded gifts, pens, agendas, and promotional items.', 4, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'D');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'E', 'Offset Printing', 'Flyers, brochures, business cards, and books.', 5, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'E');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'F', 'Embroidary & Heat Press', 'Computerized embroidery for uniforms and apparel.', 6, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'F');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'G', 'Vehicles Branding', 'Full vehicle wraps, magnets, and decals.', 7, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'G');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'H', 'Laser Engraving & Cutting', 'Precision cutting for wood, acrylic, and leather.', 8, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'H');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'I', 'Event Organizing & Decor', 'Full service event management and stage decoration.', 9, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'I');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'J', 'Exhibition Stand', 'Custom booth design and construction for trade shows.', 10, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'J');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'K', 'Interior Design', 'Office and retail space interior branding and layout.', 11, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'K');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'L', 'Digital Marketing', 'Social media management, SEO, and online advertising.', 12, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'L');

INSERT INTO public.service_categories (letter, title, description, sort_order, published)
SELECT 'M', 'Web Development', 'Modern websites and e-commerce solutions.', 13, true
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'M');

-- 5. Grant Permissions just in case
GRANT ALL ON public.service_categories TO authenticated;
GRANT SELECT ON public.service_categories TO anon;
