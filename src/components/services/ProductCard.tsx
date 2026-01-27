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
      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted cursor-pointer">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mb-4">
            <h3 className="text-white text-lg lg:text-xl font-black uppercase tracking-tight leading-tight">
              {product.title}
            </h3>
          </div>

          <Button
            asChild
            size="sm"
            className="w-fit rounded-none font-bold uppercase text-xs tracking-wider group/btn bg-primary hover:bg-primary/90"
          >
            <Link to={`/services/${product.slug}`} state={{ category: product.tags?.[0] || "All" }}>
              View Details
              <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
