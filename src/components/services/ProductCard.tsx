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

  // Determine if details should be shown (hover on desktop OR active state on mobile)
  const isRevealed = showInfo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setShowInfo(!showInfo)}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      className="relative aspect-square sm:aspect-[4/3] group overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container - Shifts left on reveal */}
      <div
        className={`absolute inset-y-0 left-0 transition-all duration-500 ease-in-out ${isRevealed ? "w-1/2" : "w-full"
          }`}
      >
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {/* Subtle shadow on the right edge of the image when revealed to give depth */}
        <div className={`absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent transition-opacity duration-500 ${isRevealed ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Content Container - Fades in on the right */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 flex flex-col justify-center items-start p-3 sm:p-4 bg-card transition-all duration-500 ease-in-out ${isRevealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
      >
        <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1">
          {product.tags?.[0]?.split('.')[1]?.trim() || "Rise Print"}
        </span>
        <h3 className="text-foreground text-[10px] sm:text-sm font-black uppercase tracking-tight leading-tight mb-3 line-clamp-3">
          {product.title}
        </h3>
        <Button
          asChild
          size="sm"
          className="h-7 sm:h-8 px-2 sm:px-3 rounded-none font-bold uppercase text-[9px] sm:text-[10px] tracking-wider bg-primary hover:bg-primary/90"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={`/services/${product.slug}`} state={{ category: product.tags?.[0] || "All" }}>
            View Detail
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>

      {/* Subtle border indicator on hover */}
      <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 pointer-events-none ${isRevealed ? "border-primary/30" : "border-transparent"}`} />
    </motion.div>
  );
}
