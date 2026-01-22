import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Image, Printer, Flag, Sticker, Grid3X3, Palette } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Rollup Banners",
    description: "Premium retractable banners perfect for events, exhibitions, and promotional displays.",
    icon: Flag,
    slug: "rollup-banners",
    price: "From ₦25,000",
  },
  {
    id: 2,
    title: "PVC Banners",
    description: "Durable outdoor and indoor banners with vibrant, weather-resistant prints.",
    icon: Image,
    slug: "pvc-banners",
    price: "From ₦3,000/sqm",
  },
  {
    id: 3,
    title: "Backdrops",
    description: "Large-format backdrop solutions for events, photo booths, and stage designs.",
    icon: Grid3X3,
    slug: "backdrops",
    price: "From ₦45,000",
  },
  {
    id: 4,
    title: "Sticker Printing",
    description: "Custom stickers and labels for branding, packaging, and promotional materials.",
    icon: Sticker,
    slug: "sticker-printing",
    price: "From ₦500/sheet",
  },
  {
    id: 5,
    title: "Pop-up Stands",
    description: "Portable exhibition displays that set up in minutes for maximum impact.",
    icon: Printer,
    slug: "pop-up-stands",
    price: "From ₦85,000",
  },
  {
    id: 6,
    title: "Custom Prints",
    description: "Bespoke printing solutions tailored to your unique requirements.",
    icon: Palette,
    slug: "custom-prints",
    price: "Get Quote",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="red-accent-bar mx-auto mb-6" />
          <h2 className="section-title mb-4">Our Services</h2>
          <p className="section-subtitle mx-auto">
            From concept to completion, we offer comprehensive print and advertising solutions 
            to help your business stand out.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="service-card group block p-6 h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">{service.price}</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
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
