import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Moon, Sun, User, LogIn, ChevronRight, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  { name: "Our Works", href: "/portfolio" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, isAdmin, isEditor, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      {/* Top Contact Bar - Black Background */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black text-white py-2">
        <div className="page-container flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
            <a href="https://www.google.com/maps/place/RISE+ADVERTISING+AND+PRINTING/@8.9510213,38.7177277,17z"
              target="_self"
              rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors whitespace-nowrap">
              <span className="text-primary font-bold">📍</span>
              <span className="hidden xs:inline">Addis Ababa, Ethiopia</span>
              <span className="xs:hidden">Addis Ababa</span>
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a href="tel:+251936704476" className="flex items-center gap-1.5 hover:text-primary transition-colors whitespace-nowrap">
              <span className="text-primary font-bold">📞</span>
              <span className="hidden xs:inline">+251 936 704 476</span>
              <span className="xs:hidden">Call Now</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://m.me/riseadvertising1" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
            </a>
            <a href="https://ig.me/riseadvertising11" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://tiktok.com/@riseadvertising1" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
            </a>
            <a href="https://t.me/riseadvertising1" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.961 7.224c.131.021.34.005.441.446a2.68 2.68 0 0 1 .08.571s-.011.02-.303 1.944c-1.353 8.356-1.742 10.686-2.146 11.026-.819.688-2.584-.525-2.859-.724-2.844-2.072-3.868-2.607-4.22-2.888-.47-.375-.125-.97.234-1.472.102-.142 5.86-5.834 6.136-6.42a.267.267 0 0 0-.083-.223c-.161-.137-3.926 2.39-5.115 3.197-.565.383-1.077.568-1.53.551-.57-.02-1.637-.306-2.455-.572-.988-.323-1.776-.531-1.706-1.121.036-.312.428-.636 1.171-.967 4.542-2.105 7.625-3.523 9.25-4.27 4.609-2.115 5.567-2.484 6.204-2.397.142.02.457.068.707.091z" /></svg>
            </a>
            <a href="https://youtube.com/@riseadvertising" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
            </a>
            <a href="https://twitter.com/@riseadvertising" target="_self" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Red Background */}
      <header className="fixed top-0 md:top-[36px] left-0 right-0 z-50 bg-primary text-primary-foreground">
        <nav className="page-container" aria-label="Global">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="lg:hidden">
                <Logo size="md" variant="header" />
              </div>
              <div className="hidden lg:block">
                <Logo size="lg" variant="header" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-white/70",
                    location.pathname === item.href
                      ? "text-white"
                      : "text-white/90"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full h-9 w-9 md:h-10 md:w-10 text-white hover:bg-white/20"
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
                      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10 text-white hover:bg-white/20">
                        <User className="h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(isAdmin || isEditor) && (
                        <DropdownMenuItem onSelect={() => navigate("/admin")}>
                          Admin Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onSelect={handleSignOut}>
                        log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 md:h-10 md:w-10 text-white hover:bg-white/20"
                    onClick={() => navigate("/admin/login")}
                  >
                    <LogIn className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Login</span>
                  </Button>
                )}
              </div>

              {/* Desktop-only Quote Button */}
              <Button asChild className="hidden sm:flex rounded-none px-4 md:px-6 h-9 md:h-10 bg-black text-white hover:bg-black/80">
                <Link to="/request-quote">Request a Quote</Link>
              </Button>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 -mr-2 flex items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
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

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden py-4 border-t border-white/20 bg-primary/95 backdrop-blur-lg overflow-y-auto max-h-[calc(100vh-100px)]"
              >
                <div className="flex flex-col gap-1">
                  {/* Admin Dashboard Link for Mobile */}
                  {user && (isAdmin || isEditor) && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3.5 text-base font-bold rounded-none transition-colors text-white bg-white/10 flex items-center justify-between group underline decoration-white/30 underline-offset-4"
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5 text-white" />
                        Admin Dashboard
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}

                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3.5 text-base font-bold rounded-none transition-colors text-white flex items-center justify-between group",
                        location.pathname === item.href
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      )}
                    >
                      {item.name}
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform",
                        location.pathname === item.href ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />
                    </Link>
                  ))}

                  <div className="px-4 pt-6 mt-4 border-t border-white/10 space-y-4">
                    <div className="flex flex-col gap-4">
                      <a
                        href="tel:+251936704476"
                        className="flex items-center gap-3 py-2 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest opacity-60">Call Us Directly</span>
                          <span className="text-base font-black">+251 936 704 476</span>
                        </div>
                      </a>
                    </div>

                    <Button asChild size="lg" className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 font-black uppercase tracking-widest">
                      <Link to="/request-quote" onClick={() => setMobileMenuOpen(false)}>
                        Request a Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
