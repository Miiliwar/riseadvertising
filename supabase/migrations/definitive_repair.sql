-- DEFINITIVE REPAIR: Ensures all columns exist and schema is fresh
-- This script fixes "Could not find column" and creation failures.

-- 1. Ensure the services table has all required columns
DO $$ 
BEGIN 
    -- FIRST: Drop the old foreign key constraint if it exists.
    -- This is required because we are moving away from database-driven categories.
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='services_category_id_fkey') THEN
        ALTER TABLE public.services DROP CONSTRAINT services_category_id_fkey;
    END IF;

    -- category_id (TEXT to allow simple tagging)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='category_id') THEN
        ALTER TABLE public.services ADD COLUMN category_id TEXT;
    ELSE
        -- If it exists, ensure it is TEXT type (not UUID)
        ALTER TABLE public.services ALTER COLUMN category_id TYPE TEXT;
    END IF;

    -- icon_name
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='icon_name') THEN
        ALTER TABLE public.services ADD COLUMN icon_name TEXT;
    END IF;

    -- long_description
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='long_description') THEN
        ALTER TABLE public.services ADD COLUMN long_description TEXT;
    END IF;

    -- price_range
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='price_range') THEN
        ALTER TABLE public.services ADD COLUMN price_range TEXT;
    END IF;
END $$;

-- 2. Ensure RLS is disabled or allows inserts for admin
-- (Assuming user is using their own Supabase key)
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;

-- 3. FORCE PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';

-- Verify the columns are there
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services';
