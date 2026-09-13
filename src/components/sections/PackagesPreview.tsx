"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";

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

export function PackagesPreview() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"regulier" | "spoed">("regulier");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const packages = mode === "regulier" ? t.packages.regulier : t.packages.spoed;

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
            {t.packages.lead}
          </p>

          {/* Toggle */}
          <div
            role="tablist"
            aria-label="Soort traject"
            className="inline-flex bg-brand-light-2 border border-brand-line rounded-full p-1.5 mt-6 gap-1"
          >
            {(["regulier", "spoed"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`font-sora font-semibold text-[14px] px-5 py-2.5 rounded-full transition-all duration-200 ${
                  mode === m
                    ? "bg-white text-brand-ink shadow-card-sm"
                    : "text-brand-ink-soft hover:text-brand-ink"
                }`}
              >
                {m === "regulier" ? t.packages.toggle.regular : t.packages.toggle.intensive}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {packages.map((pkg, i) => (
              <motion.article
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-brand-lg transition-all duration-300 ${
                  pkg.featured
                    ? "p-0 md:-translate-y-3 hover:md:-translate-y-4"
                    : "border border-brand-line bg-white p-7 hover:-translate-y-1 hover:shadow-card"
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
                <div
                  className={`flex flex-col flex-1 ${
                    pkg.featured
                      ? "bg-white rounded-[32px] m-0.5 p-7"
                      : ""
                  }`}
                >
                  <span className="font-sora font-semibold text-[11px] tracking-[0.14em] uppercase text-brand-ink-soft">
                    {pkg.label}
                  </span>
                  <h3 className="font-sora font-extrabold text-[26px] tracking-[-0.02em] mt-2.5 text-brand-ink">
                    {pkg.name}
                  </h3>
                  <p className="text-[14.5px] text-brand-ink-soft leading-relaxed mt-1.5 min-h-[44px]">
                    {pkg.tagline}
                  </p>
                  <p
                    className={`text-[13px] leading-relaxed mt-1 font-medium ${
                      pkg.featured ? "text-brand-ink-soft" : "text-brand-ink-soft/90"
                    }`}
                  >
                    {pkg.forWhom}
                  </p>
                  <div className="font-sora font-extrabold text-[clamp(32px,4vw,40px)] tracking-[-0.02em] mt-4 flex items-baseline gap-2">
                    <span className="font-inter font-medium text-[13px] text-brand-ink-soft">
                      {t.packages.from}
                    </span>
                    €{pkg.price.toLocaleString("nl-NL")}
                  </div>
                  <ul className="mt-5 mb-6 space-y-3 flex-1">
                    {pkg.features.map((feat, fi) => (
                      <li
                        key={fi}
                        className="flex gap-3 text-[14.5px] leading-[1.45] text-[#2a3344]"
                      >
                        <CheckIcon color={pkg.featured ? "red" : "blue"} />
                        <span className={fi === 0 && feat.startsWith("Alles") || feat.startsWith("Everything") ? "font-semibold text-brand-ink" : ""}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton className="mt-auto w-full">
                    <Button href="/contact" variant={pkg.featured ? "primary" : "secondary"} className="w-full">
                      {t.packages.cta} {pkg.name}
                    </Button>
                  </MagneticButton>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 bg-brand-light border border-brand-line rounded-brand-lg p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div>
            <h3 className="font-sora font-bold text-[19px] text-brand-ink">
              {t.packages.note.heading}
            </h3>
            <p className="mt-1.5 text-[15px] text-brand-ink-body leading-relaxed">
              {t.packages.note.body}{" "}
              <strong className="text-brand-ink">{t.packages.note.body2}</strong>
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
