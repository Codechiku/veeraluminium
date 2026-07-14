import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "How We Work | Veer Aluminium & Fabrication",
  description:
    "See Veer Aluminium's complete process from free site survey and quotation to manufacturing, installation, handover and warranty.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="How We Work"
        title="From First Visit to Final Handover"
        description="A seamless, transparent process engineered around your peace of mind."
        crumbs={[{ label: "How We Work" }]}
      />
      <Process showHeading={false} />
      <CtaBand />
    </>
  );
}
