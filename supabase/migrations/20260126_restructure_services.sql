-- Create service_categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure UNIQUE constraint on title if table already exists without it
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'service_categories_title_key') THEN
        BEGIN
            ALTER TABLE public.service_categories ADD CONSTRAINT service_categories_title_key UNIQUE (title);
        EXCEPTION WHEN others THEN
            RAISE NOTICE 'Could not add unique constraint, might already exist or duplicates exist';
        END;
    END IF;
END $$;

-- Add category_id to services table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'services' AND COLUMN_NAME = 'category_id') THEN
        ALTER TABLE public.services ADD COLUMN category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Enable RLS on service_categories
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_categories
CREATE POLICY "Anyone can view service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage service categories" ON public.service_categories FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Insert Categories
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
('M. PRODUCTION, INSTALLATION & SUPPORT', 'From factory to final installation.', 13)
ON CONFLICT (title) DO NOTHING;

-- Insert Services and Link to Categories
-- This is a bit tricky without IDs, so I'll use a subquery for category IDs

-- A. Signage & Neon & LED Signs
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('3D Lightbox Signage', '3d-lightbox-signage'),
    ('3D Illuminated Lettering', '3d-illuminated-lettering'),
    ('Custom Neon Light Signs', 'custom-neon-light-signs'),
    ('LED Illuminated Lightbox', 'led-illuminated-lightbox'),
    ('LED Neon Signage', 'led-neon-signage'),
    ('Single-Side Lightbox', 'single-side-lightbox'),
    ('Double-Side Lightbox', 'double-side-lightbox')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'A. Signage & Neon & LED Signs') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- B. OUTDOOR SIGNAGE
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Shop Front Signage', 'shop-front-signage'),
    ('Building Signage', 'building-signage'),
    ('Billboard Signage', 'billboard-signage'),
    ('Pylon Signage', 'pylon-signage')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'B. OUTDOOR SIGNAGE') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- C. 3D SIGNAGE (INDOOR)
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('3D Foam Lettering', '3d-foam-lettering'),
    ('3D Foam Acrylic Lettering', '3d-foam-acrylic-lettering'),
    ('3D Illuminated Lettering (Indoor)', '3d-illuminated-lettering-indoor')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'C. 3D SIGNAGE (INDOOR)') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- D. INDOOR SIGNAGE
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Reception Signage', 'reception-signage'),
    ('Acrylic Reception Signage', 'acrylic-reception-signage'),
    ('Directional & Wayfinding Signs', 'directional-wayfinding-signs'),
    ('Wall Branding', 'wall-branding')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'D. INDOOR SIGNAGE') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- E. MARKETING & PROMOTIONAL ITEMS
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Caps', 'caps'),
    ('Pens (Standard & Premium)', 'pens-standard-premium'),
    ('Keychains', 'keychains'),
    ('Notebooks', 'notebooks'),
    ('Mugs', 'mugs')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'E. MARKETING & PROMOTIONAL ITEMS') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- F. BRANDING MATERIALS
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Vehicle Branding', 'vehicle-branding'),
    ('Window Branding', 'window-branding'),
    ('Office Branding', 'office-branding')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'F. BRANDING MATERIALS') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- G. DISPLAY & PROMOTIONAL PRODUCTS
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Roll-Up Banners', 'roll-up-banners-display'),
    ('X-Stand Displays', 'x-stand-displays'),
    ('Pop-Up Displays', 'pop-up-displays'),
    ('Promotional Flags', 'promotional-flags'),
    ('Small Desk Flags', 'small-desk-flags')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'G. DISPLAY & PROMOTIONAL PRODUCTS') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- H. T-SHIRTS & APPAREL PRINTING
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('T-Shirt Cotton 100%', 't-shirt-cotton-100'),
    ('T-Shirt (Color - MG)', 't-shirt-color-mg'),
    ('Polo T-Shirt (White - MG)', 'polo-t-shirt-white-mg'),
    ('Cotton T-Shirt (Color)', 'cotton-t-shirt-color')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'H. T-SHIRTS & APPAREL PRINTING') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- I. BANNERS & LARGE FORMAT PRINTING
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Standard Banner Printing', 'standard-banner-printing'),
    ('Flex Banner Printing', 'flex-banner-printing'),
    ('Event Backdrop Banner', 'event-backdrop-banner'),
    ('Billboard Banner Printing', 'billboard-banner-printing'),
    ('Gazebo Tent', 'gazebo-tent'),
    ('Foldable Backdrop Stand', 'foldable-backdrop-stand'),
    ('Mesh Banner Printing', 'mesh-banner-printing')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'I. BANNERS & LARGE FORMAT PRINTING') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- J. STICKERS & VINYL PRINTING
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Standard Sticker Printing', 'standard-sticker-printing'),
    ('Frosted Sticker (Printed)', 'frosted-sticker-printed'),
    ('Frosted Sticker (Non-Printed)', 'frosted-sticker-non-printed'),
    ('Transparent Sticker', 'transparent-sticker'),
    ('Mesh Sticker', 'mesh-sticker'),
    ('One-Way Vision Sticker', 'one-way-vision-sticker'),
    ('Glass & Window Branding', 'glass-window-branding')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'J. STICKERS & VINYL PRINTING') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- K. PRINTING & BUSINESS MATERIALS
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Business Card - Premium', 'business-card-premium'),
    ('Flyer', 'flyer'),
    ('Brochure', 'brochure'),
    ('Document', 'document')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'K. PRINTING & BUSINESS MATERIALS') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- L. DESIGN & MARKETING SERVICES
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Logo Design', 'logo-design'),
    ('Branding & Identity', 'branding-identity'),
    ('Marketing Design', 'marketing-design'),
    ('Social Media Post Design', 'social-media-post-design'),
    ('Promotional Creatives', 'promotional-creatives')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'L. DESIGN & MARKETING SERVICES') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;

-- M. PRODUCTION, INSTALLATION & SUPPORT
INSERT INTO public.services (title, slug, category_id, published)
SELECT s.title, s.slug, c.id, true
FROM (VALUES 
    ('Signage Fabrication (In-house)', 'signage-fabrication-inhouse'),
    ('Professional Installation', 'professional-installation'),
    ('Maintenance & Repair', 'maintenance-repair'),
    ('LED Replacement & Servicing', 'led-replacement-servicing')
) AS s(title, slug)
CROSS JOIN (SELECT id FROM public.service_categories WHERE title = 'M. PRODUCTION, INSTALLATION & SUPPORT') AS c
ON CONFLICT (slug) DO UPDATE SET category_id = EXCLUDED.category_id;
