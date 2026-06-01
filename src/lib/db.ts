import { PrismaClient } from "@prisma/client";

/**
 * Returns a singleton Prisma client, or `null` when no DATABASE_URL is
 * configured. This lets the entire app run in a "fileless" fallback mode
 * (see store.ts) before a database is connected — perfect for local previews.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaDisabled: boolean | undefined;
};

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (globalForPrisma.prismaDisabled) return null;

  if (!globalForPrisma.prisma) {
    try {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      });
    } catch {
      globalForPrisma.prismaDisabled = true;
      return null;
    }
  }
  return globalForPrisma.prisma;
}
