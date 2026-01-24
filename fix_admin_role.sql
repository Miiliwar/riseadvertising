-- ROBUST ADMIN ROLE ASSIGNMENT
-- Run this in the Supabase SQL Editor (https://app.supabase.com)

-- This script will assign the admin role safely, even if it already exists.
-- Replace 'e1f84ca1-eb58-4fd3-a766-8727624e642a' with your actual User ID if it changed.

INSERT INTO public.user_roles (user_id, role)
VALUES ('e1f84ca1-eb58-4fd3-a766-8727624e642a', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Verification query: Run this to confirm the user has the role
SELECT u.email, r.role 
FROM auth.users u
JOIN public.user_roles r ON u.id = r.user_id
WHERE u.id = 'e1f84ca1-eb58-4fd3-a766-8727624e642a';
