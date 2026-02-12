
-- Fix RLS policies: Change public SELECT policies from RESTRICTIVE to PERMISSIVE
-- for services, service_categories, and portfolio tables

-- 1. Fix service_categories
DROP POLICY IF EXISTS "Anyone can view published categories" ON public.service_categories;
CREATE POLICY "Anyone can view published categories"
  ON public.service_categories
  FOR SELECT
  USING (published = true);

-- 2. Fix services
DROP POLICY IF EXISTS "Anyone can view published services" ON public.services;
CREATE POLICY "Anyone can view published services"
  ON public.services
  FOR SELECT
  USING (published = true);

-- 3. Fix portfolio
DROP POLICY IF EXISTS "Anyone can view published portfolio" ON public.portfolio;
CREATE POLICY "Anyone can view published portfolio"
  ON public.portfolio
  FOR SELECT
  USING (published = true);
