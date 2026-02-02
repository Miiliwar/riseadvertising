import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    image_url: string | null;
    price_range: string | null;
    tags: string[] | null;
  };
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setShowInfo(!showInfo)}
      className="relative aspect-square sm:aspect-[4/3] group overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay (Constant for readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* Basic Label (Always visible on mobile bottom if not open?) - Actually user said "when clicked shows..." */}
      <AnimatePresence>
        {(showInfo || false) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center backdrop-blur-lg"
          >
            <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-1">
              {product.tags?.[0]?.split('.')[1]?.trim() || "Rise Print"}
            </span>
            <h3 className="text-white text-xs sm:text-base font-black uppercase tracking-tight leading-tight mb-4 line-clamp-3">
              {product.title}
            </h3>
            <Button
              asChild
              size="sm"
              className="h-8 rounded-none font-bold uppercase text-[10px] tracking-wider bg-primary hover:bg-primary/90"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to={`/services/${product.slug}`} state={{ category: product.tags?.[0] || "All" }}>
                View Detail
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Hover Info (lg+) - Only show if not already showing phone info? Or just hiding it on lg+ */}
      <div className="hidden lg:flex absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-black/40 p-5 flex-col justify-end transition-opacity duration-300 pointer-events-none">
        <span className="text-primary font-black text-xs uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {product.tags?.[0]?.split('.')[1]?.trim() || "Rise Print"}
        </span>
        <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {product.title}
        </h3>
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          <Button
            asChild
            size="sm"
            className="h-9 px-4 rounded-none font-bold uppercase text-xs tracking-wider bg-primary hover:bg-primary/90"
          >
            <span>View Detail</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
