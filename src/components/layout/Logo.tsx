import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon" | "footer";
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
    const sizes = {
        sm: "h-8",
        md: "h-12",
        lg: "h-16",
        xl: "h-24",
    };

    const iconSizes = {
        sm: "h-6 w-6",
        md: "h-10 w-10",
        lg: "h-14 w-14",
        xl: "h-20 w-20",
    };

    const LogoIcon = () => (
        <svg
            viewBox="0 0 100 100"
            className={cn(iconSizes[size])}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Red Dot */}
            <circle cx="20" cy="75" r="8" className="fill-primary" />

            {/* Stylized R */}
            <path
                d="M35 15C35 15 45 15 60 15C75 15 85 25 85 40C85 55 75 65 60 65H55V90"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-foreground dark:text-white"
            />
            <path
                d="M55 45C55 45 65 45 75 60C85 75 90 90 90 90"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-foreground dark:text-white"
            />
            <path
                d="M35 15V90"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-foreground dark:text-white"
            />

            {/* Curved flourish on top of R */}
            <path
                d="M35 15C35 15 45 5 60 5"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className="text-foreground dark:text-white"
            />
        </svg>
    );

    if (variant === "icon") {
        return <LogoIcon />;
    }

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <LogoIcon />
            <div className="flex flex-col leading-none">
                <div className="flex items-center gap-1">
                    <span className={cn(
                        "font-black tracking-tighter text-primary",
                        size === "sm" ? "text-xl" : size === "md" ? "text-3xl" : size === "lg" ? "text-4xl" : "text-6xl"
                    )}>
                        RISE
                    </span>
                </div>
                <span className={cn(
                    "font-bold tracking-[0.2em] text-foreground dark:text-white/90",
                    size === "sm" ? "text-[0.5rem]" : size === "md" ? "text-[0.6rem]" : size === "lg" ? "text-[0.8rem]" : "text-sm"
                )}>
                    ADVERTISING
                </span>
                {variant === "full" && (
                    <span className={cn(
                        "font-bold tracking-[0.1em] text-primary whitespace-nowrap",
                        size === "sm" ? "text-[0.4rem]" : size === "md" ? "text-[0.5rem]" : size === "lg" ? "text-[0.6rem]" : "text-[0.8rem]"
                    )}>
                        THE BRANDING EMPIRE
                    </span>
                )}
            </div>
        </div>
    );
}
