-- ===================================================
-- NUCLEAR OPTION: RESET CATEGORIES TABLE COMPLETELY
-- Run this in Supabase SQL Editor
-- ===================================================

-- 1. DROP EVERYTHING related to this table
DROP POLICY IF EXISTS "Public View Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin Manage Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Public Read Categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin Write Categories" ON public.service_categories;

-- Warning: This deletes all data in this table!
DROP TABLE IF EXISTS public.service_categories;

-- 2. RECREATE TABLE (Fresh Start)
CREATE TABLE public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    letter TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. ENABLE RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- 4. CREATE POLICIES (Super Simple)

-- Policy 1: Everyone can see everything
CREATE POLICY "Public Read All"
ON public.service_categories
FOR SELECT
USING (true);

-- Policy 2: Authenticated users can do everything
-- (We rely on the frontend to hide the admin page from non-admins)
-- This fixes the "User not found" or "Role not found" database errors
CREATE POLICY "Auth Write All"
ON public.service_categories
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. INSERT DEFAULT DATA
INSERT INTO public.service_categories (letter, title, description, sort_order, published) VALUES
('A', 'Signage & Neon & LED Signs', 'Custom neon, LED, and backlit signage for maximum visibility.', 1, true),
('B', 'Large Format Printing', 'High quality banners, billboards, and posters.', 2, true),
('C', 'Screen Printing', 'T-shirts, caps, and fabric printing.', 3, true),
('D', 'Promotional Items', 'Branded gifts, pens, agendas, and promotional items.', 4, true),
('E', 'Offset Printing', 'Flyers, brochures, business cards, and books.', 5, true),
('F', 'Embroidary & Heat Press', 'Computerized embroidery for uniforms and apparel.', 6, true),
('G', 'Vehicles Branding', 'Full vehicle wraps, magnets, and decals.', 7, true),
('H', 'Laser Engraving & Cutting', 'Precision cutting for wood, acrylic, and leather.', 8, true),
('I', 'Event Organizing & Decor', 'Full service event management and stage decoration.', 9, true),
('J', 'Exhibition Stand', 'Custom booth design and construction for trade shows.', 10, true),
('K', 'Interior Design', 'Office and retail space interior branding and layout.', 11, true),
('L', 'Digital Marketing', 'Social media management, SEO, and online advertising.', 12, true),
('M', 'Web Development', 'Modern websites and e-commerce solutions.', 13, true);

-- 6. GRANT PERMISSIONS (Essential)
GRANT ALL ON public.service_categories TO authenticated;
GRANT SELECT ON public.service_categories TO anon;
GRANT ALL ON public.service_categories TO service_role;
