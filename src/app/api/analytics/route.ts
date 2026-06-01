import { NextResponse } from "next/server";
import { listLeads } from "@/lib/store";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  const now = new Date();
  const monthKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  const thisMonth = monthKey(now);
  const totalLeads = leads.length;
  const monthlyLeads = leads.filter(
    (l) => monthKey(new Date(l.createdAt)) === thisMonth,
  ).length;
  const converted = leads.filter((l) => l.status === "CONVERTED").length;
  const conversionRate = totalLeads ? Math.round((converted / totalLeads) * 100) : 0;

  // Revenue estimate: sum of estimatedCost for converted + 30% of quote-sent.
  const revenueEstimate = leads.reduce((sum, l) => {
    const c = l.estimatedCost || 0;
    if (l.status === "CONVERTED") return sum + c;
    if (l.status === "QUOTE_SENT") return sum + c * 0.3;
    return sum;
  }, 0);

  // Service popularity
  const popularity: Record<string, number> = {};
  for (const l of leads) {
    const key = l.projectType || "Other";
    popularity[key] = (popularity[key] || 0) + 1;
  }
  const servicePopularity = Object.entries(popularity)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  const mostRequested = servicePopularity[0]?.name || "—";

  // Monthly enquiries — last 6 months
  const monthly: { month: string; leads: number; converted: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    const label = d.toLocaleString("en-IN", { month: "short" });
    monthly.push({
      month: label,
      leads: leads.filter((l) => monthKey(new Date(l.createdAt)) === key).length,
      converted: leads.filter(
        (l) =>
          monthKey(new Date(l.createdAt)) === key && l.status === "CONVERTED",
      ).length,
    });
  }

  // Status funnel
  const statuses = ["NEW", "CONTACTED", "QUOTE_SENT", "CONVERTED", "LOST"] as const;
  const funnel = statuses.map((s) => ({
    status: s,
    count: leads.filter((l) => l.status === s).length,
  }));

  return NextResponse.json({
    totalLeads,
    monthlyLeads,
    conversionRate,
    revenueEstimate: Math.round(revenueEstimate),
    mostRequested,
    servicePopularity,
    monthly,
    funnel,
  });
}
