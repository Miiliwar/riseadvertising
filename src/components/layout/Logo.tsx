import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon" | "footer";
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
    // Font sizes for different logo sizes
    const dotSizes = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-5xl",
    };

    const rSizes = {
        sm: "text-2xl",
        md: "text-4xl",
        lg: "text-5xl",
        xl: "text-7xl",
    };

    const iseSizes = {
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-4xl",
        xl: "text-6xl",
    };

    const advertisingSizes = {
        sm: "text-[0.6rem] tracking-[0.15em]",
        md: "text-xs tracking-[0.2em]",
        lg: "text-sm tracking-[0.25em]",
        xl: "text-lg tracking-[0.3em]",
    };

    const taglineSizes = {
        sm: "text-[0.4rem]",
        md: "text-[0.5rem]",
        lg: "text-[0.6rem]",
        xl: "text-xs",
    };

    // Icon only version - just the stylized R with dot
    if (variant === "icon") {
        return (
            <div className={cn("flex items-baseline", className)}>
                <span className={cn("font-black text-primary leading-none", dotSizes[size])}>.</span>
                <span className={cn(
                    "leading-none text-foreground",
                    rSizes[size]
                )} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontStyle: "italic" }}>
                    R
                </span>
            </div>
        );
    }

    // Footer variant - inverted colors for dark background
    const isFooter = variant === "footer";
    const textColor = isFooter ? "text-white" : "text-foreground";

    return (
        <div className={cn("flex flex-col leading-none", className)}>
            {/* .RISE text */}
            <div className="flex items-baseline">
                <span className={cn("font-black text-primary leading-none", dotSizes[size])}>.</span>
                <span className={cn(
                    "leading-none",
                    textColor,
                    rSizes[size]
                )} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontStyle: "italic" }}>
                    R
                </span>
                <span className={cn(
                    "font-black text-primary leading-none",
                    iseSizes[size]
                )}>
                    ISE
                </span>
            </div>
            {/* ADVERTISING */}
            <span className={cn(
                "font-black uppercase leading-tight",
                textColor,
                advertisingSizes[size]
            )}>
                ADVERTISING
            </span>
            {/* THE BRANDING EMPIRE tagline - only for full variant */}
            {variant === "full" && (
                <span className={cn(
                    "font-semibold tracking-[0.1em] text-primary uppercase whitespace-nowrap leading-tight mt-0.5",
                    taglineSizes[size]
                )}>
                    THE BRANDING EMPIRE
                </span>
            )}
        </div>
    );
}
