import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";

// Import service images
import brandingItems from "@/assets/portfolio/branding-items.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";
import keychains from "@/assets/portfolio/keychains.jpg";
import lightbox from "@/assets/portfolio/lightbox.jpg";
import backlightFoam from "@/assets/portfolio/backlight-foam.jpg";

const allServices = [
  {
    id: 1,
    title: "Rollup Banners",
    slug: "rollup-banners",
    shortDescription: "Premium retractable banners perfect for events, exhibitions, and promotional displays.",
    longDescription: "Our rollup banners are crafted from high-quality materials that ensure durability and vibrant colors. Perfect for trade shows, conferences, retail displays, and office spaces. Easy to set up and transport, these banners make a powerful statement wherever you go.",
    priceRange: "Starting from ETB 2,500",
    image: teardropFlags,
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
    priceRange: "Starting from ETB 300/sqm",
    image: brandingItems,
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
    title: "3D Signage & Lightbox",
    slug: "backdrops",
    shortDescription: "Professional 3D signage, lightbox, and illuminated letter solutions for businesses.",
    longDescription: "Create stunning visual impact with our professional 3D signage and lightbox solutions. From backlit circle lightboxes to 3D foam letters with LED illumination, our signage solutions are designed to make your brand memorable day and night.",
    priceRange: "Starting from ETB 4,500",
    image: signage3d,
    features: [
      "3D foam and acrylic letters",
      "LED backlighting options",
      "Circle and custom shape lightboxes",
      "Weather-resistant for outdoor use",
      "Energy-efficient LED technology",
      "Custom designs and sizes",
    ],
    sizes: ["Custom sizes available"],
    turnaround: "3-7 business days",
  },
  {
    id: 4,
    title: "Promotional Items",
    slug: "sticker-printing",
    shortDescription: "Custom keychains, mugs, caps, t-shirts, and branded merchandise.",
    longDescription: "Boost your brand visibility with our range of promotional items. From custom metal keychains to branded mugs, caps, and t-shirts, we offer high-quality merchandise that makes your brand memorable.",
    priceRange: "Starting from ETB 50/piece",
    image: keychains,
    features: [
      "Metal and acrylic keychains",
      "Ceramic and steel mugs",
      "Custom printed t-shirts",
      "Branded caps and hats",
      "Full-color logo printing",
      "Bulk order discounts",
    ],
    sizes: ["Various sizes available"],
    turnaround: "2-5 business days",
  },
  {
    id: 5,
    title: "Teardrop & Feather Flags",
    slug: "pop-up-stands",
    shortDescription: "Eye-catching promotional flags that stand out at events and storefronts.",
    longDescription: "Make an impact with our teardrop and feather flags. These portable displays are perfect for events, exhibitions, retail environments, and outdoor advertising. Available with various base options for different surfaces.",
    priceRange: "Starting from ETB 3,500",
    image: teardropFlags,
    features: [
      "Double-sided printing available",
      "Durable polyester fabric",
      "Rotating pole for wind resistance",
      "Multiple base options",
      "Includes carrying bag",
      "Various height options",
    ],
    sizes: ["2m", "3m", "4m", "5m heights"],
    turnaround: "2-3 business days",
  },
  {
    id: 6,
    title: "Custom Branding Solutions",
    slug: "custom-prints",
    shortDescription: "Complete branding packages tailored to your unique business needs.",
    longDescription: "From vehicle wraps to complete event branding, our custom solutions cover all your advertising needs. We work with you from concept to completion, ensuring your brand makes the impact it deserves.",
    priceRange: "Contact for Quote",
    image: brandingItems,
    features: [
      "Vehicle wraps and graphics",
      "Event tents and gazebos",
      "Complete event branding",
      "Shop front signage",
      "Corporate branding packages",
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
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                <span className="text-sm text-white/60">Price</span>
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
                {/* Service Image */}
                <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

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
                    <a href="tel:+251936704476">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:riseadvertising11@gmail.com" className="hover:text-primary">
                      riseadvertising11@gmail.com
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
