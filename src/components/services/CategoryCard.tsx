import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    image?: string;
  };
  onClick: () => void;
  index: number;
}

export function CategoryCard({ category, onClick, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted cursor-pointer"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={category.image || "/placeholder.svg"}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-primary font-black text-xs uppercase tracking-widest mb-2">
          Category {category.id}
        </span>
        <h3 className="text-white text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight mb-3">
          {category.title.split('.')[1]?.trim() || category.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 mb-4">
          {category.description}
        </p>
        <Button 
          variant="default" 
          size="sm"
          className="w-fit rounded-none font-bold uppercase text-xs tracking-wider group/btn"
        >
          View Details
          <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
