-- Run this in Supabase SQL Editor to allow all operations on services table for development
-- This adds a policy that allows anonymous users to manage services

-- Drop existing restrictive policies if they cause issues
DROP POLICY IF EXISTS "Admin/editors can manage services" ON public.services;

-- Create a more permissive policy for all authenticated and anonymous users
CREATE POLICY "Allow all operations on services"
ON public.services FOR ALL
USING (true)
WITH CHECK (true);

-- Also add similar permissive policies for portfolio and quote_requests
DROP POLICY IF EXISTS "Admin/editors can manage portfolio" ON public.portfolio;
CREATE POLICY "Allow all operations on portfolio"
ON public.portfolio FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin/editors can update quote requests" ON public.quote_requests;
CREATE POLICY "Allow all operations on quote_requests"
ON public.quote_requests FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Allow all operations on site_settings"
ON public.site_settings FOR ALL
USING (true)
WITH CHECK (true);

-- Create storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to the images bucket
CREATE POLICY "Allow public read access on images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated uploads to images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow authenticated updates to images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated deletes from images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
