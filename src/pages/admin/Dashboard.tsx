import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Images, MessageSquare, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  services: number;
  portfolio: number;
  quotes: number;
  newQuotes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    portfolio: 0,
    quotes: 0,
    newQuotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [servicesRes, portfolioRes, quotesRes, newQuotesRes] = await Promise.all([
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("portfolio").select("id", { count: "exact", head: true }),
          supabase.from("quote_requests").select("id", { count: "exact", head: true }),
          supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
        ]);

        setStats({
          services: servicesRes.count || 0,
          portfolio: portfolioRes.count || 0,
          quotes: quotesRes.count || 0,
          newQuotes: newQuotesRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Services",
      value: stats.services,
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      label: "Portfolio Items",
      value: stats.portfolio,
      icon: Images,
      color: "bg-green-500",
    },
    {
      label: "Total Quotes",
      value: stats.quotes,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      label: "New Quotes",
      value: stats.newQuotes,
      icon: TrendingUp,
      color: "bg-primary",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="/admin/services"
              className="p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Manage Services</h3>
              <p className="text-sm text-muted-foreground">Add or edit services</p>
            </a>
            <a
              href="/admin/portfolio"
              className="p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Images className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Manage Portfolio</h3>
              <p className="text-sm text-muted-foreground">Add or edit portfolio items</p>
            </a>
            <a
              href="/admin/quotes"
              className="p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">View Quotes</h3>
              <p className="text-sm text-muted-foreground">
                {stats.newQuotes} new quote requests
              </p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
