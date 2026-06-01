import { NextResponse } from "next/server";
import { getPricing, setPricing } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { defaultPricing, type PricingConfig } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pricing = await getPricing();
  return NextResponse.json({ pricing });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Partial<PricingConfig>;
    // Merge over defaults to guarantee a complete, valid config.
    const merged: PricingConfig = { ...defaultPricing, ...body };
    const saved = await setPricing(merged);
    return NextResponse.json({ pricing: saved, ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
