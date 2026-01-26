-- Clean up existing categories and insert static ones with prefixes
TRUNCATE TABLE service_categories CASCADE;

INSERT INTO service_categories (order_index, title, description) VALUES
(1, 'A. Signage & Neon & LED Signs', 'High-impact visual communication for day and night visibility.'),
(2, 'B. Large Format & UV Printing', 'Premium quality prints for billboards, posters, and specialty surfaces.'),
(3, 'C. Promotional Items & Gift & Giveaways', 'Custom branded items that keep your business in front of customers.'),
(4, 'D. Corporate Branding & Identity', 'Professional design and branding solutions for a cohesive market presence.'),
(5, 'E. Vehicle Graphics & Branding', 'Turn your fleet into mobile billboards with high-quality vehicle wraps.'),
(6, 'F. Digital Printing & Stationery', 'Fast, high-quality printing for business cards, brochures, and corporate stationery.'),
(7, 'G. Creative Graphic Design', 'Expert design services to bring your brand vision to life.'),
(8, 'H. Exhibition & Event Branding', 'Stand out at events with professional displays and environmental branding.'),
(9, 'I. Indoor & Office Branding', 'Enhance your workplace with professional wall graphics and signage.'),
(10, 'J. Outdoor Advertising Solutions', 'Reach a wider audience with impactful outdoor media and signs.'),
(11, 'K. Apparel & Textile Printing', 'Custom printed t-shirts, uniforms, and textile branding solutions.'),
(12, 'L. Custom fabrication & 3D lettering', 'Unique 3D signs and custom-built structures for your brand.'),
(13, 'M. Maintenance & Installation Services', 'Reliable installation and upkeep to keep your branding looking perfect.');

-- Update services to have at least one valid category if needed (optional, depends on existing data)
-- For now we assume the admin will re-assign them via the new static dropdown.
