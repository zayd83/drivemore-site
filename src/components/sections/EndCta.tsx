"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { CONTACT } from "@/lib/utils";

export function EndCta() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-[clamp(56px,8vw,100px)] bg-brand-ink text-white overflow-hidden">
      <WaveDivider fill="#F6F8FC" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        <motion.div
          ref={ref}
          className="max-w-[560px] mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.endCta.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(28px,5vw,44px)] leading-[1.08] tracking-[-0.025em] mt-4 text-white">
            {t.endCta.heading1}{" "}
            <span className="grad">{t.endCta.headingAccent}</span>
            {t.endCta.heading2}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-white/80">
            {t.endCta.lead}
          </p>
          <div className="mt-7 flex justify-center">
            <MagneticButton>
              <Button href="/contact">{t.endCta.cta}</Button>
            </MagneticButton>
          </div>
          <p className="mt-5 text-[13.5px] text-white/60">
            {t.endCta.whatsappPrefix}{" "}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-2 hover:text-white/90">
              {t.endCta.whatsappLink}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
