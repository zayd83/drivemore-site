"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export function ServiceArea() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-[clamp(56px,8vw,96px)] bg-brand-light overflow-hidden">
      <WaveDivider fill="#ffffff" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        <motion.div
          ref={ref}
          className="max-w-[660px] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <IconBlob icon={<PinIcon />} color="blue" size="md" className="mx-auto mb-4" />
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.serviceArea.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(26px,4vw,38px)] leading-[1.1] tracking-[-0.02em] mt-4">
            {t.serviceArea.heading1} <span className="grad">{t.serviceArea.headingAccent}</span>.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-brand-ink-body">
            {t.serviceArea.lead}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {t.serviceArea.cities.map((city, i) => (
              <Link
                key={city.slug}
                href={`/rijschool-${city.slug}`}
                className={`inline-flex items-center gap-1.5 font-sora font-semibold text-[13px] text-brand-ink bg-white border rounded-full px-4 py-2 hover:-translate-y-0.5 hover:shadow-card-sm transition-all duration-200 ${
                  i % 2 === 0 ? "border-brand-red/25 hover:border-brand-red/50" : "border-brand-blue/25 hover:border-brand-blue/50"
                }`}
              >
                <svg className={`w-3.5 h-3.5 ${i % 2 === 0 ? "text-brand-red" : "text-brand-blue"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                {city.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <MagneticButton>
              <Button href="/contact">{t.serviceArea.cta}</Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
