import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight, Loader2, Info, Phone, Mail, Check, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price_range: string | null;
  image_url: string | null;
  features?: string[];
  tags: string[] | null;
}

// Static Category Definitions (A-M)
// We now filter based on the tag matching the full title
const SERVICE_CATEGORIES = [
  { id: "A", title: "A. Signage & Neon & LED Signs" },
  { id: "B", title: "B. Large Format & UV Printing" },
  { id: "C", title: "C. Promotional Items & Gift & Giveaways" },
  { id: "D", title: "D. Corporate Branding & Identity" },
  { id: "E", title: "E. Vehicle Graphics & Branding" },
  { id: "F", title: "F. Digital Printing & Stationery" },
  { id: "G", title: "G. Creative Graphic Design" },
  { id: "H", title: "H. Exhibition & Event Branding" },
  { id: "I", title: "I. Indoor & Office Branding" },
  { id: "J", title: "J. Outdoor Advertising Solutions" },
  { id: "K", title: "K. Apparel & Textile Printing" },
  { id: "L", title: "L. Custom fabrication & 3D lettering" },
  { id: "M", title: "M. Maintenance & Installation Services" },
];

export default function ServicesPage() {
  const location = useLocation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  // Initialize active category from navigation state if available
  const [activeCategory, setActiveCategory] = useState(
    (location.state as any)?.category || "All"
  );

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(s => s.tags?.includes(activeCategory));

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20 lg:py-28 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="hero-title mb-6 uppercase">Our Branding & Printing Catalog</h1>
            <p className="hero-subtitle text-white/90">
              High-impact solutions tailored to help your business stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Filter Bar */}
      <section className="bg-background border-b border-border sticky top-[72px] z-20 backdrop-blur-md bg-white/90 py-8">
        <div className="page-container">
          <div className="flex flex-nowrap items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "whitespace-nowrap px-8 py-3 rounded-none font-black text-xs uppercase tracking-[0.2em] transition-all border-2",
                activeCategory === "All"
                  ? "bg-primary border-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-background border-muted-foreground/10 text-muted-foreground hover:border-primary/50"
              )}
            >
              All Works
            </button>

            <div className="h-8 w-px bg-border mx-2 hidden md:block" />

            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.title)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all border-2 shrink-0",
                  activeCategory === cat.title
                    ? "bg-primary border-primary text-primary-foreground shadow-xl scale-105 z-10"
                    : "bg-background border-muted-foreground/10 text-muted-foreground hover:border-primary/50"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Currently Viewing: <span className="text-primary italic">{activeCategory === "All" ? "Full Collection" : activeCategory}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background min-h-[60vh]">
        <div className="page-container">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="font-black uppercase tracking-widest text-xs">Accessing Cloud Registry...</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-16 gap-6">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground whitespace-nowrap">
                  {activeCategory === "All" ? "Premium Services" : activeCategory.split('.')[0]}
                </h2>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
              </div>

              {filteredServices.length === 0 ? (
                <div className="text-center py-24 bg-muted/10 rounded-[3rem] border-2 border-dashed border-muted-foreground/10">
                  <Info className="h-16 w-16 mx-auto text-muted-foreground/20 mb-6" />
                  <h3 className="text-xl font-bold uppercase tracking-tight text-muted-foreground">Collection Empty</h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mt-2">We are currently updating our collection for this category. Please check back shortly.</p>
                  <Button variant="outline" onClick={() => setActiveCategory("All")} className="mt-8 rounded-none border-2 h-12 px-8 font-bold uppercase">
                    Back to All Services
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        layout
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card className="group h-full overflow-hidden border-none shadow-premium hover:shadow-2xl transition-all duration-500 flex flex-col bg-card">
                          <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                            <img
                              src={service.image_url || "/placeholder.svg"}
                              alt={service.title}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                              <p className="text-white text-center text-xs font-medium leading-relaxed max-w-[200px]">
                                {service.short_description}
                              </p>
                            </div>

                            {/* Classification Badge */}
                            <div className="absolute top-5 left-5 max-w-[80%]">
                              <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-none uppercase tracking-[0.2em] shadow-2xl block truncate">
                                {service.tags?.[0] ? `Category ${service.tags[0].split('.')[0]}` : "RISE"}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-8 flex flex-1 flex-col">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors line-clamp-2">
                              {service.title}
                            </h3>
                            <div className="mt-auto pt-6 border-t border-muted-foreground/10 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {service.price_range || "Contact for Quote"}
                              </span>
                              <Link
                                to={`/services/${service.slug}`}
                                state={{ category: service.tags?.[0] || "All" }}
                                className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest group/link"
                              >
                                Details
                                <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

// Service Detail View
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
        <div className="flex items-center justify-center py-40">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="page-container py-40 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Registry Entry Not Found</h1>
          <p className="text-muted-foreground mb-12 uppercase tracking-widest text-xs font-bold">
            The requested service identifier does not exist in our cloud database.
          </p>
          <Button asChild size="lg" className="rounded-none font-black uppercase h-14 px-10 shadow-premium">
            <Link to="/services">Return to Catalog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Detail */}
      <section className="bg-hero-pattern py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white max-w-4xl"
          >
            <Link
              to="/services"
              state={{ category: service.tags?.[0] || "All" }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-6 font-black uppercase text-[10px] tracking-[0.2em]"
            >
              ← Back to {service.tags?.[0] ? service.tags[0].split('.')[0] : "Catalog"}
            </Link>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8">{service.title}</h1>
            <p className="text-xl lg:text-2xl text-white/80 font-medium max-w-2xl border-l-4 border-primary pl-8 py-2">
              {service.short_description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-12">
              <div className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-none border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-1">Pricing Guide</span>
                <div className="text-2xl font-black">{service.price_range || "On Request"}</div>
              </div>
              <div className="px-8 py-4 bg-primary rounded-none shadow-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-1">Lead Time</span>
                <div className="text-2xl font-black italic">2-5 DAYS</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Presentation Content */}
      <section className="py-24 bg-background">
        <div className="page-container">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Visual Column */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden shadow-premium bg-muted border-8 border-card">
                  <img
                    src={service.image_url || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-xl dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-primary" />
                    Service Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                    {service.long_description || service.short_description}
                  </p>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="bg-muted/30 p-12 rounded-[2rem] border-2 border-dashed border-primary/10">
                    <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-primary">Technical Specs & Features</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border/50">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-bold text-sm uppercase tracking-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Request Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 text-white p-12 rounded-[3rem] shadow-premium sticky top-28 border-8 border-white/5"
              >
                <div className="mb-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Get a Custom Quote</h3>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">
                    Provide us with your project dimensions and details to receive a comprehensive estimate within 24 business hours.
                  </p>
                </div>

                <div className="space-y-4 mb-12">
                  <Button className="w-full h-16 rounded-none bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl" asChild>
                    <Link to="/request-quote">Request Official Estimate</Link>
                  </Button>
                  <Button variant="outline" className="w-full h-16 rounded-none border-2 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest text-xs" asChild>
                    <a href="tel:+251936704476">
                      <Phone className="h-4 w-4 mr-3" />
                      Direct Line: 251-936-704-476
                    </a>
                  </Button>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="bg-white/5 p-3 rounded-xl group-hover:bg-primary transition-colors">
                      <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-white/30 block">Send Assets</span>
                      <a href="mailto:riseadvertising11@gmail.com" className="text-sm font-black uppercase tracking-tight hover:text-primary transition-colors">
                        riseadvertising11@gmail.com
                      </a>
                    </div>
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
