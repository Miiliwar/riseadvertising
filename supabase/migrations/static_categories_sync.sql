-- FINAL SYNC: Static Categories with Permanent UUIDs
-- This script ensures your database matches the fixed categories in the code.
-- Execute this once in your Supabase SQL Editor.

TRUNCATE TABLE service_categories CASCADE;

INSERT INTO service_categories (id, order_index, title, description) VALUES
('00000000-0000-0000-0000-00000000000a', 1, 'A. Signage & Neon & LED Signs', 'High-impact visual communication for day and night visibility.'),
('00000000-0000-0000-0000-00000000000b', 2, 'B. Large Format & UV Printing', 'Premium quality prints for billboards, posters, and specialty surfaces.'),
('00000000-0000-0000-0000-00000000000c', 3, 'C. Promotional Items & Gift & Giveaways', 'Custom branded items that keep your business in front of customers.'),
('00000000-0000-0000-0000-00000000000d', 4, 'D. Corporate Branding & Identity', 'Professional design and branding solutions for a cohesive market presence.'),
('00000000-0000-0000-0000-00000000000e', 5, 'E. Vehicle Graphics & Branding', 'Turn your fleet into mobile billboards with high-quality vehicle wraps.'),
('00000000-0000-0000-0000-00000000000f', 6, 'F. Digital Printing & Stationery', 'Fast, high-quality printing for business cards, brochures, and corporate stationery.'),
('00000000-0000-0000-0000-000000000010', 7, 'G. Creative Graphic Design', 'Expert design services to bring your brand vision to life.'),
('00000000-0000-0000-0000-000000000011', 8, 'H. Exhibition & Event Branding', 'Stand out at events with professional displays and environmental branding.'),
('00000000-0000-0000-0000-000000000012', 9, 'I. Indoor & Office Branding', 'Enhance your workplace with professional wall graphics and signage.'),
('00000000-0000-0000-0000-000000000013', 10, 'J. Outdoor Advertising Solutions', 'Reach a wider audience with impactful outdoor media and signs.'),
('00000000-0000-0000-0000-000000000014', 11, 'K. Apparel & Textile Printing', 'Custom printed t-shirts, uniforms, and textile branding solutions.'),
('00000000-0000-0000-0000-000000000015', 12, 'L. Custom fabrication & 3D lettering', 'Unique 3D signs and custom-built structures for your brand.'),
('00000000-0000-0000-0000-000000000016', 13, 'M. Maintenance & Installation Services', 'Reliable installation and upkeep to keep your branding looking perfect.');
