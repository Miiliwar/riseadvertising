import { cn } from "@/lib/utils";
import logoHeader from "@/assets/logo-header.png";
import logoFull from "@/assets/logo-full.png";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon" | "footer" | "header";
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
    // Height sizes for different logo sizes
    const heights = {
        sm: "h-10 md:h-12",
        md: "h-14 md:h-16",
        lg: "h-16 md:h-20",
        xl: "h-20 md:h-24",
    };

    // For footer variant on dark background, invert the black parts to white
    const isFooter = variant === "footer";
    const isHeader = variant === "header";

    // Use header logo for header variant, full logo for others
    const logoSrc = isHeader ? logoHeader : logoFull;

    return (
        <div className={cn("flex items-center", className)}>
            <img 
                src={logoSrc} 
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
