import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, Image } from "lucide-react";
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
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
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
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  function openEditDialog(service: Service) {
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
    });
    setImagePreview(service.image_url || null);
    setDialogOpen(true);
  }

  function openNewDialog() {
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
    });
    setImagePreview(null);
    setDialogOpen(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

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
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(formData)
          .eq("id", editingService.id);

        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase.from("services").insert([formData]);

        if (error) throw error;
        toast.success("Service created successfully");
      }

      setDialogOpen(false);
      fetchServices();
    } catch (error: any) {
      toast.error(error.message || "Failed to save service");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
    }
  }

  async function togglePublished(service: Service) {
    try {
      const { error } = await supabase
        .from("services")
        .update({ published: !service.published })
        .eq("id", service.id);

      if (error) throw error;
      fetchServices();
    } catch (error) {
      toast.error("Failed to update service");
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Edit Service" : "Add New Service"}
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

                <div className="space-y-2">
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData({ ...formData, short_description: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long_description">Long Description</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) =>
                      setFormData({ ...formData, long_description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_range">Price Range</Label>
                    <Input
                      id="price_range"
                      value={formData.price_range}
                      onChange={(e) =>
                        setFormData({ ...formData, price_range: e.target.value })
                      }
                      placeholder="From ETB 2,500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon_name">Icon Name</Label>
                    <Input
                      id="icon_name"
                      value={formData.icon_name}
                      onChange={(e) =>
                        setFormData({ ...formData, icon_name: e.target.value })
                      }
                      placeholder="Flag, Image, etc."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Service Image</Label>
                  <div className="flex flex-col gap-4">
                    {imagePreview ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image_url: "" }));
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        <Image className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a service image (Max 5MB)
                        </p>
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? "Uploading..." : "Select File"}
                        </Label>
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="image_url">Or Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => {
                          setFormData({ ...formData, image_url: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
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

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingService ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Title</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Price</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No services found. Create your first service!
                  </td>
                </tr>
              ) : (
                services.map((service, index) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {service.short_description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm">{service.price_range || "-"}</span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePublished(service)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${service.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {service.published ? (
                          <>
                            <Eye className="h-3 w-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
