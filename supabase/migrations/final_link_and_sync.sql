-- FINAL LINKING AND SYNC
-- Run this to ensure services are linked to the categories table you just created.

-- 1. Add category_id to services if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'category_id') THEN
        ALTER TABLE public.services ADD COLUMN category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 2. Ensure RLS is enabled and policies exist for the new table
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Categories" ON public.service_categories;
CREATE POLICY "Public Read Categories" ON public.service_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin Manage Categories" ON public.service_categories;
CREATE POLICY "Admin Manage Categories" ON public.service_categories FOR ALL TO authenticated USING (public.is_admin_or_editor(auth.uid()));

-- 3. Grant explicit permissions (CRITICAL for schema cache)
GRANT ALL ON TABLE public.service_categories TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.services TO postgres, anon, authenticated, service_role;

-- 4. Reload PostgREST
NOTIFY pgrst, 'reload schema';

-- 5. Verification
SELECT 'Success' as status;
