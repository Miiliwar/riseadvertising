-- NUCLEAR RESET TO FIX SCHEMA CACHE
-- WARNING: This will drop current services data.

-- 1. Drop existing tables to start clean
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.service_categories CASCADE;

-- 2. Recreate Categories Table
CREATE TABLE public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Recreate Services Table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    long_description TEXT,
    price_range TEXT,
    icon_name TEXT,
    image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Public Read Categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Admin Manage Categories" ON public.service_categories FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Admin Manage Services" ON public.services FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- 6. Grant Permissions
GRANT ALL ON TABLE public.service_categories TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.services TO postgres, anon, authenticated, service_role;

-- 7. Insert Initial Categories
INSERT INTO public.service_categories (title, description, order_index) VALUES
('A. Signage & Neon & LED Signs', 'High-impact signage that attracts attention day and night.', 1),
('B. OUTDOOR SIGNAGE', 'Strong visibility for shops, buildings, and public spaces.', 2),
('C. 3D SIGNAGE (INDOOR)', 'Premium 3D lettering for professional interiors.', 3),
('D. INDOOR SIGNAGE', 'Clean, modern signage for offices and interiors.', 4),
('E. MARKETING & PROMOTIONAL ITEMS', 'Everyday items that advertise your business.', 5),
('F. BRANDING MATERIALS', 'Brand visibility beyond the office.', 6),
('G. DISPLAY & PROMOTIONAL PRODUCTS', 'Portable displays that promote your brand anywhere.', 7),
('H. T-SHIRTS & APPAREL PRINTING', 'Custom apparel for branding and promotion.', 8),
('I. BANNERS & LARGE FORMAT PRINTING', 'High-quality prints for maximum visibility.', 9),
('J. STICKERS & VINYL PRINTING', 'Durable and attractive sticker solutions.', 10),
('K. PRINTING & BUSINESS MATERIALS', 'Professional print for everyday business needs.', 11),
('L. DESIGN & MARKETING SERVICES', 'Creative support for your brand.', 12),
('M. PRODUCTION, INSTALLATION & SUPPORT', 'From factory to final installation.', 13);

-- 8. Final Notify
NOTIFY pgrst, 'reload schema';
