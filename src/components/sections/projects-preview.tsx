"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/motion/section-heading";
import { Button } from "@/components/ui/button";
import { ProjectsStack } from "./projects-stack";

export function ProjectsPreview() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title="A Portfolio That Speaks for Itself"
            description="From premium residences to landmark commercial facades — explore a selection of our finest projects across Gujarat."
            className="max-w-xl"
          />
          <Button asChild variant="outline" className="group shrink-0">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <ProjectsStack limit={6} />
      </div>
    </section>
  );
}
