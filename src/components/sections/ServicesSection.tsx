import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Service images - you can replace these with actual images
import lightbox from "@/assets/portfolio/lightbox.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import brandingItems from "@/assets/portfolio/branding-items.jpg";

const services = [
  {
    id: 1,
    title: "Signage & LED / Neon Signs",
    description: "High-impact 3D lettering, lightboxes, and custom neon signs that attract attention 24/7.",
    image: signage3d,
    slug: "signage",
  },
  {
    id: 2,
    title: "Printing & Large Format",
    description: "High-resolution flex banners, billboards, and vinyl stickers for maximum outdoor visibility.",
    image: brandingItems,
    slug: "printing",
  },
  {
    id: 3,
    title: "Promotional & Branding Items",
    description: "Roll-up banners, flags, teardrop stands, corporate gifts, and complete branding packages.",
    image: teardropFlags,
    slug: "promotional",
  },
  {
    id: 4,
    title: "Apparel & Corporate Gifts",
    description: "T-shirt printing, caps, pens, notebooks, mugs, and customized promotional items.",
    image: lightbox,
    slug: "apparel",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            CORE SERVICES
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase">
            Our Core Branding &<br />Printing Services
          </h2>
        </motion.div>

        {/* Services Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Service List with Images */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                {/* Service Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Service Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {service.description}
                  </p>
                  <Button 
                    size="sm" 
                    className="rounded-none"
                    asChild
                  >
                    <Link to={`/services/${service.slug}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Red accent bar */}
            <div className="absolute -top-4 right-0 w-1/2 h-2 bg-primary" />
            
            <div className="bg-primary rounded-lg overflow-hidden">
              <img 
                src={teardropFlags}
                alt="RISE Advertising - Branding Solutions"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:gap-3 transition-all"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
