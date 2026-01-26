-- DEFINITIVE CACHE REFRESH: Forces Supabase to see 'category_id'
-- This script fixes "Could not find column in schema cache"

-- 1. Ensure the column definitely exists and is TEXT
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='category_id') THEN
        ALTER TABLE public.services ADD COLUMN category_id TEXT;
    END IF;
END $$;

-- 2. "Bump" the table definition to force a cache reload
-- We do this by adding and then immediately removing a dummy comment
COMMENT ON TABLE public.services IS 'Refreshing schema cache...';
COMMENT ON TABLE public.services IS NULL;

-- 3. Explicitly signal PostgREST to reload (Supabase internal cache)
NOTIFY pgrst, 'reload schema';

-- 4. Final verification: Check if it shows up in your SQL results below
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services' AND column_name = 'category_id';
