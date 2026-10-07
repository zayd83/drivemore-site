"use client";

import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS } from "@/lib/config/business";
import { CONTACT } from "@/lib/utils";
import type { LegalDoc } from "@/lib/content/legal";

type LegalPageKey = "privacy" | "cookies" | "terms";

const MARKDOWN_COMPONENTS = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h2 className="font-sora font-extrabold text-[24px] sm:text-[28px] tracking-[-0.02em] text-brand-ink mt-9 mb-3 first:mt-0" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h3 className="font-sora font-bold text-[19px] sm:text-[21px] tracking-[-0.015em] text-brand-ink mt-8 mb-2.5" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h4 className="font-sora font-bold text-[16px] sm:text-[17px] text-brand-ink mt-6 mb-2" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-[15px] sm:text-[15.5px] leading-[1.75] text-brand-ink-body mb-4" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-5 space-y-1.5 mb-4 text-[15px] sm:text-[15.5px] leading-[1.7] text-brand-ink-body" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-[15px] sm:text-[15.5px] leading-[1.7] text-brand-ink-body" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => <li {...props} />,
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-brand-blue underline underline-offset-2 hover:text-brand-red transition-colors" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-brand-ink" {...props} />
  ),
  hr: () => <hr className="border-brand-line my-8" />,
};

export function LegalPageLayout({ pageKey, doc }: { pageKey: LegalPageKey; doc: LegalDoc }) {
  const { t, lang } = useLanguage();
  const page = t.legal.pages[pageKey];

  return (
    <section className="pt-[120px] pb-[clamp(56px,8vw,96px)]">
      <div className="max-w-[720px] mx-auto px-5 md:px-10">
        <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          {page.eyebrow}
        </span>
        <h1 className="font-sora font-extrabold text-[clamp(30px,5vw,46px)] leading-[1.08] tracking-[-0.025em] mt-3">
          {page.title}
        </h1>
        {doc.lastUpdated && (
          <p className="mt-2.5 text-[13px] text-brand-ink-soft">
            {t.legal.updatedLabel}:{" "}
            {doc.lastUpdated.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {/* Bedrijfsgegevens */}
        <div className="mt-7 bg-brand-light border border-brand-line rounded-brand-lg p-6">
          <h2 className="font-sora font-bold text-[13px] tracking-[0.1em] uppercase text-brand-ink-soft">
            {t.legal.businessInfoHeading}
          </h2>
          <div className="mt-3 text-[14.5px] leading-[1.7] text-brand-ink-body">
            <p className="font-sora font-semibold text-brand-ink">{BUSINESS.name}</p>
            <p>
              {BUSINESS.streetAddress}, {BUSINESS.postalCode} {BUSINESS.addressLocality}
            </p>
            <p>
              {t.legal.kvkLabel} {BUSINESS.kvk}
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="text-brand-blue hover:text-brand-red transition-colors">
                {CONTACT.email}
              </a>{" "}
              ·{" "}
              <a href={`tel:+31${CONTACT.phone.slice(1)}`} className="text-brand-blue hover:text-brand-red transition-colors">
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        {lang === "en" && (
          <p className="mt-6 text-[13.5px] italic text-brand-ink-soft">{t.legal.enNotice}</p>
        )}

        <div className="mt-8">
          {doc.found ? (
            <ReactMarkdown components={MARKDOWN_COMPONENTS}>{doc.markdown}</ReactMarkdown>
          ) : (
            <p className="text-[15px] text-brand-ink-soft italic">{t.legal.placeholderNote}</p>
          )}
        </div>
      </div>
    </section>
  );
}
