-- PURGE CATEGORY SQL: Removes problematic columns and tables
-- Mirrors the simple structure of the Portfolio page

-- 1. Drop the problematic column
ALTER TABLE public.services DROP COLUMN IF EXISTS category_id;

-- 2. Drop the redundant table
DROP TABLE IF EXISTS public.service_categories;

-- 3. Verify 'tags' column exists for our new filtering logic
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='tags') THEN
        ALTER TABLE public.services ADD COLUMN tags TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- 4. Force cache reload
NOTIFY pgrst, 'reload schema';