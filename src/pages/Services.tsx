import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, Mail, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { supabase } from "@/integrations/supabase/client";

// Import service images (fallbacks)
import brandingItems from "@/assets/portfolio/branding-items.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";
import keychains from "@/assets/portfolio/keychains.jpg";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price_range: string | null;
  image_url: string | null;
  features: string[] | null;
}

const fallbackServices = [
  {
    id: "1",
    title: "Rollup Banners",
    slug: "rollup-banners",
    short_description: "Premium retractable banners perfect for events, exhibitions, and promotional displays.",
    image_url: teardropFlags,
    price_range: "Starting from ETB 2,500",
  },
  {
    id: "2",
    title: "PVC Banners",
    slug: "pvc-banners",
    short_description: "Durable outdoor and indoor banners with vibrant, weather-resistant prints.",
    image_url: brandingItems,
    price_range: "Starting from ETB 300/sqm",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setServices(data as any[]);
        } else {
          setServices(fallbackServices as any[]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(fallbackServices as any[]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

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
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="service-card group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                      <img
                        src={service.image_url || signage3d}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="text-sm font-semibold text-primary mb-2">
                        {service.price_range}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {service.short_description}
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
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
// Single Service Page Component
export function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setService(data as any);
      } catch (error) {
        console.error("Error fetching service detail:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

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
              {service.short_description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-sm text-white/60">Price</span>
                <div className="text-xl font-bold">{service.price_range || "Contact for Quote"}</div>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-sm text-white/60">Turnaround</span>
                <div className="text-xl font-bold">2-5 business days</div>
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
                    src={service.image_url || signage3d}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-lg text-muted-foreground mb-8 whitespace-pre-wrap">
                  {service.long_description || service.short_description}
                </p>

                {service.features && service.features.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-4">What's Included</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
