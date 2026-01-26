-- COMPREHENSIVE PERMISSION & SYNC RESET
-- Run this to fix the "table not found in schema cache" error.

-- 1. Ensure the schema itself is interactive
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Explicitly grant all permissions on the new table
GRANT ALL ON TABLE public.service_categories TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.services TO postgres, anon, authenticated, service_role;

-- 3. Ensure the API roles can see the sequences (ids)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Double-check RLS is active
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- 5. Final forceful notify
NOTIFY pgrst, 'reload schema';

-- 6. Poke the table metadata (Fixed syntax)
COMMENT ON TABLE public.service_categories IS 'Service categories table - manual refresh';

-- Verification SELECT
SELECT 'Schema sync requested' as message, count(*) as category_count FROM public.service_categories;
