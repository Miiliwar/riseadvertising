-- Refresh PostgREST schema cache
-- In Supabase, this is often needed after DDL changes (creating tables) 
-- that aren't picked up by the API immediately.

NOTIFY pgrst, 'reload schema';

-- Alternative: If the above doesn't work, sometimes running a small DDL 
-- or a specific Supabase RPC is required depending on the version.
-- For most hosted Supabase instances, PostgREST picks this up.
