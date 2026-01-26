-- 1. Ensure the category_id column exists on the services table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='category_id') THEN
        ALTER TABLE public.services ADD COLUMN category_id UUID REFERENCES public.service_categories(id);
    END IF;
END $$;

-- 2. Force a PostgREST schema cache reload
-- This is critical when you see "column not found in schema cache" but it actually exists.
NOTIFY pgrst, 'reload schema';

-- 3. Verify the column is there for the user
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services' AND column_name = 'category_id';
