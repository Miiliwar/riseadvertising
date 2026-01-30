-- Fix Missing Tables and Columns
-- Run this in Supabase SQL Editor to fix the Services page loading error

-- 1. Create service_categories table if it doesn't exist
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

-- 2. Security for service_categories
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'service_categories' AND policyname = 'Anyone can view published service_categories') THEN
        CREATE POLICY "Anyone can view published service_categories" ON public.service_categories FOR SELECT USING (published = true);
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'service_categories' AND policyname = 'Admin/editors can view all service_categories') THEN
        CREATE POLICY "Admin/editors can view all service_categories" ON public.service_categories FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
    END IF;

    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'service_categories' AND policyname = 'Admin/editors can manage service_categories') THEN
        CREATE POLICY "Admin/editors can manage service_categories" ON public.service_categories FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));
    END IF;
END $$;

-- 3. Trigger for updated_at
DROP TRIGGER IF EXISTS update_service_categories_updated_at ON public.service_categories;
CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON public.service_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Add features column to services if it doesn't exist
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- 5. Seed Data for Categories (Only if empty)
INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'A', 'Outdoor Signage', 'High-quality outdoor branding and signage solutions.', 1
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'A');

INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'B', 'Indoor Branding', 'Interior branding and display solutions for your business.', 2
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'B');

INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'C', 'Vehicle Branding', 'Turn your vehicle into a moving billboard.', 3
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'C');

INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'D', 'Promotional Items', 'Customized promotional gifts and giveaways.', 4
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'D');

INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'E', 'Digital Printing', 'High-resolution digital printing services.', 5
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'E');

INSERT INTO public.service_categories (letter, title, description, sort_order)
SELECT 'F', 'Offset Printing', 'Large volume offset printing for brochures and more.', 6
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE letter = 'F');

-- 6. Update Services with Tags to match Categories (Sample) to ensure they show up
UPDATE public.services SET tags = ARRAY['A. Outdoor Signage'] WHERE slug IN ('pvc-banners', '3d-signage') AND tags = '{}';
UPDATE public.services SET tags = ARRAY['B. Indoor Branding'] WHERE slug IN ('rollup-banners', 'backdrops') AND tags = '{}';
UPDATE public.services SET tags = ARRAY['D. Promotional Items'] WHERE slug IN ('sticker-printing', 'custom-prints') AND tags = '{}';
