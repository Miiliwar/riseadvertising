import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Download, Search, Info } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuoteRequest {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  services: string[] | null;
  quantity: string | null;
  width: string | null;
  height: string | null;
  message: string | null;
  delivery_location: string | null;
  deadline: string | null;
  source: string | null;
  status: string | null;
  internal_notes: string | null;
  created_at: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "responded", label: "Responded", color: "bg-yellow-100 text-yellow-700" },
  { value: "quoted", label: "Quoted", color: "bg-purple-100 text-purple-700" },
  { value: "closed", label: "Closed", color: "bg-green-100 text-green-700" },
];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to load quote requests");
    } finally {
      setLoading(false);
    }
  }

  function openDetails(quote: QuoteRequest) {
    setSelectedQuote(quote);
    setInternalNotes(quote.internal_notes || "");
    setDetailsOpen(true);
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success("Status updated");
      fetchQuotes();
    } catch (error) {
      toast.error("Failed to update status");
    }
  }

  async function saveNotes() {
    if (!selectedQuote) return;

    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ internal_notes: internalNotes })
        .eq("id", selectedQuote.id);

      if (error) throw error;
      toast.success("Notes saved");
      fetchQuotes();
    } catch (error) {
      toast.error("Failed to save notes");
    }
  }

  function exportCSV() {
    const filtered = filteredQuotes;
    const headers = [
      "ID",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Services",
      "Quantity",
      "Dimensions",
      "Location",
      "Deadline",
      "Message",
      "Source",
      "Status",
      "Date",
    ];
    const rows = filtered.map((q) => [
      q.id,
      q.name,
      q.company || "",
      q.email,
      q.phone,
      q.services?.join("; ") || "",
      q.quantity || "",
      `${q.width || ""} x ${q.height || ""}`,
      q.delivery_location || "",
      q.deadline || "",
      q.message || "",
      q.source || "",
      q.status || "",
      new Date(q.created_at).toLocaleString(),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join(
      "\n"
    );

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quotes-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string | null) => {
    return (
      statusOptions.find((s) => s.value === status)?.color ||
      "bg-gray-100 text-gray-600"
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Quote Requests</h1>
            <p className="text-muted-foreground">Manage customer inquiries</p>
          </div>
          <Button onClick={exportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Services</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Date</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No quote requests found
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote, index) => (
                    <motion.tr
                      key={quote.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{quote.name}</p>
                          <p className="text-sm text-muted-foreground">{quote.email}</p>
                          <p className="text-sm text-muted-foreground">{quote.phone}</p>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {quote.services?.slice(0, 2).map((s, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 px-2 py-1 rounded"
                            >
                              {s}
                            </span>
                          ))}
                          {(quote.services?.length || 0) > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{quote.services!.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Select
                          value={quote.status || "new"}
                          onValueChange={(value) => updateStatus(quote.id, value)}
                        >
                          <SelectTrigger
                            className={`w-[120px] h-8 text-xs ${getStatusStyle(
                              quote.status
                            )}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-sm text-muted-foreground">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetails(quote)}
                          >
                            <Eye className="h-4 w-4" />
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

        {/* Details Dialog - Enhanced Layout */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Quote #{selectedQuote?.id.slice(0, 8)}
                <span className={`text-xs px-2 py-1 rounded-full font-normal ${getStatusStyle(selectedQuote?.status || 'new')}`}>
                  {selectedQuote?.status?.toUpperCase() || 'NEW'}
                </span>
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Submitted on {selectedQuote && new Date(selectedQuote.created_at).toLocaleString()}
              </p>
            </DialogHeader>
            {selectedQuote && (
              <div className="space-y-8 mt-4">
                {/* Section: Customer Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2 border-b pb-2">
                    <Info className="h-4 w-4" /> Customer Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-medium text-lg">{selectedQuote.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="font-medium">{selectedQuote.company || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedQuote.email}`} className="text-primary hover:underline font-medium break-all">
                        {selectedQuote.email}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${selectedQuote.phone}`} className="text-primary hover:underline font-medium">
                        {selectedQuote.phone}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="font-medium">{selectedQuote.source || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Project Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2 border-b pb-2">
                    <Briefcase className="h-4 w-4" /> Project Requirements
                  </h4>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Services Requested</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuote.services?.map((s, i) => (
                        <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-bold text-lg">{selectedQuote.quantity || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Width</p>
                      <p className="font-bold text-lg">{selectedQuote.width || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-bold text-lg">{selectedQuote.height || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="font-bold text-lg text-red-500">
                        {selectedQuote.deadline ? new Date(selectedQuote.deadline).toLocaleDateString() : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Delivery Location</p>
                    <p className="font-medium bg-gray-50 p-2 rounded border border-gray-100">
                      {selectedQuote.delivery_location || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Message / Instructions</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedQuote.message}
                    </div>
                  </div>
                </div>

                {/* Section: Internal Notes */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Internal Notes</h4>
                  <Textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Add private notes about this quote..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={saveNotes}>
                      Save Notes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
