
-- Fix RLS policies: Change from RESTRICTIVE to PERMISSIVE for services, service_categories, and portfolio

-- ============ service_categories ============
DROP POLICY IF EXISTS "Anyone can view published categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can view all categories" ON public.service_categories;
DROP POLICY IF EXISTS "Admin/editors can manage categories" ON public.service_categories;

CREATE POLICY "Anyone can view published categories"
ON public.service_categories FOR SELECT
USING (published = true);

CREATE POLICY "Admin/editors can view all categories"
ON public.service_categories FOR SELECT TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editors can manage categories"
ON public.service_categories FOR ALL TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- ============ services ============
DROP POLICY IF EXISTS "Anyone can view published services" ON public.services;
DROP POLICY IF EXISTS "Admin/editors can view all services" ON public.services;
DROP POLICY IF EXISTS "Admin/editors can manage services" ON public.services;

CREATE POLICY "Anyone can view published services"
ON public.services FOR SELECT
USING (published = true);

CREATE POLICY "Admin/editors can view all services"
ON public.services FOR SELECT TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editors can manage services"
ON public.services FOR ALL TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- ============ portfolio ============
DROP POLICY IF EXISTS "Anyone can view published portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admin/editors can view all portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admin/editors can manage portfolio" ON public.portfolio;

CREATE POLICY "Anyone can view published portfolio"
ON public.portfolio FOR SELECT
USING (published = true);

CREATE POLICY "Admin/editors can view all portfolio"
ON public.portfolio FOR SELECT TO authenticated
USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/editors can manage portfolio"
ON public.portfolio FOR ALL TO authenticated
USING (public.is_admin_or_editor(auth.uid()))
WITH CHECK (public.is_admin_or_editor(auth.uid()));
