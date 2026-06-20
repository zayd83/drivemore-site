"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CONTACT } from "@/lib/utils";

export function ContactCTA() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const directLinks = [
    {
      href: CONTACT.whatsapp,
      external: true,
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.5 9.5c0 3 2 5 5 5" />
        </svg>
      ),
      label: t.contact.direct.whatsapp.label,
      sub: t.contact.direct.whatsapp.sub,
    },
    {
      href: `tel:${CONTACT.phone}`,
      external: false,
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      ),
      label: t.contact.direct.phone.label,
      sub: t.contact.direct.phone.sub,
    },
    {
      href: `mailto:${CONTACT.email}`,
      external: false,
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
      label: t.contact.direct.email.label,
      sub: t.contact.direct.email.sub,
    },
  ];

  return (
    <section className="py-[clamp(60px,9vw,118px)] bg-brand-ink text-white">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(40px,5vw,72px)]">
          {/* Left: heading + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {t.contact.eyebrow}
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4 text-white">
              {t.contact.heading1}{" "}
              <span className="grad">{t.contact.headingAccent}</span>
              {t.contact.heading2}
            </h2>
            <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-white/80 max-w-[44ch]">
              {t.contact.lead}
            </p>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="font-sora font-semibold text-[15px] bg-brand-red text-white rounded-full px-7 py-4 shadow-red-cta hover:shadow-red-hover hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  {t.hero.ctaPrimary}
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: direct contact links */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-sora font-bold text-[20px] text-white">
              {t.contact.direct.heading}
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {directLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 bg-white/[0.05] border border-white/[0.12] rounded-[15px] px-4 py-4 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-[11px] bg-white/[0.08] grid place-items-center flex-shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <span className="font-sora font-semibold text-[14.5px] text-white block">
                      {link.label}
                    </span>
                    <span className="font-inter text-[13px] text-[#9aa6bd]">
                      {link.sub}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
