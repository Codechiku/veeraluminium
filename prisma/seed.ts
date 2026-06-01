/**
 * Database seed for Veer Aluminium & Fabrication.
 *
 *   npm run db:seed
 *
 * Seeds:
 *   • a bootstrap admin (from ADMIN_EMAIL / ADMIN_PASSWORD env vars)
 *   • the default pricing config (so the CMS shows real values to edit)
 *   • the showcase projects & testimonials
 *
 * Safe to re-run — uses upserts / existence checks where possible.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultPricing } from "../src/lib/pricing";
import { projects, testimonials } from "../src/lib/content";
import { defaultSiteContent } from "../src/lib/editable-content";

const prisma = new PrismaClient();

async function main() {
  // ── Admin ───────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL || "admin@veeraluminium.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword#2026";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "Administrator" },
    create: { email, passwordHash, name: "Administrator", role: "ADMIN" },
  });
  console.log(`✓ Admin ready: ${email}`);

  // ── Pricing + content settings ──────────────────────────
  await prisma.setting.upsert({
    where: { key: "pricing" },
    update: { value: defaultPricing as object },
    create: { key: "pricing", value: defaultPricing as object },
  });
  await prisma.setting.upsert({
    where: { key: "content:home" },
    update: { value: defaultSiteContent as object },
    create: { key: "content:home", value: defaultSiteContent as object },
  });
  console.log("✓ Settings (pricing + content) seeded");

  // ── Projects ────────────────────────────────────────────
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: projects.map((p, i) => ({
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        description: p.description,
        image: p.image,
        beforeImage: p.beforeImage ?? null,
        afterImage: p.afterImage ?? null,
        videoUrl: p.videoUrl ?? null,
        size: p.size,
        tags: p.tags,
        order: i,
        featured: i < 6,
      })),
    });
    console.log(`✓ Seeded ${projects.length} projects`);
  } else {
    console.log(`• Projects already present (${projectCount}), skipping`);
  }

  // ── Testimonials ────────────────────────────────────────
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: testimonials.map((t, i) => ({
        name: t.name,
        role: t.role,
        location: t.location,
        rating: t.rating,
        quote: t.quote,
        image: t.image ?? null,
        videoUrl: t.videoUrl ?? null,
        order: i,
        published: true,
      })),
    });
    console.log(`✓ Seeded ${testimonials.length} testimonials`);
  } else {
    console.log(`• Testimonials already present (${testimonialCount}), skipping`);
  }

  console.log("\n🎉 Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
