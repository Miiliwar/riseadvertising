import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactSettings {
  phone: string;
  email: string;
  address: string;
}

interface SocialSettings {
  facebook: string;
  instagram: string;
  tiktok: string;
  telegram: string;
}

interface SeoSettings {
  title: string;
  description: string;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contact, setContact] = useState<ContactSettings>({
    phone: "",
    email: "",
    address: "",
  });
  
  const [social, setSocial] = useState<SocialSettings>({
    facebook: "",
    instagram: "",
    tiktok: "",
    telegram: "",
  });
  
  const [seo, setSeo] = useState<SeoSettings>({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      data?.forEach((setting) => {
        const value = setting.value as Record<string, string>;
        switch (setting.key) {
          case "contact":
            setContact({
              phone: value?.phone || "",
              email: value?.email || "",
              address: value?.address || "",
            });
            break;
          case "social":
            setSocial({
              facebook: value?.facebook || "",
              instagram: value?.instagram || "",
              tiktok: value?.tiktok || "",
              telegram: value?.telegram || "",
            });
            break;
          case "seo":
            setSeo({
              title: value?.title || "",
              description: value?.description || "",
            });
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);

    try {
      const updates = [
        { key: "contact", value: JSON.parse(JSON.stringify(contact)) },
        { key: "social", value: JSON.parse(JSON.stringify(social)) },
        { key: "seo", value: JSON.parse(JSON.stringify(seo)) },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: update.value })
          .eq("key", update.key);

        if (error) throw error;
      }

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your website settings</p>
          </div>
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Tabs defaultValue="contact" className="space-y-6">
            <TabsList>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    placeholder="+251936704476"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="info@riseadvertising.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={contact.address}
                    onChange={(e) =>
                      setContact({ ...contact, address: e.target.value })
                    }
                    placeholder="ZAM Mall 2nd Floor, Lebu, Addis Ababa"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={social.facebook}
                    onChange={(e) =>
                      setSocial({ ...social, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={social.instagram}
                    onChange={(e) =>
                      setSocial({ ...social, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    id="tiktok"
                    value={social.tiktok}
                    onChange={(e) =>
                      setSocial({ ...social, tiktok: e.target.value })
                    }
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={social.telegram}
                    onChange={(e) =>
                      setSocial({ ...social, telegram: e.target.value })
                    }
                    placeholder="https://t.me/..."
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_title">Default Page Title</Label>
                  <Input
                    id="seo_title"
                    value={seo.title}
                    onChange={(e) =>
                      setSeo({ ...seo, title: e.target.value })
                    }
                    placeholder="RISE Advertising - Premium Print Solutions"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: Under 60 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_description">Default Meta Description</Label>
                  <Textarea
                    id="seo_description"
                    value={seo.description}
                    onChange={(e) =>
                      setSeo({ ...seo, description: e.target.value })
                    }
                    placeholder="Premium print and advertising solutions..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: Under 160 characters
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}
