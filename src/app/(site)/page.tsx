import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { ServicesMarquee } from "@/components/sections/services-marquee";
import { Process } from "@/components/sections/process";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Statement } from "@/components/sections/statement";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { WhyChoose } from "@/components/sections/why-choose";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { EstimateTeaser } from "@/components/sections/estimate-teaser";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/content";
import { getContent } from "@/lib/store";
import {
  type SiteContent,
  CONTENT_KEY,
  defaultSiteContent,
} from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stored = await getContent<Partial<SiteContent>>(CONTENT_KEY, {});
  // Merge stored CMS content over the defaults so the page always renders.
  const content: SiteContent = {
    hero: { ...defaultSiteContent.hero, ...stored.hero },
    about: { ...defaultSiteContent.about, ...stored.about },
    services: { ...defaultSiteContent.services, ...stored.services },
    cta: { ...defaultSiteContent.cta, ...stored.cta },
  };

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero content={content.hero} />
      <Services content={content.services} />
      <ServicesMarquee />
      <Statement />
      <Stats />
      <ProjectsPreview />
      <Process />
      <EstimateTeaser />
      <About content={content.about} />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <CtaBand content={content.cta} />
    </>
  );
}
