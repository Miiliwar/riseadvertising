import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-pattern overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="page-container relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium">Ethiopia's #1 Print Solutions</span>
            </motion.div>

            <h1 className="hero-title mb-6 text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
              Premium Print &{" "}
              <span className="text-primary">Advertising</span>{" "}
              Solutions
            </h1>

            <p className="hero-subtitle text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 text-base md:text-lg lg:text-xl">
              From rollup banners to large-format prints, we deliver exceptional quality
              that makes your brand stand out. Fast turnaround, competitive prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-white/20"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold">500+</div>
                  <div className="text-white/60">Happy Clients</div>
                </div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-sm">
                <div className="font-bold">10,000+</div>
                <div className="text-white/60">Projects Delivered</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-sm">
                <div className="font-bold">24-48hrs</div>
                <div className="text-white/60">Fast Turnaround</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Video/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Video Container */}
            <div className="relative aspect-video lg:aspect-square max-w-2xl mx-auto rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl overflow-hidden border border-white/10 mb-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Cards Container - Now outside video */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div>
                  <div className="font-bold text-white text-base">4.9 Rating</div>
                  <div className="text-xs text-white/60">500+ Reviews</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="font-bold text-white text-base">Active Solutions</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
