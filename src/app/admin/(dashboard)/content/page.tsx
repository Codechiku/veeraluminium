"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw, Save } from "lucide-react";
import {
  type SiteContent,
  CONTENT_KEY,
  defaultSiteContent,
} from "@/lib/editable-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch(`/api/content?key=${CONTENT_KEY}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.value) {
          // deep-merge over defaults so new fields always exist
          setContent({
            hero: { ...defaultSiteContent.hero, ...d.value.hero },
            about: { ...defaultSiteContent.about, ...d.value.about },
            services: { ...defaultSiteContent.services, ...d.value.services },
            cta: { ...defaultSiteContent.cta, ...d.value.cta },
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: CONTENT_KEY, value: content }),
      });
      if (!res.ok) throw new Error();
      toast.success("Content saved", {
        description: "Your website homepage has been updated.",
      });
      setDirty(false);
    } catch {
      toast.error("Could not save content");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setContent(defaultSiteContent);
    setDirty(true);
    toast.info("Reset to default content", { description: "Save to apply." });
  };

  // Generic nested field updater
  const update = <S extends keyof SiteContent, K extends keyof SiteContent[S]>(
    section: S,
    key: K,
    value: SiteContent[S][K],
  ) => {
    setContent((c) => ({ ...c, [section]: { ...c[section], [key]: value } }));
    setDirty(true);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading content…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Website Content</h1>
          <p className="text-sm text-muted-foreground">
            Edit the headline text shown across your homepage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button variant="gold" size="sm" onClick={save} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            )}
          </Button>
        </div>
      </div>

      {dirty && (
        <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm">
          You have unsaved changes. Click <strong>Save</strong> to publish.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hero */}
        <Section title="Hero Section" desc="The first thing visitors see">
          <TextField
            label="Badge text"
            value={content.hero.badge}
            onChange={(v) => update("hero", "badge", v)}
          />
          <TextField
            label="Headline — lead"
            value={content.hero.titleLead}
            onChange={(v) => update("hero", "titleLead", v)}
          />
          <TextField
            label="Headline — highlighted phrase (gold)"
            value={content.hero.titleHighlight}
            onChange={(v) => update("hero", "titleHighlight", v)}
          />
          <TextField
            label="Headline — tail"
            value={content.hero.titleTail}
            onChange={(v) => update("hero", "titleTail", v)}
          />
          <AreaField
            label="Subheading"
            value={content.hero.subheading}
            onChange={(v) => update("hero", "subheading", v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Primary button"
              value={content.hero.ctaPrimary}
              onChange={(v) => update("hero", "ctaPrimary", v)}
            />
            <TextField
              label="Secondary button"
              value={content.hero.ctaSecondary}
              onChange={(v) => update("hero", "ctaSecondary", v)}
            />
          </div>
        </Section>

        {/* About */}
        <Section title="About Section" desc="Your company story">
          <TextField
            label="Eyebrow"
            value={content.about.eyebrow}
            onChange={(v) => update("about", "eyebrow", v)}
          />
          <TextField
            label="Title"
            value={content.about.title}
            onChange={(v) => update("about", "title", v)}
          />
          <AreaField
            label="Body"
            value={content.about.body}
            onChange={(v) => update("about", "body", v)}
          />
          <TextField
            label="Experience badge (e.g. 3+)"
            value={content.about.experienceYears}
            onChange={(v) => update("about", "experienceYears", v)}
          />
        </Section>

        {/* Services intro */}
        <Section title="Services Heading" desc="Intro above the services grid">
          <TextField
            label="Eyebrow"
            value={content.services.eyebrow}
            onChange={(v) => update("services", "eyebrow", v)}
          />
          <TextField
            label="Title"
            value={content.services.title}
            onChange={(v) => update("services", "title", v)}
          />
          <AreaField
            label="Description"
            value={content.services.description}
            onChange={(v) => update("services", "description", v)}
          />
        </Section>

        {/* CTA */}
        <Section title="Call-to-Action Band" desc="The closing banner">
          <TextField
            label="Title"
            value={content.cta.title}
            onChange={(v) => update("cta", "title", v)}
          />
          <AreaField
            label="Description"
            value={content.cta.description}
            onChange={(v) => update("cta", "description", v)}
          />
        </Section>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        Tip: For projects, testimonials and services imagery, edit the seed data
        in <code className="text-foreground">src/lib/content.ts</code> /{" "}
        <code className="text-foreground">src/lib/site.ts</code>, or connect a
        database to manage them here.
      </div>
    </div>
  );
}

/* ── sub-components ─────────────────────────────────────────── */

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      {desc && <p className="mb-4 text-sm text-muted-foreground">{desc}</p>}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function AreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
