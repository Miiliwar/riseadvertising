-- RUN THIS IN SUPABASE SQL EDITOR
-- This version COMPLETELY DISABLES Row Level Security for all tables.
-- This ensures that your dev-bypass login can save data without errors.

DO $$ 
DECLARE
    row RECORD;
BEGIN
    FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
    LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY;', row.tablename);
        RAISE NOTICE 'Disabled RLS for table: %', row.tablename;
    END LOOP;
END $$;

-- Also ensure storage is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

UPDATE storage.buckets SET public = true WHERE id = 'images';
