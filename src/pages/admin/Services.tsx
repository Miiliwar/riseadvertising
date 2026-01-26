import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
  Filter
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price_range: string | null;
  icon_name: string | null;
  image_url: string | null;
  published: boolean | null;
  sort_order: number | null;
  tags: string[] | null;
}

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

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDialog, setActiveDialog] = useState<"service" | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    long_description: "",
    price_range: "",
    icon_name: "",
    image_url: "",
    published: true,
    tags: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error("Error fetching services:", error);
      toast.error("Database connection failure");
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      short_description: service.short_description || "",
      long_description: service.long_description || "",
      price_range: service.price_range || "",
      icon_name: service.icon_name || "",
      image_url: service.image_url || "",
      published: service.published ?? true,
      tags: service.tags?.join(", ") || "",
    });
    setImagePreview(service.image_url);
    setActiveDialog("service");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setImagePreview(publicUrl);
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Upload complete');
    } catch (error: any) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags ? formData.tags.split(",").map(t => t.trim()) : [];

    const dataToSave = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      short_description: formData.short_description,
      long_description: formData.long_description,
      price_range: formData.price_range,
      icon_name: formData.icon_name,
      image_url: formData.image_url,
      published: formData.published,
      tags: tagsArray,
    };

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(dataToSave)
          .eq("id", editingService.id);
        if (error) throw error;
        toast.success("Synchronized successfully");
      } else {
        const { error } = await supabase
          .from("services")
          .insert([dataToSave]);
        if (error) throw error;
        toast.success("Service registered");
      }
      setActiveDialog(null);
      fetchServices();
    } catch (error: any) {
      toast.error("Operation failed");
    }
  };

  const filteredServices = activeFilter === "All"
    ? services
    : services.filter(s => s.tags?.includes(activeFilter));

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="bg-card rounded-2xl shadow-premium p-8 border-none overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">Service Catalog</h1>
              <p className="text-muted-foreground">Select a category to manage or add new services.</p>
            </div>

            <Button onClick={() => {
              setEditingService(null);
              setFormData({
                title: "",
                slug: "",
                short_description: "",
                long_description: "",
                price_range: "",
                icon_name: "",
                image_url: "",
                published: true,
                tags: activeFilter !== "All" ? activeFilter : "",
              });
              setImagePreview(null);
              setActiveDialog("service");
            }} size="lg" className="rounded-none h-12 px-8 font-black uppercase tracking-widest shadow-premium bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5 mr-2" />
              {activeFilter !== "All" ? `Add New to ${activeFilter.split('.')[0]}` : "Add New Service"}
            </Button>
          </div>

          <div className="flex flex-nowrap overflow-x-auto pb-4 gap-2 no-scrollbar border-t pt-8">
            <button
              onClick={() => setActiveFilter("All")}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all border-2",
                activeFilter === "All"
                  ? "bg-primary border-primary text-primary-foreground shadow-lg"
                  : "bg-background border-muted-foreground/10 text-muted-foreground hover:border-primary/50"
              )}
            >
              All Services
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.title)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all border-2",
                  activeFilter === cat.title
                    ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background border-muted-foreground/10 text-muted-foreground hover:border-primary/50"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-bold tracking-tight">Syncing catalog...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-24 bg-muted/20 rounded-2xl border-2 border-dashed border-muted-foreground/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">Empty Category</h2>
            <p className="text-muted-foreground mb-8">No services listed under category {activeFilter}.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group h-full flex flex-col overflow-hidden border-none shadow-premium hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {service.image_url ? (
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/10" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="absolute top-3 left-3 flex flex-col gap-2 max-w-[80%]">
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter truncate">
                          {service.tags?.[0] || 'Unsorted'}
                        </span>
                        <div className={cn(
                          "px-2 py-1 rounded text-[9px] font-black shadow-lg inline-flex items-center gap-1 uppercase w-fit",
                          service.published ? "bg-white text-primary" : "bg-zinc-800 text-zinc-400"
                        )}>
                          {service.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {service.published ? "Live" : "Ghost"}
                        </div>
                      </div>
                    </div>

                    <CardHeader className="p-6 pb-2">
                      <h3 className="text-lg font-black uppercase tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 flex-1">
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 h-8">
                        {service.short_description || "Detailed catalog entry pending..."}
                      </p>
                    </CardContent>

                    <CardFooter className="p-4 bg-muted/10 border-t flex items-center justify-between">
                      <button
                        onClick={async () => {
                          await supabase.from("services").update({ published: !service.published }).eq("id", service.id);
                          fetchServices();
                        }}
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                      >
                        {service.published ? "Draft Mode" : "Publish Live"}
                      </button>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/5"
                          onClick={() => openEditDialog(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/5"
                          onClick={async () => {
                            if (confirm("Delete this catalog entry?")) {
                              await supabase.from("services").delete().eq("id", service.id);
                              fetchServices();
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Dialog open={activeDialog === "service"} onOpenChange={(open) => !open && setActiveDialog(null)}>
          <DialogContent className="max-w-3xl overflow-hidden glassmorphism border-none p-0 flex flex-col h-[90vh]">
            <DialogHeader className="p-8 bg-primary text-primary-foreground border-none">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  {editingService ? <Edit className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                </div>
                <div>
                  <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
                    {editingService ? "Edit Registration" : "New Service Registry"}
                  </DialogTitle>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest leading-none mt-1">
                    {editingService ? editingService.title : activeFilter}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Official Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-12 border-2 border-muted-foreground/10 focus-visible:ring-primary rounded-none font-bold"
                    placeholder="e.g., UV-Resistant Vinyl Print"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">System Slug (Search Engine Opt.)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="h-12 border-2 border-muted-foreground/10 rounded-none font-bold italic"
                    placeholder="vinyl-printing-uv"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Catalog Description (Short Context)</Label>
                <Textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="min-h-[70px] border-2 border-muted-foreground/10 rounded-none italic p-4"
                  placeholder="Appears on the primary service grid..."
                />
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Deep Dive Content (Long Narrative)</Label>
                <Textarea
                  value={formData.long_description}
                  onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                  className="min-h-[140px] border-2 border-muted-foreground/10 rounded-none p-4"
                  placeholder="Comprehensive technical details and service benefits..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Price Estimation</Label>
                  <Input
                    value={formData.price_range}
                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                    className="h-12 border-2 border-muted-foreground/10 rounded-none font-bold"
                    placeholder="From ETB 10,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Classification Tags (CSV)</Label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="h-12 border-2 border-muted-foreground/10 rounded-none font-bold"
                    placeholder="A, B, signage, large-format"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Primary Display Category *</Label>
                <Select
                  value={formData.tags.split(',')[0].trim()}
                  onValueChange={(val) => {
                    const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
                    if (currentTags.length > 0) {
                      currentTags[0] = val;
                    } else {
                      currentTags.push(val);
                    }
                    setFormData({ ...formData, tags: currentTags.join(', ') });
                  }}
                >
                  <SelectTrigger className="h-12 border-2 border-muted-foreground/10 rounded-none font-bold focus:ring-primary">
                    <SelectValue placeholder="Assign Category" />
                  </SelectTrigger>
                  <SelectContent className="glassmorphism border-none">
                    {SERVICE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.title} className="font-bold hover:bg-primary/10">
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6 border-t flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-48 space-y-4">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">Listing Status</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 border rounded-none">
                    <Switch
                      checked={formData.published}
                      onCheckedChange={(val) => setFormData({ ...formData, published: val })}
                    />
                    <span className="text-[10px] font-black uppercase">{formData.published ? "Online" : "Ghost"}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">High-Resolution Visual</Label>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 aspect-video shrink-0 bg-muted border-2 border-muted-foreground/5 relative flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <Label htmlFor="file-asset" className="cursor-pointer">
                        <div className="flex items-center justify-center gap-2 h-11 bg-zinc-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest transition-all">
                          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          {uploading ? "Uploading..." : "Import Local Asset"}
                        </div>
                      </Label>
                      <input id="file-asset" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />

                      <div className="relative">
                        <Input
                          value={formData.image_url}
                          onChange={(e) => { setFormData({ ...formData, image_url: e.target.value }); setImagePreview(e.target.value) }}
                          className="h-10 border-muted rounded-none text-[10px] font-bold"
                          placeholder="Paste External Image URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="p-8 bg-muted/40 border-t flex flex-row gap-3">
              <Button type="button" variant="outline" onClick={() => setActiveDialog(null)} className="flex-1 rounded-none border-2 font-black uppercase text-xs tracking-widest h-14">
                Discard Changes
              </Button>
              <Button onClick={handleSubmit} className="flex-1 rounded-none h-14 font-black uppercase text-xs tracking-[0.1em] shadow-premium">
                {editingService ? "Update Cloud Registry" : "Securely Register Service"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
