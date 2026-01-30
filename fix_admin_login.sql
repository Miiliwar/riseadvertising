-- ============================================
-- FIX ADMIN LOGIN AND DASHBOARD ACCESS
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- Step 1: First, let's check what users exist
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 10;

-- Step 2: Check what's in the user_roles table
SELECT * FROM public.user_roles;

-- Step 3: DISABLE RLS on user_roles temporarily to ensure roles can be read
-- (This is safe because roles should be readable by the user themselves)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop all existing policies on user_roles and recreate clean ones
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
DROP POLICY IF EXISTS "users_read_own_role" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Step 5: Create a simple policy that allows users to read their own role
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Step 6: Create admin management policy
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Step 7: Grant proper permissions
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_roles TO anon;

-- Step 8: Now assign admin role to your user
-- CHANGE THIS EMAIL to your actual admin email!
DO $$
DECLARE
  admin_email TEXT := 'riseadvertising11@gmail.com'; -- CHANGE THIS!
  admin_user_id UUID;
BEGIN
  -- Find the user ID
  SELECT id INTO admin_user_id FROM auth.users WHERE email = admin_email;
  
  IF admin_user_id IS NULL THEN
    RAISE NOTICE 'User not found: %', admin_email;
  ELSE
    -- Delete any existing roles for this user first
    DELETE FROM public.user_roles WHERE user_id = admin_user_id;
    
    -- Insert fresh admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin');
    
    RAISE NOTICE 'Admin role assigned to: % (ID: %)', admin_email, admin_user_id;
  END IF;
END $$;

-- Step 9: Verify the fix worked
SELECT 
  u.id,
  u.email, 
  r.role,
  r.created_at as role_assigned_at
FROM auth.users u
LEFT JOIN public.user_roles r ON u.id = r.user_id
WHERE u.email = 'admin@riseadvertising.com'; -- CHANGE THIS!

-- Step 10: Test if a user can read their own role (run this while logged in)
-- This simulates what the app does
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
