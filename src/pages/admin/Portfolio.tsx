import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star, StarOff } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  project_date: string | null;
  description: string | null;
  images: unknown[];
  tags: string[] | null;
  featured: boolean | null;
  published: boolean | null;
}

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
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
    const imageArray = item.images?.map(img => String(img)) || [];
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
    setDialogOpen(true);
  }

  function openNewDialog() {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      client: "",
      project_date: "",
      description: "",
      images: [],
      tags: "",
      featured: false,
      published: true,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title: formData.title,
      slug: formData.slug,
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
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to save portfolio item");
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

  const getFirstImage = (images: unknown[]): string | null => {
    if (!images || images.length === 0) return null;
    return String(images[0]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Showcase your best work</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit Portfolio Item" : "Add New Item"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client Name</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_date">Project Date</Label>
                    <Input
                      id="project_date"
                      type="date"
                      value={formData.project_date}
                      onChange={(e) =>
                        setFormData({ ...formData, project_date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="signage, branding, 3D"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, published: checked })
                      }
                    />
                    <Label>Published</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No portfolio items found. Add your first project!
            </div>
          ) : (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="aspect-video bg-muted relative">
                  {getFirstImage(item.images) ? (
                    <img
                      src={getFirstImage(item.images)!}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" /> Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.client || "No client specified"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.published
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(item)}
                      >
                        {item.featured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
