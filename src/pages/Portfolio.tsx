import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";
import { Eye, X } from "lucide-react";

const categories = ["All", "Banners", "Backdrops", "Stickers", "Signage", "Events"];

const portfolioItems = [
  {
    id: 1,
    title: "Lagos Business Summit 2024",
    client: "LBS Group",
    category: "Backdrops",
    description: "Full event branding including stage backdrop, rollup banners, and directional signage.",
    images: ["/placeholder.svg"],
    featured: true,
  },
  {
    id: 2,
    title: "Premium Rollup Collection",
    client: "TechCorp Nigeria",
    category: "Banners",
    description: "Set of 20 premium rollup banners for nationwide product launch campaign.",
    images: ["/placeholder.svg"],
    featured: false,
  },
  {
    id: 3,
    title: "Product Label Design",
    client: "Fresh Foods Ltd",
    category: "Stickers",
    description: "Complete product labeling solution for new product line launch.",
    images: ["/placeholder.svg"],
    featured: false,
  },
  {
    id: 4,
    title: "Office Signage Package",
    client: "Alpha Bank",
    category: "Signage",
    description: "Interior and exterior signage for new branch locations across Lagos.",
    images: ["/placeholder.svg"],
    featured: true,
  },
  {
    id: 5,
    title: "Exhibition Booth Design",
    client: "GreenTech Solutions",
    category: "Events",
    description: "Complete 6x3m exhibition booth with custom lighting and displays.",
    images: ["/placeholder.svg"],
    featured: false,
  },
  {
    id: 6,
    title: "Vehicle Wrap Campaign",
    client: "FastDelivery NG",
    category: "Signage",
    description: "Fleet branding for 50 delivery vehicles with full wrap design.",
    images: ["/placeholder.svg"],
    featured: false,
  },
  {
    id: 7,
    title: "Annual Gala Backdrop",
    client: "Heritage Foundation",
    category: "Backdrops",
    description: "Premium fabric backdrop with gold foil accents for charity gala.",
    images: ["/placeholder.svg"],
    featured: true,
  },
  {
    id: 8,
    title: "Retail Window Display",
    client: "Fashion House",
    category: "Signage",
    description: "Seasonal window graphics for flagship store.",
    images: ["/placeholder.svg"],
    featured: false,
  },
  {
    id: 9,
    title: "Tech Conference Branding",
    client: "StartupNG",
    category: "Events",
    description: "Complete event branding package including stage, booths, and banners.",
    images: ["/placeholder.svg"],
    featured: true,
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20 lg:py-28">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="hero-title mb-6">Our Portfolio</h1>
            <p className="hero-subtitle text-white/80">
              Explore our latest projects and see how we've helped brands across Nigeria make an impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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

          {/* Grid */}
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
                <button
                  onClick={() => setSelectedItem(item)}
                  className="portfolio-item group block w-full text-left aspect-[4/3] relative rounded-xl overflow-hidden"
                >
                  {/* Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-secondary transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.images[0]})` }}
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
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-secondary">
              <img 
                src={selectedItem.images[0]} 
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold text-primary mb-2">{selectedItem.category}</div>
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-muted-foreground mb-4">Client: {selectedItem.client}</p>
              <p className="text-muted-foreground">{selectedItem.description}</p>
            </div>
          </motion.div>
        </div>
      )}

      <CTASection />
    </Layout>
  );
}
