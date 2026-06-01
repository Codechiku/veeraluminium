import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { getPrisma } from "./db";
import { defaultPricing, type PricingConfig } from "./pricing";

/**
 * Data access layer with graceful degradation:
 *   1. If a PostgreSQL DATABASE_URL is configured → use Prisma.
 *   2. Otherwise → persist to JSON files under `.data/` (great for local dev).
 *
 * This guarantees the whole site (including lead capture and the CMS) works
 * even before a database is provisioned.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

/* ── Pricing ──────────────────────────────────────────────── */

export async function getPricing(): Promise<PricingConfig> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const row = await prisma.setting.findUnique({ where: { key: "pricing" } });
      if (row?.value) return { ...defaultPricing, ...(row.value as object) } as PricingConfig;
    } catch {
      /* fall through */
    }
  }
  const stored = await readJson<Partial<PricingConfig>>("pricing.json", {});
  return { ...defaultPricing, ...stored };
}

export async function setPricing(cfg: PricingConfig): Promise<PricingConfig> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.setting.upsert({
        where: { key: "pricing" },
        create: { key: "pricing", value: cfg as object },
        update: { value: cfg as object },
      });
      return cfg;
    } catch {
      /* fall through */
    }
  }
  await writeJson("pricing.json", cfg);
  return cfg;
}

/* ── Editable content blocks ──────────────────────────────── */

export async function getContent<T = any>(key: string, fallback: T): Promise<T> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const row = await prisma.setting.findUnique({ where: { key: `content:${key}` } });
      if (row?.value) return row.value as T;
    } catch {
      /* fall through */
    }
  }
  const all = await readJson<Record<string, unknown>>("content.json", {});
  return (all[key] as T) ?? fallback;
}

export async function setContent(key: string, value: unknown) {
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.setting.upsert({
        where: { key: `content:${key}` },
        create: { key: `content:${key}`, value: value as object },
        update: { value: value as object },
      });
      return value;
    } catch {
      /* fall through */
    }
  }
  const all = await readJson<Record<string, unknown>>("content.json", {});
  all[key] = value;
  await writeJson("content.json", all);
  return value;
}

/* ── Leads ────────────────────────────────────────────────── */

export type LeadStatus = "NEW" | "CONTACTED" | "QUOTE_SENT" | "CONVERTED" | "LOST";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  projectType?: string | null;
  message?: string | null;
  estimatedCost?: number | null;
  status: LeadStatus;
  source?: string | null;
  details?: unknown;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createLead(
  data: Partial<LeadRecord>,
): Promise<LeadRecord> {
  const now = new Date().toISOString();
  const record: LeadRecord = {
    id: randomUUID(),
    name: data.name || "Unknown",
    phone: data.phone || "",
    email: data.email ?? null,
    projectType: data.projectType ?? null,
    message: data.message ?? null,
    estimatedCost: data.estimatedCost ?? null,
    status: "NEW",
    source: data.source ?? "website",
    details: data.details ?? null,
    notes: null,
    createdAt: now,
    updatedAt: now,
  };

  const prisma = getPrisma();
  if (prisma) {
    try {
      const created = await prisma.lead.create({
        data: {
          name: record.name,
          phone: record.phone,
          email: record.email,
          projectType: record.projectType,
          message: record.message,
          estimatedCost: record.estimatedCost,
          source: record.source,
          details: (record.details ?? undefined) as object | undefined,
        },
      });
      return { ...record, id: created.id, createdAt: created.createdAt.toISOString() };
    } catch {
      /* fall through */
    }
  }
  const leads = await readJson<LeadRecord[]>("leads.json", []);
  leads.unshift(record);
  await writeJson("leads.json", leads);
  return record;
}

export async function listLeads(): Promise<LeadRecord[]> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })) as unknown as LeadRecord[];
    } catch {
      /* fall through */
    }
  }
  return readJson<LeadRecord[]>("leads.json", []);
}

export async function updateLead(
  id: string,
  patch: Partial<LeadRecord>,
): Promise<LeadRecord | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: {
          status: patch.status as any,
          notes: patch.notes ?? undefined,
        },
      });
      return {
        ...(updated as any),
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } catch {
      /* fall through */
    }
  }
  const leads = await readJson<LeadRecord[]>("leads.json", []);
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeJson("leads.json", leads);
  return leads[idx];
}

export async function deleteLead(id: string): Promise<boolean> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.lead.delete({ where: { id } });
      return true;
    } catch {
      /* fall through */
    }
  }
  const leads = await readJson<LeadRecord[]>("leads.json", []);
  const next = leads.filter((l) => l.id !== id);
  await writeJson("leads.json", next);
  return next.length !== leads.length;
}
