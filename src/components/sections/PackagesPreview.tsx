"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { SPOED_TOESLAG } from "@/lib/config/pricing";
import { GRATIS_HEREXAMEN, ACTIE, isActieZichtbaar } from "@/lib/config/offers";

function CheckIcon({ color }: { color: "red" | "blue" }) {
  return (
    <span
      className={`flex-shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5 ${
        color === "red" ? "bg-brand-red/10" : "bg-brand-blue/10"
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M1 6.2 4.3 9.5 11 2.5"
          stroke={color === "red" ? "#E11D28" : "#1B4FD1"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PackagesPreview({
  showSpoedToeslag = false,
  limit,
}: {
  showSpoedToeslag?: boolean;
  limit?: number;
}) {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = limit ? t.packages.items.slice(0, limit) : t.packages.items;
  const isLimited = items.length < t.packages.items.length;
  const actieZichtbaar = isActieZichtbaar();

  return (
    <section className="py-[clamp(60px,9vw,118px)]" id="pakketten">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="max-w-[660px] mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 mb-3 rounded-full bg-brand-red/10 px-3.5 py-1.5 text-[11.5px] font-sora font-semibold text-brand-red">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
            {t.packages.noWaitlistBadge}
          </span>
          <br />
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.packages.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.packages.heading1}{" "}
            <span className="grad">{t.packages.headingAccent}</span>.
          </h2>
          <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-brand-ink-body">
            {isLimited ? t.packages.leadHome : t.packages.lead}
          </p>
        </motion.div>

        {/* Cards — horizontal scroll-snap: side by side on desktop, swipeable on mobile.
            pt-8 + -mt-8 (cancels out) gives the "Meest gekozen" ribbon room to render —
            it pokes above the card via a negative top offset (more so on hover-lift), and
            setting overflow-x here implicitly clips overflow-y too, so without this
            padding-for-headroom trick the badge gets cut off. */}
        <div className="-mx-5 md:-mx-10 px-5 md:px-10 pt-8 -mt-8 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <div className={`flex gap-5 snap-x snap-mandatory md:grid md:gap-5 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-5"}`}>
            {items.map((pkg, i) => (
              <motion.article
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col rounded-brand-lg transition-all duration-300 flex-shrink-0 w-[78vw] max-w-[300px] sm:w-[300px] md:w-auto md:max-w-none snap-start ${
                  pkg.featured
                    ? "p-0 md:-translate-y-3 hover:md:-translate-y-4"
                    : "border border-brand-line bg-white p-6 hover:-translate-y-1 hover:shadow-card"
                }`}
                style={
                  pkg.featured
                    ? {
                        background: "linear-gradient(135deg, #E11D28, #1B4FD1)",
                        boxShadow: "0 28px 56px -28px rgba(40,60,160,0.55)",
                      }
                    : {}
                }
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 font-sora font-bold text-[11px] tracking-[0.14em] uppercase text-white bg-gradient-to-r from-brand-red to-brand-blue px-4 py-1.5 rounded-full shadow-[0_10px_22px_-10px_rgba(40,60,160,0.7)] whitespace-nowrap">
                    {t.packages.badge}
                  </span>
                )}
                <div className={`flex flex-col flex-1 ${pkg.featured ? "bg-white rounded-[32px] m-0.5 p-6" : ""}`}>
                  <h3 className="font-sora font-extrabold text-[21px] tracking-[-0.02em] text-brand-ink">
                    {pkg.name}
                  </h3>
                  <p className="text-[13px] text-brand-ink-soft font-medium mt-1">{pkg.lessons}</p>
                  <div className="font-sora font-extrabold text-[clamp(26px,3.4vw,32px)] tracking-[-0.02em] mt-4 flex items-baseline gap-2">
                    <span className="font-inter font-medium text-[12.5px] text-brand-ink-soft">
                      {t.packages.from}
                    </span>
                    €{pkg.price.toLocaleString("nl-NL")}
                  </div>
                  {showSpoedToeslag && (
                    <p className="mt-1 text-[12.5px] font-medium text-brand-ink-soft">
                      + €{SPOED_TOESLAG} {t.packages.spoedToeslagLabel}
                    </p>
                  )}
                  <ul className="mt-5 mb-6 space-y-2.5 flex-1">
                    {pkg.features.map((feat, fi) => (
                      <li key={fi} className="flex gap-2.5 text-[13.5px] leading-[1.4] text-[#2a3344]">
                        <CheckIcon color={pkg.featured ? "red" : "blue"} />
                        {feat}
                      </li>
                    ))}
                    <li className="flex gap-2.5 text-[13.5px] leading-[1.4] text-[#2a3344]">
                      <CheckIcon color={pkg.featured ? "red" : "blue"} />
                      {GRATIS_HEREXAMEN ? t.packages.gratisHerexamenLabel : t.packages.examenbegeleidingLabel}
                    </li>
                  </ul>
                  <MagneticButton className="mt-auto w-full">
                    <Button href="/contact" variant={pkg.featured ? "primary" : "blue"} className="w-full" size="md">
                      {t.packages.cta}
                    </Button>
                  </MagneticButton>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {isLimited && (
          <div className="mt-8 flex justify-center">
            <MagneticButton>
              <Button href="/rijlespakketten">
                {t.packages.viewAllCta}
              </Button>
            </MagneticButton>
          </div>
        )}

        {/* Losse-les-prijs (+ actie indien actief) en intake-verrekening — bewust één opvallend
            blok i.p.v. losse kleine tekstregels. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className={`mt-10 rounded-brand-lg text-center p-7 md:p-8 ${
            actieZichtbaar
              ? "border-2 border-brand-red/25 bg-gradient-to-br from-brand-red/[0.06] via-white to-brand-blue/[0.06] shadow-card-sm"
              : "border border-brand-line bg-brand-light"
          }`}
        >
          {actieZichtbaar ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-[11px] font-sora font-bold uppercase tracking-[0.12em] text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
                </svg>
                {t.packages.actieBadge}
              </span>
              <p className="mt-4 text-[14px] font-medium text-brand-ink-body">
                {t.packages.perLessonActieLead}
              </p>
              <p className="mt-1.5 font-sora font-extrabold text-[clamp(24px,4vw,34px)] tracking-[-0.02em]">
                <span className="line-through text-brand-ink-soft/55 text-[0.65em] mr-2 align-middle">
                  €{ACTIE.normalePrijsPerLes}
                </span>
                <span className="text-brand-red">€{ACTIE.actiePrijsPerLes}</span>{" "}
                <span className="text-[0.5em] font-inter font-semibold text-brand-ink-body align-middle">
                  {t.packages.perLessonSuffix}
                </span>
              </p>
              {ACTIE.actieEinddatum && (
                <p className="mt-2 text-[13px] font-sora font-bold text-brand-ink-soft">
                  {t.packages.actieUntilLabel} {ACTIE.actieEinddatum.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB")}
                </p>
              )}
            </>
          ) : (
            <p className="text-[15px] text-brand-ink-body">{t.packages.perLesson}</p>
          )}

          <div className={actieZichtbaar ? "mt-5 pt-5 border-t border-brand-line/70" : "mt-3"}>
            <span className="block text-[11px] font-sora font-semibold uppercase tracking-wide text-brand-ink-soft">
              {t.packages.intakeNoteIntro}
            </span>
            <span className="text-[14px] text-brand-ink-body font-medium">
              {t.packages.intakeNoteText}
            </span>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-brand-light border border-brand-line rounded-brand-lg p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div>
            <h3 className="font-sora font-bold text-[19px] text-brand-ink">
              {t.packages.note.heading}
            </h3>
            <p className="mt-1.5 text-[15px] text-brand-ink-body leading-relaxed">
              {t.packages.note.body}
            </p>
          </div>
          <MagneticButton className="flex-shrink-0">
            <Button href="/contact" className="whitespace-nowrap">
              {t.packages.note.cta}
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
