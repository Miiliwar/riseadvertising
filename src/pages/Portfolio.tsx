import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";
import { Eye, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import portfolio images (fallbacks)
import brandingItems from "@/assets/portfolio/branding-items.jpg";
import keychains from "@/assets/portfolio/keychains.jpg";
import lightbox from "@/assets/portfolio/lightbox.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";

interface PortfolioItem {
  id: string;
  title: string;
  client: string | null;
  category?: string | null;
  description: string | null;
  images: string[];
  featured: boolean | null;
  tags?: string[] | null;
}

const categories = ["All", "Banners", "Signage", "Promotional", "Branding", "Events"];

const fallbackPortfolioItems = [
  {
    id: "1",
    title: "All Branding Items Collection",
    client: "RISE Advertising",
    category: "Branding",
    description: "Complete branding package including rollup banners, teardrop flags, promotional tents, vehicle wraps, t-shirts, caps, mugs, keychains, and more.",
    images: [brandingItems],
    featured: true,
  },
  {
    id: "2",
    title: "Metal Keychains - Odaa Roobaa Hospital",
    client: "Odaa Roobaa Hospital",
    category: "Promotional",
    description: "Custom metal keychains with full-color logo printing for hospital branding and promotional giveaways.",
    images: [keychains],
    featured: false,
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data, error } = await supabase
          .from("portfolio")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const transformedData = data.map(item => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : [],
            category: item.tags && item.tags.length > 0 ? item.tags[0] : "Other"
          }));
          setItems(transformedData as unknown as PortfolioItem[]);
        } else {
          setItems(fallbackPortfolioItems as unknown as PortfolioItem[]);
        }
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        setItems(fallbackPortfolioItems as PortfolioItem[]);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="hero-title mb-6">Our Work</h1>
            <p className="hero-subtitle text-white/80">
              Explore our latest projects and see how we've helped brands across Ethiopia make an impact.
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

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
