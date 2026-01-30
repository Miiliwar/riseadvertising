-- FIX ADMIN ACCESS AND RLS
-- Run this in Supabase SQL Editor

-- 1. Allow users to read their own role (Fix potential RLS issue)
-- Check if policy exists first to avoid error
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_roles' 
        AND policyname = 'Users can view own role'
    ) THEN
        CREATE POLICY "Users can view own role" ON public.user_roles
        FOR SELECT TO authenticated
        USING (auth.uid() = user_id);
    END IF;
END $$;


-- 2. Function to make a user an admin by email (Easier than ID)
CREATE OR REPLACE FUNCTION public.make_user_admin(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER -- Runs as admin
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find user ID from auth.users
  SELECT id INTO target_user_id FROM auth.users WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RETURN 'User not found: ' || user_email;
  END IF;

  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN 'Success: User ' || user_email || ' is now an admin.';
END;
$$;

-- 3. EXAMPLE: AUTOMATICALLY MAKE 'riseadvertising11@gmail.com' AN ADMIN
-- You can change this email to the one you are trying to log in with
SELECT public.make_user_admin('riseadvertising11@gmail.com');

-- If you are using a different email, uncomment and run:
-- SELECT public.make_user_admin('your_email@example.com');
