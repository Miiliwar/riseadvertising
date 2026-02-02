import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Info, Phone, Mail, Check, AlertCircle, Search, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/sections/CTASection";
import { supabase } from "@/integrations/supabase/client";
import { CategoryCard } from "@/components/services/CategoryCard";
import { ProductCard } from "@/components/services/ProductCard";

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

interface ServiceCategory {
  id: string;
  letter: string;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number | null;
  published: boolean | null;
}

export default function ServicesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Get selected category from URL state
  const selectedCategory = (location.state as any)?.category || null;

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories and services in parallel
      console.log("Fetching services and categories from Supabase...");
      const [categoriesRes, servicesRes] = await Promise.all([
        supabase
          .from("service_categories")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("services")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true })
      ]);

      if (categoriesRes.error) {
        console.error("Categories fetch error:", categoriesRes.error);
        throw categoriesRes.error;
      }
      if (servicesRes.error) {
        console.error("Services fetch error:", servicesRes.error);
        throw servicesRes.error;
      }

      console.log("Successfully fetched data:", {
        categoriesCount: categoriesRes.data?.length,
        servicesCount: servicesRes.data?.length
      });

      setCategories(categoriesRes.data || []);
      setServices(servicesRes.data || []);
    } catch (err: any) {
      console.error("Detailed fetch error:", err);
      setError(err.message || "Failed to load services. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Get category image - use custom image or first product image
  const getCategoryImage = (category: ServiceCategory) => {
    if (category.image_url) {
      return category.image_url;
    }
    // Fallback to first product in category
    const categoryTag = `${category.letter}. ${category.title}`;
    const categoryProducts = services.filter(s => s.tags?.includes(categoryTag));
    if (categoryProducts.length > 0 && categoryProducts[0].image_url) {
      return categoryProducts[0].image_url;
    }
    return "/placeholder.svg";
  };

  // Get category tag for filtering
  const getCategoryTag = (category: ServiceCategory) => {
    return `${category.letter}. ${category.title}`;
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? services.filter(s => s.tags?.includes(selectedCategory))
    : [];

  // Search across all products
  const searchResults = searchQuery.trim()
    ? services.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  // Filter categories by search query (when not searching products)
  const filteredCategories = !isSearching
    ? categories.filter(cat =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : categories;

  const handleCategoryClick = (category: ServiceCategory) => {
    const categoryTag = getCategoryTag(category);
    navigate("/services", { state: { category: categoryTag } });
  };

  const handleBackToCategories = () => {
    setSearchQuery("");
    setIsSearching(false);
    navigate("/services", { state: { category: null } });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsSearching(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const currentCategory = categories.find(cat => getCategoryTag(cat) === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28 relative overflow-hidden text-center text-white">
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl lg:text-6xl font-black uppercase tracking-tight mb-4">
              Signage, Printing & Branding Solutions
            </h1>
            <p className="text-lg lg:text-xl text-white/90 italic mb-8">
              Design, Print & Brand Your Business with Confidence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-none font-bold uppercase h-14 px-8">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none font-bold uppercase h-14 px-8 border-white/30 text-white hover:bg-white/10">
                <a href="https://wa.me/251936704476" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar - Always visible */}
      <section className="bg-background py-8 border-b border-border">
        <div className="page-container">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search all products and services..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 border-muted-foreground/20 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {isSearching && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-background min-h-[60vh]">
        <div className="page-container">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="font-bold uppercase tracking-widest text-xs">Loading Services...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-16 w-16 text-destructive mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                Unable to Load Services
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                {error}
              </p>
              <Button
                onClick={() => fetchData()}
                className="rounded-none font-bold uppercase h-12 px-8"
              >
                Try Again
              </Button>
            </div>
          ) : isSearching ? (
            /* Search Results View */
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight">
                  Search Results
                </h2>
                <Button variant="outline" onClick={clearSearch} className="rounded-none">
                  <X className="h-4 w-4 mr-2" />
                  Clear Search
                </Button>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted-foreground/10">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                  <h3 className="text-xl font-bold uppercase tracking-tight text-muted-foreground mb-2">
                    No Results Found
                  </h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">
                    Try a different search term or browse our categories below.
                  </p>
                  <Button variant="outline" onClick={clearSearch} className="mt-8 rounded-none border-2 h-12 px-8 font-bold uppercase">
                    Browse Categories
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {searchResults.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : selectedCategory ? (
            /* Category Detail View - Show Products */
            <div>
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold uppercase text-xs tracking-widest"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Categories
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <span className="text-primary font-black text-sm uppercase tracking-widest mb-2 block">
                  Category {currentCategory?.letter}
                </span>
                <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                  {currentCategory?.title || selectedCategory}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {currentCategory?.description}
                </p>
              </motion.div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted-foreground/10">
                  <Info className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                  <h3 className="text-xl font-bold uppercase tracking-tight text-muted-foreground mb-2">
                    No Products Yet
                  </h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">
                    We're updating our collection for this category. Please check back soon or contact us for more information.
                  </p>
                  <Button variant="outline" onClick={handleBackToCategories} className="mt-8 rounded-none border-2 h-12 px-8 font-bold uppercase">
                    Browse Other Categories
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : (
            /* Categories Grid View */
            <div>
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                  Featured Products / Services
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Browse our comprehensive range of branding and printing solutions
                </p>
              </div>

              {filteredCategories.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No categories match your search.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredCategories.map((category, index) => (
                      <CategoryCard
                        key={category.id}
                        category={{
                          id: category.letter,
                          title: `${category.letter}. ${category.title}`,
                          description: category.description || "",
                          image: getCategoryImage(category)
                        }}
                        onClick={() => handleCategoryClick(category)}
                        index={index}
                      />
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
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-12 uppercase tracking-widest text-xs font-bold">
            The requested product does not exist.
          </p>
          <Button asChild size="lg" className="rounded-none font-black uppercase h-14 px-10">
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Detail */}
      <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white max-w-4xl"
          >
            <Link
              to="/services"
              state={{ category: service.tags?.[0] || null }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-6 font-bold uppercase text-xs tracking-widest"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {service.tags?.[0]?.split('.')[1]?.trim() || "Services"}
            </Link>
            <h1 className="text-3xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-white/80 font-medium max-w-2xl">
              {service.short_description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              {service.price_range && (
                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                  <span className="text-xs font-bold uppercase text-white/50 block">Starting From</span>
                  <div className="text-xl font-black">{service.price_range}</div>
                </div>
              )}
              <div className="px-6 py-3 bg-primary rounded-lg">
                <span className="text-xs font-bold uppercase text-white/50 block">Lead Time</span>
                <div className="text-xl font-black">2-5 Days</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="page-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-muted border-4 border-card shadow-xl">
                  <img
                    src={service.image_url || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                    <span className="w-10 h-[3px] bg-primary" />
                    Product Details
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {service.long_description || service.short_description}
                  </p>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="bg-muted/30 p-8 rounded-2xl border border-primary/10">
                    <h3 className="text-lg font-black uppercase tracking-wider mb-6 text-primary">
                      Features & Specifications
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 bg-card p-3 rounded-lg shadow-sm">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-semibold text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-foreground text-background p-8 rounded-2xl shadow-xl sticky top-28"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                    Get a Quote
                  </h3>
                  <p className="text-white/60 text-sm">
                    Contact us for custom pricing and specifications.
                  </p>
                </div>

                <div className="space-y-4 mb-12">
                  <Button className="w-full h-16 rounded-none bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl" asChild>
                    <Link to="/request-quote">Request Official Estimate</Link>
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-lg border-white/20 hover:bg-white/5 text-white font-bold uppercase text-sm" asChild>
                    <a href="tel:+251936704476">
                      <Phone className="h-4 w-4 mr-2" />
                      Call: 251-936-704-476
                    </a>
                  </Button>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary transition-colors">
                      <Mail className="h-4 w-4 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-white/40 block">Email Us</span>
                      <a href="mailto:riseadvertising11@gmail.com" className="text-sm font-bold hover:text-primary transition-colors">
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
