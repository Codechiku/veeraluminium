import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Our Projects | Aluminium, Glass & Fabrication Portfolio",
  description:
    "Explore Veer Aluminium's portfolio of residential, commercial and industrial projects — windows, structural glazing, ACP cladding, railings and custom fabrication across Gujarat.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects That Define Excellence"
        description="A showcase of precision-engineered spaces across Gujarat. Filter by category, compare before & after, and explore the details."
        crumbs={[{ label: "Projects" }]}
      />
      <section className="section">
        <div className="container">
          <ProjectsGallery />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
