import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Banners", "Backdrops", "Stickers", "Signage", "Events"];

const portfolioItems = [
  {
    id: 1,
    title: "Lagos Business Summit 2024",
    client: "LBS Group",
    category: "Backdrops",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 2,
    title: "Premium Rollup Collection",
    client: "TechCorp Nigeria",
    category: "Banners",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 3,
    title: "Product Label Design",
    client: "Fresh Foods Ltd",
    category: "Stickers",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 4,
    title: "Office Signage Package",
    client: "Alpha Bank",
    category: "Signage",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 5,
    title: "Exhibition Booth Design",
    client: "GreenTech Solutions",
    category: "Events",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 6,
    title: "Vehicle Wrap Campaign",
    client: "FastDelivery NG",
    category: "Signage",
    image: "/placeholder.svg",
    featured: false,
  },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 lg:py-28">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="red-accent-bar mx-auto mb-6" />
          <h2 className="section-title mb-4">Our Portfolio</h2>
          <p className="section-subtitle mx-auto">
            Explore our latest projects and see how we've helped brands make an impact.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Link
                to={`/portfolio/${item.id}`}
                className="portfolio-item group block aspect-[4/3] relative rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="text-xs font-semibold text-primary mb-1">{item.category}</div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.client}</p>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
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
            View Full Portfolio
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
