-- Run this in Supabase SQL Editor to fix RLS for ALL tables and enable storage

-- 1. Disable RLS or add permissive policies for all tables
DO $$ 
DECLARE
    row RECORD;
BEGIN
    FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
    LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY;', row.tablename);
        EXECUTE format('DROP POLICY IF EXISTS "Allow all" ON public.%I;', row.tablename);
        EXECUTE format('CREATE POLICY "Allow all" ON public.%I FOR ALL USING (true) WITH CHECK (true);', row.tablename);
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', row.tablename);
    END LOOP;
END $$;

-- 2. Setup Storage for local file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to images storage
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "All Access" ON storage.objects FOR ALL USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');
