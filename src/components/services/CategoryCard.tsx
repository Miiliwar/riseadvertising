import { forwardRef } from "react";
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

export const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(({ category, onClick, index }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative h-[160px] sm:h-[200px] lg:aspect-[4/3] lg:h-auto overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      {/* 
        MOBILE (Default): Split layout 50/50
        DESKTOP (lg): Full image, reveal on hover
      */}

      {/* Image Container */}
      <div className="absolute inset-y-0 left-0 w-1/2 lg:w-full lg:inset-0 transition-all duration-500 ease-out lg:group-hover:w-[55%]">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-y-0 right-0 w-1/2 lg:w-[45%] lg:opacity-0 lg:translate-x-full flex flex-col justify-center items-start p-4 lg:p-5 bg-card transition-all duration-500 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
        <span className="text-primary font-black text-[10px] lg:text-xs uppercase tracking-widest mb-1 lg:mb-2 block">
          Cat {category.id}
        </span>
        <h3 className="text-foreground text-sm lg:text-lg font-black uppercase tracking-tight leading-tight mb-2 lg:mb-3 line-clamp-2">
          {category.title.split('.')[1]?.trim() || category.title}
        </h3>
        <Button
          variant="default"
          size="sm"
          className="h-8 lg:h-9 px-3 lg:px-4 rounded-none font-bold uppercase text-[10px] lg:text-xs tracking-wider group/btn bg-primary hover:bg-primary/90"
        >
          View more
          <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>

      {/* Subtle border indicator on hover (Desktop only for precision) */}
      <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl transition-all duration-300 lg:group-hover:border-primary/30 pointer-events-none" />
    </motion.div>
  );
});

CategoryCard.displayName = "CategoryCard";
