import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Moon, Sun, User, LogIn, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, isAdmin, isEditor, signOut, loading } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      if (isAdmin || isEditor) {
        navigate("/admin");
      } else {
        // Regular user - show user menu or profile
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="page-container" aria-label="Global">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="lg:hidden">
              <Logo size="md" />
            </div>
            <div className="hidden lg:block">
              <Logo size="lg" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Header Actions (Visible on Mobile and Desktop) */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9 md:h-10 md:w-10"
            >
              <Sun className="h-4 w-4 md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>


            {/* Login/User Button */}
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10">
                      <User className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {(isAdmin || isEditor) && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 md:h-10 md:w-10"
                  onClick={() => navigate("/admin/login")}
                >
                  <LogIn className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              )}
            </div>

            {/* Desktop-only Quote Button */}
            <Button asChild className="hidden sm:flex rounded-full px-4 md:px-6 h-9 md:h-10">
              <Link to="/contact">Get Quote</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-semibold rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <a
                  href="tel:+251936704476"
                  className="flex items-center gap-2 px-4 py-3 text-base font-semibold"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+251 936 704 476</span>
                </a>

                <Button asChild className="w-full mt-2">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
