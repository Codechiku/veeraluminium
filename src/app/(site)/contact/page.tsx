import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  mailLink,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Veer Aluminium & Fabrication, Palanpur",
  description:
    "Get in touch with Veer Aluminium & Fabrication, Near Railway Overbridge, Ruppura, Palanpur, Gujarat. Call, WhatsApp or request a free quote today.",
  alternates: { canonical: "/contact" },
};

const mapsEmbed =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
  `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.address.full,
  )}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Build Something Premium"
        description="Reach out for a free consultation, site visit or instant quote. We're here to bring your vision to life."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section pt-12 md:pt-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Contact info + quick actions */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-2xl font-bold">
                  Talk to Our Experts
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Choose whatever's easiest — we respond fast.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <InfoCard
                  icon={<MapPin className="h-5 w-5" />}
                  title="Visit Our Workshop"
                  lines={[siteConfig.address.full]}
                />
                <InfoCard
                  icon={<Phone className="h-5 w-5" />}
                  title="Call Us"
                  lines={[siteConfig.contact.phone]}
                  href={telLink}
                />
                <InfoCard
                  icon={<Mail className="h-5 w-5" />}
                  title="Email Us"
                  lines={[siteConfig.contact.email]}
                  href={mailLink}
                />
                <InfoCard
                  icon={<Clock className="h-5 w-5" />}
                  title="Business Hours"
                  lines={[siteConfig.hours.weekdays, siteConfig.hours.sunday]}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button asChild variant="gold" size="lg">
                  <a
                    href={whatsappLink(
                      "Hi Veer Aluminium, I'd like a free quote.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={telLink}>
                    <Phone /> Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-premium md:p-8">
                  <h2 className="font-display text-2xl font-bold">
                    Request a Free Quote
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill in the form and we'll get back within 24 hours.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map */}
          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-sm">
              <iframe
                src={mapsEmbed}
                title="Veer Aluminium location"
                className="h-[420px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
}) {
  const body = (
    <div className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-gold/40">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {body}
    </a>
  ) : (
    body
  );
}
