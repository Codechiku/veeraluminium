"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  IndianRupee,
  Percent,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { formatINR } from "@/lib/utils";

interface Analytics {
  totalLeads: number;
  monthlyLeads: number;
  conversionRate: number;
  revenueEstimate: number;
  mostRequested: string;
  servicePopularity: { name: string; value: number }[];
  monthly: { month: string; leads: number; converted: number }[];
  funnel: { status: string; count: number }[];
}

const COLORS = ["#b8860b", "#1f2937", "#0ea5e9", "#10b981", "#ef4444", "#8b5cf6"];

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of leads, conversions and demand.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Leads"
          value={loading ? "—" : data!.totalLeads}
          icon={<Users className="h-5 w-5" />}
          hint="All-time enquiries"
        />
        <StatCard
          label="This Month"
          value={loading ? "—" : data!.monthlyLeads}
          icon={<TrendingUp className="h-5 w-5" />}
          hint="New leads this month"
        />
        <StatCard
          label="Conversion Rate"
          value={loading ? "—" : `${data!.conversionRate}%`}
          icon={<Percent className="h-5 w-5" />}
          hint="Leads converted"
        />
        <StatCard
          label="Revenue Estimate"
          value={loading ? "—" : formatINR(data!.revenueEstimate)}
          icon={<IndianRupee className="h-5 w-5" />}
          hint="Weighted pipeline"
          accent
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <h2 className="font-semibold">Monthly Enquiries</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Leads vs conversions over the last 6 months
          </p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.monthly ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#b8860b"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Leads"
                />
                <Line
                  type="monotone"
                  dataKey="converted"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Converted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Service Popularity</h2>
          <p className="mb-4 text-sm text-muted-foreground">Most requested</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={(data?.servicePopularity ?? []).slice(0, 6)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                >
                  {(data?.servicePopularity ?? []).slice(0, 6).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <h2 className="font-semibold">Lead Status Funnel</h2>
          <p className="mb-4 text-sm text-muted-foreground">Pipeline distribution</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.funnel ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="status" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                  cursor={{ fill: "hsl(var(--secondary))" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#b8860b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Most Requested Product</h2>
          <div className="mt-6 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <Star className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-xl font-bold">
              {loading ? "—" : data!.mostRequested}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Top demand this period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
