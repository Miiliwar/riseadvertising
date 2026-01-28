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
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Image Container - shifts left on hover */}
      <div className="absolute inset-0 flex transition-all duration-500 ease-out group-hover:w-[55%] group-hover:left-0">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      {/* Content Container - fades in from right on hover */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] flex flex-col justify-center items-start p-4 lg:p-5 bg-card opacity-0 translate-x-full transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
        <span className="text-primary font-black text-xs uppercase tracking-widest mb-2 block">
          Category {category.id}
        </span>
        <h3 className="text-foreground text-base lg:text-lg font-black uppercase tracking-tight leading-tight mb-3">
          {category.title.split('.')[1]?.trim() || category.title}
        </h3>
        <Button
          variant="default"
          size="sm"
          className="w-fit rounded-none font-bold uppercase text-xs tracking-wider group/btn bg-primary hover:bg-primary/90"
        >
          View
          <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>

      {/* Subtle border indicator on hover */}
      <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl transition-all duration-300 group-hover:border-primary/30 pointer-events-none" />
    </motion.div>
  );
}
