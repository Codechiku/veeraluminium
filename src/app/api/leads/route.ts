import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { leadSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: capture a new lead from forms / estimate calculator.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 422 },
      );
    }
    const lead = await createLead({
      ...parsed.data,
      email: parsed.data.email || null,
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Admin: list all leads.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await listLeads();
  return NextResponse.json({ leads });
}
