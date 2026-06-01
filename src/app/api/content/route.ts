import { NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/store";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  const value = await getContent(key, null);
  return NextResponse.json({ key, value });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  await setContent(body.key, body.value);
  return NextResponse.json({ ok: true });
}
