"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 17l-5.9 3.4 1.2-6.5-4.8-4.6 6.6-.8z" />
    </svg>
  );
}

export function PackagesTeaser() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(48px,7vw,88px)]" id="pakketten">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          className="max-w-[600px] mx-auto text-center mb-9"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.packagesTeaser.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(28px,4.8vw,46px)] leading-[1.08] tracking-[-0.025em] mt-3">
            {t.packagesTeaser.heading}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-brand-ink-body">
            {t.packagesTeaser.lead}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.packagesTeaser.items.map((pkg, i) => (
            <motion.article
              key={pkg.id}
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
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 font-sora font-bold text-[11px] tracking-[0.14em] uppercase text-white bg-gradient-to-r from-brand-red to-brand-blue px-4 py-1.5 rounded-full shadow-[0_10px_22px_-10px_rgba(40,60,160,0.7)] whitespace-nowrap">
                  <StarIcon />
                  {t.packagesTeaser.badge}
                </span>
              )}
              <div className={`flex flex-col flex-1 ${pkg.featured ? "bg-white rounded-[32px] m-0.5 p-7" : ""}`}>
                <h3 className="font-sora font-extrabold text-[24px] tracking-[-0.02em] text-brand-ink">
                  {pkg.name}
                </h3>
                <p className="text-[13.5px] text-brand-ink-soft font-medium mt-1">{pkg.lessons}</p>
                <div className="font-sora font-extrabold text-[clamp(28px,3.6vw,36px)] tracking-[-0.02em] mt-4 flex items-baseline gap-2">
                  <span className="font-inter font-medium text-[13px] text-brand-ink-soft">
                    {t.packagesTeaser.from}
                  </span>
                  € {pkg.price}
                </div>
                <ul className="mt-5 mb-6 space-y-3 flex-1">
                  {pkg.features.map((feat, fi) => (
                    <li key={fi} className="flex gap-3 text-[14.5px] leading-[1.45] text-[#2a3344]">
                      <CheckIcon color={pkg.featured ? "red" : "blue"} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <MagneticButton className="mt-auto w-full">
                  <Button href="/contact" variant={pkg.featured ? "primary" : "secondary"} className="w-full">
                    {pkg.cta}
                  </Button>
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-[14px] text-brand-ink-body">
          {t.packagesTeaser.perLesson}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-brand-light border border-brand-line rounded-brand-lg p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div>
            <h3 className="font-sora font-bold text-[19px] text-brand-ink">
              {t.packagesTeaser.note.heading}
            </h3>
            <p className="mt-1.5 text-[15px] text-brand-ink-body leading-relaxed">
              {t.packagesTeaser.note.body}
            </p>
          </div>
          <MagneticButton className="flex-shrink-0">
            <Button href="/contact" className="whitespace-nowrap">
              {t.packagesTeaser.note.cta}
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
