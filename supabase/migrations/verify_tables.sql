-- VERIFY TABLES EXISTENCE
-- Run this in the Supabase SQL Editor to check what's actually in your database.

-- 1. List all tables in the public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 2. Check content of services (if table exists)
SELECT count(*) as service_count FROM public.services;

-- 3. Check content of categories (if table exists)
SELECT count(*) as category_count FROM public.service_categories;

-- 4. Check if the authenticated role has access
SELECT HAS_TABLE_PRIVILEGE('authenticated', 'public.service_categories', 'SELECT, INSERT, UPDATE, DELETE');
