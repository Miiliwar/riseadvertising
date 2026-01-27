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
        <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mb-4">
          <span className="text-primary font-black text-xs uppercase tracking-widest mb-1 block">
            Category {category.id}
          </span>
          <h3 className="text-white text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight">
            {category.title.split('.')[1]?.trim() || category.title}
          </h3>
        </div>

        <Button
          variant="default"
          size="sm"
          className="w-fit rounded-none font-bold uppercase text-xs tracking-wider group/btn bg-primary hover:bg-primary/90"
        >
          View Details
          <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
