import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  Loader2,
  GripVertical,
  Eye,
  EyeOff,
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ServiceCategory {
  id: string;
  letter: string;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number | null;
  published: boolean | null;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    letter: "",
    title: "",
    description: "",
    image_url: "",
    published: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (retryCount = 0) => {
    try {
      setLoading(true);
      console.log(`Fetching categories (Attempt ${retryCount + 1})...`);

      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        // If it's an abort error and we haven't retried too much, retry
        if (error.code === '20' || error.message.includes('AbortError')) { // Postgres cancel or Fetch abort
          if (retryCount < 3) {
            console.log("Fetch aborted, retrying...");
            setTimeout(() => fetchCategories(retryCount + 1), 500);
            return;
          }
        }
        console.error("Supabase Error:", error);
        throw error;
      }

      console.log("Categories data:", data);
      setCategories(data || []);
    } catch (error: any) {
      // Ignore AbortError if it persists, it's usually client-side noise
      if (error.name === 'AbortError' || error.message.includes('AbortError')) {
        console.warn("Fetch aborted (ignoring)");
        if (retryCount < 3) {
          setTimeout(() => fetchCategories(retryCount + 1), 500);
        }
        return;
      }

      console.error("Error fetching categories (Catch):", error);
      toast.error("Failed to load categories: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (category: ServiceCategory) => {
    setEditingCategory(category);
    setFormData({
      letter: category.letter,
      title: category.title,
      description: category.description || "",
      image_url: category.image_url || "",
      published: category.published ?? true,
    });
    setImagePreview(category.image_url);
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingCategory(null);
    const nextLetter = String.fromCharCode(65 + categories.length); // A=65, B=66, etc.
    setFormData({
      letter: nextLetter,
      title: "",
      description: "",
      image_url: "",
      published: true,
    });
    setImagePreview(null);
    setDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `category-${formData.letter}-${Date.now()}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      setImagePreview(publicUrl);
      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      letter: formData.letter.toUpperCase(),
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      published: formData.published,
    };

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from("service_categories")
          .update(dataToSave)
          .eq("id", editingCategory.id);
        if (error) throw error;
        toast.success("Category updated successfully");
      } else {
        const { error } = await supabase
          .from("service_categories")
          .insert([{ ...dataToSave, sort_order: categories.length + 1 }]);
        if (error) throw error;
        toast.success("Category created successfully");
      }
      setDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error("Operation failed: " + error.message);
    }
  };

  const handleDelete = async (id: string, letter: string) => {
    if (!confirm(`Delete category ${letter}? Products in this category will become uncategorized.`)) return;

    try {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Category deleted");
      fetchCategories();
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  const togglePublished = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from("service_categories")
        .update({ published: !currentState })
        .eq("id", id);
      if (error) throw error;
      fetchCategories();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="bg-card rounded-2xl shadow-premium p-8 border-none">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">
                Service Categories
              </h1>
              <p className="text-muted-foreground">
                Manage your A-Z service categories with custom images and descriptions.
              </p>
            </div>

            <Button
              onClick={openNewDialog}
              size="lg"
              className="rounded-none h-12 px-8 font-black uppercase tracking-widest shadow-premium bg-primary hover:bg-primary/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-bold tracking-tight">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24 bg-muted/20 rounded-2xl border-2 border-dashed border-muted-foreground/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">No Categories</h2>
            <p className="text-muted-foreground mb-8">
              Get started by creating your first service category.
            </p>
            <Button onClick={openNewDialog}>Create First Category</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group h-full flex flex-col overflow-hidden border-none shadow-premium hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                          <span className="text-6xl font-black text-primary/30">
                            {category.letter}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-primary text-white text-sm font-black px-3 py-1 rounded shadow-lg">
                          {category.letter}
                        </span>
                        <div
                          className={cn(
                            "px-2 py-1 rounded text-[9px] font-black shadow-lg inline-flex items-center gap-1 uppercase",
                            category.published
                              ? "bg-white text-primary"
                              : "bg-zinc-800 text-zinc-400"
                          )}
                        >
                          {category.published ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3" />
                          )}
                          {category.published ? "Live" : "Hidden"}
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-4 flex-1">
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {category.description || "No description set"}
                      </p>
                    </CardContent>

                    <CardFooter className="p-4 bg-muted/10 border-t flex items-center justify-between">
                      <button
                        onClick={() => togglePublished(category.id, category.published ?? true)}
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                      >
                        {category.published ? "Hide" : "Publish"}
                      </button>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/5"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/5"
                          onClick={() => handleDelete(category.id, category.letter)}
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

        {/* Category Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl overflow-hidden glassmorphism border-none p-0 flex flex-col h-[90vh]">
            <DialogHeader className="p-8 bg-primary text-primary-foreground border-none shrink-0">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  {editingCategory ? (
                    <Edit className="h-6 w-6" />
                  ) : (
                    <Plus className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
                    {editingCategory ? "Edit Category" : "New Category"}
                  </DialogTitle>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest leading-none mt-1">
                    {editingCategory
                      ? `Category ${editingCategory.letter}`
                      : `Category ${formData.letter}`}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">
                    Category Letter *
                  </Label>
                  <Input
                    value={formData.letter}
                    onChange={(e) =>
                      setFormData({ ...formData, letter: e.target.value.toUpperCase() })
                    }
                    maxLength={2}
                    required
                    className="h-12 border-2 border-muted-foreground/10 focus-visible:ring-primary rounded-none font-bold text-2xl text-center"
                    placeholder="A"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">
                    Category Title *
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-12 border-2 border-muted-foreground/10 focus-visible:ring-primary rounded-none font-bold"
                    placeholder="Signage & Neon & LED Signs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">
                  Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px] border-2 border-muted-foreground/10 rounded-none p-4"
                  placeholder="High-impact signage that attracts attention day and night."
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label className="font-black uppercase text-[9px] tracking-[0.2em] text-muted-foreground/60">
                  Category Image
                </Label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className={cn(
                      "aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden",
                      imagePreview
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/20 hover:border-primary/50"
                    )}
                    onClick={() => document.getElementById("category-image")?.click()}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground/40 mb-2" />
                        <span className="text-xs text-muted-foreground">Click to upload</span>
                      </>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <input
                      id="category-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("category-image")?.click()}
                      disabled={uploading}
                      className="rounded-none"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? "Uploading..." : "Choose Image"}
                    </Button>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({ ...prev, image_url: "" }));
                        }}
                      >
                        Remove Image
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label className="font-bold text-sm">Published</Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="rounded-none"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-none font-bold">
                    {editingCategory ? "Save Changes" : "Create Category"}
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
