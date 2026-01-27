import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import brandingShowcase from "@/assets/branding-showcase.jpg";
import riseTextureIcon from "@/assets/rise-texture-icon.png";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh_-_92px)] lg:h-[calc(100vh_-_100px)] flex flex-col overflow-hidden">
      {/* Main Hero */}
      <div className="flex-1 bg-background flex items-center relative overflow-hidden">
        <div className="page-container py-1 lg:py-4">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center h-full">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center lg:text-left z-10"
            >
              <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-2 uppercase leading-tight">
                Signage, Printing &{" "}
                <span className="text-primary">Branding Solutions</span>
              </h1>

              <p className="text-sm md:text-xl font-medium text-foreground mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Helping businesses stand out with quality signage, printing, and creative branding.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-sm mx-auto lg:mx-0 mb-4 lg:mb-6">
                <Input
                  placeholder="Search Products..."
                  className="h-10 lg:h-12 pl-4 pr-12 rounded-none border-2 border-foreground bg-foreground text-background placeholder:text-background/60 text-sm"
                />
                <Button
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 lg:h-12 lg:w-12 rounded-none bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4">
                <Button size="lg" asChild className="rounded-none px-4 lg:px-6 h-10 lg:h-12 text-sm">
                  <Link to="/request-quote">
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {/* <Button
                  size="lg"
                  asChild
                  className="rounded-none px-4 lg:px-6 h-10 lg:h-12 text-sm bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                >
                  <a href="https://wa.me/251936704476" target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button> */}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative mt-2 lg:mt-0 max-w-[300px] lg:max-w-md mx-auto h-full flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={brandingShowcase}
                  alt="RISE Advertising"
                  className="w-full h-auto max-h-[30vh] lg:max-h-[100vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-primary py-2 lg:py-3 flex-shrink-0 border-t border-white/10">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
            <div className="text-primary-foreground text-center lg:text-left">
              <h3 className="text-sm lg:text-lg font-black uppercase tracking-widest leading-tight">Subscribe to latest news</h3>
              <p className="text-white font-bold text-[10px] lg:text-sm">
                Stay updated with our latest offers and branding tips
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-0 max-w-[300px] lg:max-w-sm">
              <Input
                type="email"
                placeholder="Your email..."
                className="h-8 lg:h-10 px-3 bg-white border-0 rounded-none text-foreground text-xs"
              />
              <Button className="h-8 lg:h-10 rounded-none bg-foreground hover:bg-foreground/90 text-background px-4 text-xs font-bold whitespace-nowrap">
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
        className="fixed bottom-14 left-6 z-50 w-12 h-12 lg:w-14 lg:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg className="h-6 w-6 lg:h-7 lg:w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}


