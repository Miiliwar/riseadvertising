import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Moon, Sun, User, LogIn } from "lucide-react";
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
        <div className="flex items-center justify-between h-24 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="lg" />
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

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+251936704476"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">+251 936 704 476</span>
            </a>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Login/User Button */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
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
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4"
                    onClick={() => navigate("/admin/login")}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </>
            )}

            <Button asChild className="rounded-full px-6">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -m-2"
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

                {/* Mobile Login/User Button */}
                {!loading && (
                  <>
                    {user ? (
                      <div className="space-y-2 mt-2">
                        {(isAdmin || isEditor) && (
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {
                              navigate("/admin");
                              setMobileMenuOpen(false);
                            }}
                          >
                            <User className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => {
                          navigate("/admin/login");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login / Sign Up
                      </Button>
                    )}
                  </>
                )}

                <Button asChild className="w-full mt-2">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>

                {/* Mobile Theme Toggle */}
                <Button
                  variant="outline"
                  className="w-full mt-2 rounded-lg flex items-center justify-between px-4"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <span className="text-sm font-semibold">
                    {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </span>
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 transition-all dark:hidden" />
                    <Moon className="h-5 w-5 transition-all hidden dark:block" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
