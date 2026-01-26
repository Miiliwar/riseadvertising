import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Default service images fallback
import lightbox from "@/assets/portfolio/lightbox.jpg";
import signage3d from "@/assets/portfolio/3d-signage.jpg";
import teardropFlags from "@/assets/portfolio/teardrop-flags.jpg";
import brandingItems from "@/assets/portfolio/branding-items.jpg";

// Featured showcase image
import brandingShowcase from "@/assets/branding-showcase.jpg";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  image_url: string | null;
}

const fallbackImages: Record<string, string> = {
  signage: signage3d,
  printing: brandingItems,
  promotional: teardropFlags,
  apparel: lightbox,
};

const defaultServices = [
  {
    id: "1",
    title: "Signage & LED / Neon Signs",
    short_description: "High-impact 3D lettering, lightboxes, and custom neon signs that attract attention 24/7.",
    image_url: signage3d,
    slug: "signage",
  },
  {
    id: "2",
    title: "Printing & Large Format",
    short_description: "High-resolution flex banners, billboards, and vinyl stickers for maximum outdoor visibility.",
    image_url: brandingItems,
    slug: "printing",
  },
  {
    id: "3",
    title: "Promotional & Branding Items",
    short_description: "Roll-up banners, flags, teardrop stands, corporate gifts, and complete branding packages.",
    image_url: teardropFlags,
    slug: "promotional",
  },
];

export function ServicesSection() {
  // Fetch services from database
  const { data: dbServices } = useQuery({
    queryKey: ["home-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, slug, short_description, image_url")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data as Service[];
    },
  });

  // Use database services if available, otherwise use defaults
  const services = dbServices && dbServices.length > 0 ? dbServices : defaultServices;

  const getServiceImage = (service: Service) => {
    if (service.image_url) return service.image_url;
    return fallbackImages[service.slug] || signage3d;
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
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

        {/* Services Layout - Matching reference design */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
                <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-secondary shadow-lg">
                  <img 
                    src={getServiceImage(service)} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Service Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.short_description}
                  </p>
                  <Button 
                    size="sm" 
                    className="rounded-none bg-primary hover:bg-primary/90"
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

          {/* Right: Featured Image with Red Background */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Red accent bar at top */}
            <div className="absolute -top-4 right-0 w-1/2 h-2 bg-primary" />
            
            {/* Featured image with red background container */}
            <div className="bg-primary p-4 md:p-6 rounded-lg overflow-hidden">
              <img 
                src={brandingShowcase}
                alt="RISE Advertising - Complete Branding Solutions"
                className="w-full h-auto rounded shadow-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="rounded-none px-8">
            <Link to="/services" className="inline-flex items-center gap-2">
              👉 View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
