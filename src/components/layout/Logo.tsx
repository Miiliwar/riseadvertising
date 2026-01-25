import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-full.png";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon" | "footer";
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
    // Height sizes for different logo sizes
    const heights = {
        sm: "h-8 md:h-10",
        md: "h-10 md:h-12",
        lg: "h-12 md:h-14",
        xl: "h-16 md:h-20",
    };

    // For footer variant on dark background, invert the black parts to white
    const isFooter = variant === "footer";

    return (
        <div className={cn("flex items-center", className)}>
            <img 
                src={logoFull} 
                alt="RISE Advertising - The Branding Empire" 
                className={cn(
                    heights[size],
                    "w-auto object-contain",
                    isFooter && "brightness-0 invert"
                )}
            />
        </div>
    );
}
