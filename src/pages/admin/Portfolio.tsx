import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Star, StarOff, Upload, Image as ImageIcon, X, Loader2, Filter } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  project_date: string | null;
  description: string | null;
  images: string[];
  tags: string[] | null;
  featured: boolean | null;
  published: boolean | null;
}

const CATEGORIES = ["Banners", "Signage", "Promotional", "Branding", "Events"];

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client: "",
    project_date: "",
    description: "",
    images: [] as string[],
    tags: "",
    featured: false,
    published: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const transformedData = (data || []).map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : []
      }));

      setItems(transformedData as PortfolioItem[]);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      toast.error("Failed to load portfolio items");
    } finally {
      setLoading(false);
    }
  }

  function openEditDialog(item: PortfolioItem) {
    setEditingItem(item);
    const imageArray = item.images || [];
    setFormData({
      title: item.title,
      slug: item.slug,
      client: item.client || "",
      project_date: item.project_date || "",
      description: item.description || "",
      images: imageArray,
      tags: item.tags?.join(", ") || "",
      featured: item.featured ?? false,
      published: item.published ?? true,
    });
    setImagePreviews(imageArray);
    setDialogOpen(true);
  }

  function openNewDialog() {
    if (activeFilter === "All") {
      toast.error("Please select a category filter first");
      return;
    }

    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      client: "",
      project_date: "",
      description: "",
      images: [],
      tags: activeFilter, // Auto-tag with current filter
      featured: false,
      published: true,
    });
    setImagePreviews([]);
    setDialogOpen(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newPreviews: string[] = [...imagePreviews];
    const newImages: string[] = [...formData.images];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (>5MB)`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        newPreviews.push(publicUrl);
        newImages.push(publicUrl);
      }

      setImagePreviews(newPreviews);
      setFormData(prev => ({ ...prev, images: newImages }));
      toast.success("Images added successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload some images");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newImages = [...formData.images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setImagePreviews(newPreviews);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      client: formData.client || null,
      project_date: formData.project_date || null,
      description: formData.description || null,
      images: formData.images,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      featured: formData.featured,
      published: formData.published,
    };

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("portfolio")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast.success("Portfolio item updated");
      } else {
        const { error } = await supabase.from("portfolio").insert([payload]);
        if (error) throw error;
        toast.success("Portfolio item created");
      }

      setDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      toast.error(error.message || "Failed to save portfolio item");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase.from("portfolio").delete().eq("id", id);
      if (error) throw error;
      toast.success("Portfolio item deleted");
      fetchItems();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  }

  async function toggleFeatured(item: PortfolioItem) {
    try {
      const { error } = await supabase
        .from("portfolio")
        .update({ featured: !item.featured })
        .eq("id", item.id);

      if (error) throw error;
      fetchItems();
    } catch (error) {
      toast.error("Failed to update item");
    }
  }

  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(item => item.tags?.includes(activeFilter));

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section with Filter Bar */}
        <div className="bg-card rounded-2xl border-none shadow-premium p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">Portfolio Library</h1>
              <p className="text-muted-foreground">Select a category to manage or add new works.</p>
            </div>

            <AnimatePresence>
              {activeFilter !== "All" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Button onClick={openNewDialog} size="lg" className="rounded-none h-12 px-8 font-black uppercase tracking-widest shadow-premium">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New to {activeFilter}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
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
              All Categories
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all border-2",
                  activeFilter === category
                    ? "bg-primary border-primary text-primary-foreground shadow-lg"
                    : "bg-background border-muted-foreground/10 text-muted-foreground hover:border-primary/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-medium animate-pulse">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h2 className="text-xl font-bold">No works found in {activeFilter}</h2>
            <p className="text-muted-foreground mb-8">Select a different category or add a new project button above.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border-none"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                        <ImageIcon className="h-12 w-12" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {item.tags?.map(tag => (
                        <span key={tag} className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white p-1 rounded-full shadow-lg">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-black uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Client: {item.client || "Self Project"}</p>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <span className={cn(
                        "text-[10px] font-black px-2 py-1 rounded uppercase",
                        item.published ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                      )}>
                        {item.published ? "Live" : "Draft"}
                      </span>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-amber-500 hover:bg-amber-50"
                          onClick={() => toggleFeatured(item)}
                        >
                          {item.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/5"
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/5"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Unified Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl overflow-hidden glassmorphism border-none p-0 flex flex-col h-[90vh]">
            <DialogHeader className="p-8 bg-primary text-primary-foreground border-none shrink-0">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  {editingItem ? <Edit className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                </div>
                <div>
                  <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
                    {editingItem ? "Update Work" : `Add to ${activeFilter}`}
                  </DialogTitle>
                  <p className="text-white/70 text-sm">Fill in the project details for your portfolio gallery.</p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Project Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-12 border-2 rounded-none font-medium"
                    placeholder="e.g., VIP Signage Lebu Mall"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">URL Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="h-12 border-2 rounded-none font-medium"
                    placeholder="lebu-mall-signage"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Client Name</Label>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="h-12 border-2 rounded-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Project Date</Label>
                  <Input
                    type="date"
                    value={formData.project_date}
                    onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                    className="h-12 border-2 rounded-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] border-2 rounded-none"
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Gallery Images (Multiple Allowed)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <AnimatePresence>
                    {imagePreviews.map((preview, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-video rounded-lg overflow-hidden border-2 bg-muted/50 group"
                      >
                        <img src={preview} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-destructive/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer border-2 border-dashed border-primary/30 rounded-lg aspect-video flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-primary mb-1" />
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">Add Image</span>
                      </>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Category Selection *</Label>
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
                    <SelectTrigger className="h-12 border-2 rounded-none font-medium focus:ring-primary">
                      <SelectValue placeholder="Assign Category" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphism border-none">
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category} className="font-bold hover:bg-primary/10">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Other Tags (Comma Separated)</Label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="signage, banner, branding"
                    className="h-12 border-2 rounded-none font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label className="font-bold uppercase text-xs tracking-widest">Featured Work</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label className="font-bold uppercase text-xs tracking-widest text-primary">Published</Label>
                </div>
              </div>

              {/* Footer Buttons in the form to allow scrolling if needed */}
              <div className="flex flex-row gap-3 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1 rounded-none font-bold uppercase border-2 h-12"
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-none h-12 font-black uppercase tracking-tighter shadow-premium"
                >
                  {editingItem ? "Refine Project Details" : "Finalize and Add Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
