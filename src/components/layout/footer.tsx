import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { mailLink, services, siteConfig, telLink } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-secondary/40">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  Icon: Facebook,
                  href: siteConfig.social.facebook,
                  label: "Facebook",
                  bg: "#1877F2",
                },
                {
                  Icon: Instagram,
                  href: siteConfig.social.instagram,
                  label: "Instagram",
                  bg: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
                },
                {
                  Icon: Youtube,
                  href: siteConfig.social.youtube,
                  label: "YouTube",
                  bg: "#FF0000",
                },
              ].map(({ Icon, href, label, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ background: bg }}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 7).map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/#services`}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "About", href: "/#about" },
                { label: "Projects", href: "/projects" },
                { label: "Estimate", href: "/estimate" },
                { label: "Testimonials", href: "/#testimonials" },
                { label: "Contact", href: "/contact" },
                { label: "Admin", href: "/admin" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-muted-foreground">
                  {siteConfig.address.full}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={telLink} className="text-muted-foreground hover:text-gold">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={mailLink} className="text-muted-foreground hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground">
              <p>{siteConfig.hours.weekdays}</p>
              <p>{siteConfig.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            Serving Palanpur &amp; Gujarat with precision engineering since{" "}
            {siteConfig.established}.
          </p>
        </div>
      </div>
    </footer>
  );
}
