import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import brandingShowcase from "@/assets/branding-showcase.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col pt-20">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="page-container flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              📍 Addis Ababa, Ethiopia
            </span>
            <a href="tel:+251936704476" className="flex items-center gap-1 hover:underline">
              📞 Call us: +251936704476
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com/riseadvertising1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
            </a>
            <a href="https://instagram.com/riseadvertising1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://youtube.com/@riseadvertising" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="https://twitter.com/riseadvertising" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Hero */}
      <div className="flex-1 bg-background flex items-center">
        <div className="page-container py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6 uppercase">
                Signage, Printing &{" "}
                <span className="text-primary">Branding Solutions</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Helping businesses stand out with quality signage, printing, and creative branding.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto lg:mx-0 mb-8">
                <Input 
                  placeholder="Search Products..." 
                  className="h-14 pl-5 pr-14 rounded-none border-2 border-foreground bg-foreground text-background placeholder:text-background/60"
                />
                <Button 
                  size="icon" 
                  className="absolute right-0 top-0 h-14 w-14 rounded-none bg-primary hover:bg-primary/90"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button size="xl" asChild className="rounded-none px-8">
                  <Link to="/contact">
                    Request a Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  asChild 
                  className="rounded-none px-8 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                >
                  <a href="https://wa.me/251936704476" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative">
                <img 
                  src={brandingShowcase}
                  alt="RISE Advertising - Complete Branding Solutions" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-primary py-8">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-primary-foreground">
              <h3 className="text-xl md:text-2xl font-bold">Subscribe to the latest news</h3>
              <p className="text-primary-foreground/80 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-0">
              <Input
                type="email"
                placeholder="Enter your email..."
                className="h-12 px-4 bg-white border-0 rounded-none min-w-[280px] text-foreground"
              />
              <Button className="h-12 rounded-none bg-foreground hover:bg-foreground/90 text-background px-6">
                Subscribe!
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/251936704476"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </section>
  );
}
