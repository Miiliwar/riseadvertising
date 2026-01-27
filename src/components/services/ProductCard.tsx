import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <Card className="group h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col bg-card">
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <CardContent className="p-6 flex flex-1 flex-col">
          <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          {product.short_description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
              {product.short_description}
            </p>
          )}
          
          <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
            {product.price_range && (
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {product.price_range}
              </span>
            )}
            <Button 
              asChild 
              size="sm" 
              className="rounded-none font-bold uppercase text-xs tracking-wider ml-auto group/btn"
            >
              <Link to={`/services/${product.slug}`} state={{ category: product.tags?.[0] || "All" }}>
                View Details
                <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
