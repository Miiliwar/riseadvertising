-- FORCE REFRESH: Run this to clear the "Could not find column" error.
-- This forces Supabase to re-read the database structure immediately.

-- 1. Minor change to "bump" the table (adds and removes a temporary comment)
COMMENT ON TABLE public.services IS 'Force refresh';
COMMENT ON TABLE public.services IS NULL;

-- 2. Explicitly notify the API layer to reload
NOTIFY pgrst, 'reload schema';

-- 3. Double-check RLS is off (just in case)
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
