-- RESET DATABASE AND CREATE ADMIN
-- Run this in the Supabase SQL Editor (https://app.supabase.com)

-- 1. Remove all existing roles and profiles
DELETE FROM public.user_roles;
DELETE FROM public.profiles;

-- 2. Clear auth.users (Note: This may require 'postgres' role or disabling triggers)
-- If you get an error here, you can manually delete users from the Supabase Auth dashboard.
-- DELETE FROM auth.users;

-- 3. Prepare for new admin creation
-- Note: It is best to sign up via the frontend and THEN run the code below
-- OR use this script to assign the role to a specific email if it exists.

/* 
STEP-BY-STEP INSTRUCTIONS:
1. Go to your website's login/signup page.
2. Sign up with email: admin@riseadvertising.com
3. Once signed up, find your User ID in the Supabase Auth dashboard.
4. Replace 'YOUR_USER_ID_HERE' below with that ID and run this script.
*/

/*
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin');
*/

-- Alternatively, here is a seed for common tables if you want to start fresh:
-- (Existing services/portfolio data will be preserved unless you DELETE them)
