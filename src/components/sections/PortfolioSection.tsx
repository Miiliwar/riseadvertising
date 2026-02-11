import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";

// Import portfolio images
import brandingItems from "@/assets/portfolio/branding-items.jpg";
import keychains from "@/assets/portfolio/keychains.jpg";
import lightbox from "@/assets/portfolio/lightbox.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";
import backlightFoam from "@/assets/portfolio/backlight-foam.jpg";

const categories = ["All", "Banners", "Signage", "Promotional", "Branding", "Events"];

const portfolioItems = [
  {
    id: 1,
    title: "All Branding Items Collection",
    client: "RISE Advertising",
    category: "Branding",
    image: brandingItems,
    featured: true,
  },
  {
    id: 2,
    title: "Metal Keychains - Odaa Roobaa Hospital",
    client: "Odaa Roobaa Hospital",
    category: "Promotional",
    image: keychains,
    featured: false,
  },
  {
    id: 3,
    title: "Circle Lightbox - Hamiltan Travel Agency",
    client: "Hamiltan Travel Agency",
    category: "Signage",
    image: lightbox,
    featured: true,
  },
  {
    id: 4,
    title: "Teardrop Promotional Flag",
    client: "Mamo Fish",
    category: "Banners",
    image: teardropFlags,
    featured: false,
  },
  {
    id: 5,
    title: "3D Lightbox Signage",
    client: "Various Clients",
    category: "Signage",
    image: signage3d,
    featured: true,
  },
  {
    id: 6,
    title: "Backlight 3D Foam Signage",
    client: "Sadam Law Office",
    category: "Signage",
    image: backlightFoam,
    featured: false,
  },
];

export function PortfolioSection() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="red-accent-bar mx-auto mb-6" />
          <h2 className="section-title mb-4">Our Work</h2>
          <p className="section-subtitle mx-auto">
            Explore our latest projects and see how we've helped brands make an impact.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full">
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: portfolioItems.length * 8, repeat: Infinity, ease: "linear" }}
        >
          {[...portfolioItems, ...portfolioItems].map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to="/portfolio"
              className="portfolio-item group flex-shrink-0 w-[280px] md:w-[380px] lg:w-[420px] aspect-[4/3] relative rounded-xl overflow-hidden block"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {item.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Featured
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-xs font-semibold text-primary mb-1">{item.category}</div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-white/70">{item.client}</p>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* View All CTA */}
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:gap-3 transition-all"
          >
            View All Our Work
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
