"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, Search, Trash2, RefreshCw } from "lucide-react";
import { formatINR, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  projectType?: string | null;
  message?: string | null;
  estimatedCost?: number | null;
  status: string;
  source?: string | null;
  createdAt: string;
}

const STATUSES = ["NEW", "CONTACTED", "QUOTE_SENT", "CONVERTED", "LOST"];

const statusVariant: Record<string, "default" | "secondary" | "gold" | "success" | "warning" | "destructive"> =
  {
    NEW: "warning",
    CONTACTED: "secondary",
    QUOTE_SENT: "gold",
    CONVERTED: "success",
    LOST: "destructive",
  };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  const load = () => {
    setLoading(true);
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesQuery =
        !query ||
        [l.name, l.phone, l.email, l.projectType]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter = filter === "ALL" || l.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [leads, query, filter]);

  const updateStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) toast.success("Status updated");
    else toast.error("Update failed");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    toast.success("Lead deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Leads</h1>
          <p className="text-sm text-muted-foreground">
            {leads.length} total enquiries
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} /> Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["ALL", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === s
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Est. Cost</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    Loading leads...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No leads found.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <p className="font-medium">{lead.name}</p>
                      <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-gold">
                          <Phone className="h-3 w-3" /> {lead.phone}
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-gold">
                            <Mail className="h-3 w-3" /> {lead.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p>{lead.projectType || "—"}</p>
                      {lead.source && (
                        <p className="text-xs text-muted-foreground">via {lead.source}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium tabular-nums">
                      {lead.estimatedCost ? formatINR(lead.estimatedCost) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        <Badge variant={statusVariant[lead.status] || "secondary"}>
                          {lead.status.replace("_", " ")}
                        </Badge>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => remove(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
