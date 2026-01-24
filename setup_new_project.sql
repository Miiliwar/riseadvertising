-- FULL DATABASE SETUP SCRIPT
-- Run this in the Supabase SQL Editor (https://fnoxlrtyqddlejjhabby.supabase.co/project/sql)

-- 1. Create Tables and Types
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    long_description TEXT,
    price_range TEXT,
    icon_name TEXT,
    image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT,
    project_date DATE,
    description TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    services TEXT[] DEFAULT '{}',
    quantity TEXT,
    width TEXT,
    height TEXT,
    message TEXT,
    delivery_location TEXT,
    deadline DATE,
    source TEXT,
    status TEXT DEFAULT 'new',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Security & RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'editor'))
$$;

-- RLS Policies
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Admin/editors can view all services" ON public.services FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin/editors can manage services" ON public.services FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can view published portfolio" ON public.portfolio FOR SELECT USING (published = true);
CREATE POLICY "Admin/editors can view all portfolio" ON public.portfolio FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin/editors can manage portfolio" ON public.portfolio FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid())) WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editors can view quote requests" ON public.quote_requests FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Anyone can create quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin/editors can update quote requests" ON public.quote_requests FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Functions & Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Initial Seed Data
INSERT INTO public.site_settings (key, value) VALUES
('contact', '{"phone": "+251936704476", "email": "riseadvertising11@gmail.com", "address": "ZAM Mall 2nd Floor, Lebu, Addis Ababa, Ethiopia"}'),
('social', '{"facebook": "https://facebook.com/riseadvertising1", "instagram": "https://instagram.com/riseadvertising1", "tiktok": "https://tiktok.com/@riseadvertising1", "telegram": "https://t.me/riseadvertising1"}'),
('seo', '{"title": "RISE Advertising - Premium Print & Advertising Solutions", "description": "From rollup banners to large-format prints, we deliver exceptional quality that makes your brand stand out."}');

INSERT INTO public.services (title, slug, short_description, price_range, icon_name, published, sort_order) VALUES
('Rollup Banners', 'rollup-banners', 'Premium retractable banners perfect for events, exhibitions, and promotional displays.', 'From ETB 2,500', 'Flag', true, 1),
('PVC Banners', 'pvc-banners', 'Durable outdoor and indoor banners with vibrant, weather-resistant prints.', 'From ETB 300/sqm', 'Image', true, 2),
('Backdrops', 'backdrops', 'Large-format backdrop solutions for events, photo booths, and stage designs.', 'From ETB 4,500', 'Grid3X3', true, 3),
('Sticker Printing', 'sticker-printing', 'Custom stickers and labels for branding, packaging, and promotional materials.', 'From ETB 50/sheet', 'Sticker', true, 4),
('3D Signage', '3d-signage', 'Eye-catching 3D letters and signage for storefronts and interior branding.', 'Get Quote', 'Printer', true, 5),
('Custom Prints', 'custom-prints', 'Bespoke printing solutions tailored to your unique requirements.', 'Get Quote', 'Palette', true, 6);

-- 5. Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "All Access" ON storage.objects FOR ALL USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');

-- 6. ADMIN SETUP INSTRUCTIONS
-- Step 1: Go to Authentication -> Users in your new Supabase dashboard.
-- Step 2: Sign up a new user (e.g., admin@riseadvertising.com).
-- Step 3: Copy the User ID (UUID) of the new user.
-- Step 4: Run the command below (replace YOUR_USER_ID_HERE with the actual UUID):

-- INSERT INTO public.user_roles (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');
