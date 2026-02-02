import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showInfo, setShowInfo] = useState(false);

  const handleMobileClick = (e: React.MouseEvent) => {
    // If we're on a mobile device (touch), we might want to prevent the parent onClick (which navigates)
    // and instead show our info first.
    if (window.innerWidth < 1024) {
      e.preventDefault();
      e.stopPropagation();
      setShowInfo(!showInfo);
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-2xl bg-card cursor-pointer border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={handleMobileClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* Info Overlay (Mobile Only Toggle) */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md p-4 flex flex-col justify-center items-center text-center p-2"
          >
            <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-1">
              Category {category.id}
            </span>
            <h3 className="text-white text-xs sm:text-base font-black uppercase tracking-tight leading-tight mb-4">
              {category.title.split('.')[1]?.trim() || category.title}
            </h3>
            <Button
              variant="default"
              size="sm"
              className="h-8 rounded-none font-bold uppercase text-[10px] tracking-wider bg-primary hover:bg-primary/90"
              onClick={onClick}
            >
              View more
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Hover Info (lg+) */}
      <div className="hidden lg:flex absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-black/40 p-5 flex-col justify-end transition-opacity duration-300 pointer-events-none">
        <span className="text-primary font-black text-xs uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Category {category.id}
        </span>
        <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {category.title.split('.')[1]?.trim() || category.title}
        </h3>
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          <Button
            variant="default"
            size="sm"
            className="h-9 px-4 rounded-none font-bold uppercase text-xs tracking-wider bg-primary hover:bg-primary/90"
          >
            <span>View more</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

CategoryCard.displayName = "CategoryCard";
