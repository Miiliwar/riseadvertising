import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="group relative h-[160px] sm:h-[180px] lg:aspect-[4/3] lg:h-auto overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* 
          MOBILE-FIRST: 50/50 split on mobile so users don't have to "hover" to see title.
          DESKTOP (lg): Reveal on hover.
        */}

        {/* Image Container */}
        <div className="absolute inset-y-0 left-0 w-1/2 lg:w-full lg:inset-0 transition-all duration-500 ease-out lg:group-hover:w-[55%]">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Content Container */}
        <div className="absolute inset-y-0 right-0 w-1/2 lg:w-[45%] lg:opacity-0 lg:translate-x-full flex flex-col justify-center items-start p-4 lg:p-5 bg-card transition-all duration-500 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
          <h3 className="text-foreground text-xs lg:text-base font-black uppercase tracking-tight leading-tight mb-2 lg:mb-3 line-clamp-3">
            {product.title}
          </h3>
          {product.price_range && (
            <span className="text-primary font-bold text-[10px] lg:text-xs mb-2 lg:mb-3 block">
              {product.price_range}
            </span>
          )}
          <Button
            asChild
            size="sm"
            className="h-8 lg:h-9 px-3 lg:px-4 rounded-none font-bold uppercase text-[10px] lg:text-xs tracking-wider group/btn bg-primary hover:bg-primary/90"
          >
            <Link to={`/services/${product.slug}`} state={{ category: product.tags?.[0] || "All" }}>
              View
              <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Subtle border indicator on hover (Desktop) */}
        <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl transition-all duration-300 lg:group-hover:border-primary/30 pointer-events-none" />
      </div>
    </motion.div>
  );
}
