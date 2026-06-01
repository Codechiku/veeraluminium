import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EstimateCalculator } from "@/components/estimate/estimate-calculator";
import { SavedQuotesPanel } from "@/components/estimate/saved-quotes-panel";

export const metadata: Metadata = {
  title: "Free Estimate Calculator | Instant Aluminium & Glass Quote",
  description:
    "Get an instant, transparent estimate for aluminium windows, doors, glass, ACP and fabrication. Itemised material, labour, installation, GST and a downloadable PDF quotation.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Smart Quotation Engine"
        title="Instant Estimate Calculator"
        description="Configure your product below and watch the price update live. Download a professional PDF quote or request a detailed quotation from our team."
        crumbs={[{ label: "Estimate" }]}
      />

      <section className="section pt-12 md:pt-16">
        <div className="container">
          <EstimateCalculator />
          <div className="mt-12">
            <SavedQuotesPanel />
          </div>
        </div>
      </section>
    </>
  );
}
