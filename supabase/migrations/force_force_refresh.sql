-- FORCE SCHEMA REFRESH
-- Run this if standard NOTIFY pgrst, 'reload schema' fails.

-- 1. Ensure permissions are explicitly granted for API roles
GRANT ALL ON TABLE public.service_categories TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.services TO postgres, anon, authenticated, service_role;

-- 2. "Poke" the table with a dummy change to force PostgREST to notice it
DO $$ 
BEGIN 
    ALTER TABLE public.service_categories ADD COLUMN IF NOT EXISTS _temp_sync_col boolean;
    ALTER TABLE public.service_categories DROP COLUMN IF NOT EXISTS _temp_sync_col;
END $$;

-- 3. Reload schema cache again
NOTIFY pgrst, 'reload schema';

-- 4. Verification: check if the table is visible in the schema list
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'service_categories';
