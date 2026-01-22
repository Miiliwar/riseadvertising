import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";

const allServices = [
  {
    id: 1,
    title: "Rollup Banners",
    slug: "rollup-banners",
    shortDescription: "Premium retractable banners perfect for events, exhibitions, and promotional displays.",
    longDescription: "Our rollup banners are crafted from high-quality materials that ensure durability and vibrant colors. Perfect for trade shows, conferences, retail displays, and office spaces. Easy to set up and transport, these banners make a powerful statement wherever you go.",
    priceRange: "₦25,000 - ₦85,000",
    features: [
      "Premium aluminum construction",
      "High-resolution print (1440dpi)",
      "Easy retractable mechanism",
      "Includes carrying case",
      "Multiple size options (80cm, 100cm, 120cm wide)",
      "Scratch-resistant lamination available",
    ],
    sizes: ["80cm x 200cm", "100cm x 200cm", "120cm x 200cm", "150cm x 200cm"],
    turnaround: "24-48 hours",
  },
  {
    id: 2,
    title: "PVC Banners",
    slug: "pvc-banners",
    shortDescription: "Durable outdoor and indoor banners with vibrant, weather-resistant prints.",
    longDescription: "Our PVC banners are designed for maximum visibility and durability. Made from premium 440gsm PVC material, they're perfect for outdoor advertising, events, construction sites, and storefronts. Weather-resistant and UV-stable for long-lasting color.",
    priceRange: "₦3,000 - ₦5,000/sqm",
    features: [
      "440gsm premium PVC material",
      "Full-color printing",
      "UV-resistant inks",
      "Hemmed edges and metal eyelets",
      "Indoor and outdoor use",
      "Custom sizes available",
    ],
    sizes: ["Custom sizes", "Standard: 1m x 2m", "2m x 3m", "3m x 5m"],
    turnaround: "24-48 hours",
  },
  {
    id: 3,
    title: "Backdrops",
    slug: "backdrops",
    shortDescription: "Large-format backdrop solutions for events, photo booths, and stage designs.",
    longDescription: "Create stunning visual impact with our professional backdrop solutions. From media walls to event stages, our backdrops are designed to make your brand memorable. Available in various formats including pop-up, tension fabric, and custom builds.",
    priceRange: "₦45,000 - ₦350,000",
    features: [
      "Pop-up and tension fabric systems",
      "Seamless large-format printing",
      "Quick assembly (under 10 minutes)",
      "Lightweight and portable",
      "Reusable with interchangeable graphics",
      "Custom sizes and shapes",
    ],
    sizes: ["2.3m x 2.3m", "3m x 2.3m", "4m x 2.3m", "Custom sizes"],
    turnaround: "3-5 business days",
  },
  {
    id: 4,
    title: "Sticker Printing",
    slug: "sticker-printing",
    shortDescription: "Custom stickers and labels for branding, packaging, and promotional materials.",
    longDescription: "From product labels to promotional stickers, we offer premium sticker printing for all your needs. Available in various materials including vinyl, paper, and transparent options. Die-cut, kiss-cut, or sheet format available.",
    priceRange: "₦500 - ₦2,500/sheet",
    features: [
      "Multiple material options",
      "Die-cut and kiss-cut available",
      "Waterproof options",
      "High-tack and removable adhesives",
      "Full-color printing",
      "Minimum order: 50 sheets",
    ],
    sizes: ["A4 sheets", "A3 sheets", "Custom die-cut sizes"],
    turnaround: "24-48 hours",
  },
  {
    id: 5,
    title: "Pop-up Stands",
    slug: "pop-up-stands",
    shortDescription: "Portable exhibition displays that set up in minutes for maximum impact.",
    longDescription: "Make an impact at trade shows and events with our professional pop-up stands. Featuring premium fabric or PVC graphics on sturdy aluminum frames, these displays are designed for frequent use and easy transportation.",
    priceRange: "₦85,000 - ₦450,000",
    features: [
      "Premium aluminum frame",
      "Magnetic connector system",
      "Fabric or PVC graphics",
      "LED lighting options",
      "Includes wheeled case",
      "5-year frame warranty",
    ],
    sizes: ["3x1 (2.3m wide)", "3x2 (3.4m wide)", "3x3 (4.5m wide)", "Curved options"],
    turnaround: "5-7 business days",
  },
  {
    id: 6,
    title: "Custom Prints",
    slug: "custom-prints",
    shortDescription: "Bespoke printing solutions tailored to your unique requirements.",
    longDescription: "Have a unique print requirement? Our custom printing service handles everything from vehicle wraps to building signage, floor graphics to window displays. Tell us your vision, and we'll make it happen.",
    priceRange: "Contact for Quote",
    features: [
      "Vehicle wraps and graphics",
      "Building and wall signage",
      "Floor graphics",
      "Window displays",
      "Specialty materials",
      "Project consultation included",
    ],
    sizes: ["Custom sizes"],
    turnaround: "Varies by project",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20 lg:py-28">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="hero-title mb-6">Our Services</h1>
            <p className="hero-subtitle text-white/80">
              Comprehensive print and advertising solutions to make your brand stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="service-card group block h-full"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-primary/30">.R</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {service.priceRange}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

// Single Service Page Component
export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Layout>
        <div className="page-container py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The service you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20 lg:py-28">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-3xl"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
            >
              ← Back to Services
            </Link>
            <h1 className="hero-title mb-6">{service.title}</h1>
            <p className="hero-subtitle text-white/80 mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-sm text-white/60">Starting from</span>
                <div className="text-xl font-bold">{service.priceRange}</div>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-sm text-white/60">Turnaround</span>
                <div className="text-xl font-bold">{service.turnaround}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.longDescription}
                </p>

                <h3 className="text-xl font-bold mb-4">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">Available Sizes</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.sizes.map((size, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h3 className="text-xl font-bold mb-4">Get a Quote</h3>
                <p className="text-muted-foreground mb-6">
                  Ready to order? Contact us for a detailed quote tailored to your needs.
                </p>
                
                <div className="space-y-3 mb-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="tel:+2348000000000">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:info@riseadvertising.ng" className="hover:text-primary">
                      info@riseadvertising.ng
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
