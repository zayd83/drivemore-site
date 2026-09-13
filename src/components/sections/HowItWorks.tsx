"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { WaveDivider } from "@/components/ui/WaveDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HowItWorks() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!roadRef.current || !carRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(carRef.current, {
      left: "92%",
      ease: "none",
      scrollTrigger: {
        trigger: roadRef.current,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 1.5,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-[clamp(64px,9vw,124px)] bg-brand-light overflow-hidden"
      id="aanpak"
    >
      <WaveDivider fill="#ffffff" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        {/* Header */}
        <motion.div
          className="max-w-[660px] mx-auto text-center mb-[clamp(48px,6vw,72px)]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.howItWorks.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.howItWorks.heading1}{" "}
            <span className="grad">{t.howItWorks.headingAccent}</span>.
          </h2>
          <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-brand-ink-body">
            {t.howItWorks.lead}
          </p>
        </motion.div>

        {/* Scroll-driven road */}
        <div ref={roadRef} className="hidden md:block relative mb-10">
          {/* Road track */}
          <div className="relative h-[6px] bg-brand-ink/[0.06] rounded-full overflow-visible mx-[5%]">
            {/* Dashed center line */}
            <div
              className="absolute inset-y-0 inset-x-0 rounded-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(14,19,32,0.12) 0 14px, transparent 14px 28px)",
              }}
            />
            {/* Animated car */}
            <div
              ref={carRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: "4%" }}
              aria-hidden="true"
            >
              <svg
                width="30"
                height="18"
                viewBox="0 0 30 18"
                style={{ filter: "drop-shadow(0 3px 5px rgba(14,19,32,0.45))" }}
              >
                <path
                  d="M4 12.5c-1.4 0-2.5-1.1-2.5-2.5v-.8c0-1 .6-1.9 1.6-2.3l3.4-1.3 2.3-3c.6-.8 1.5-1.2 2.5-1.2h8.9c1.2 0 2.3.6 2.9 1.7l1.6 2.8 3.4 1c1 .3 1.7 1.2 1.7 2.3v1.6c0 1.4-1.1 2.5-2.5 2.5h-1"
                  fill="#ffffff"
                />
                <rect x="1.5" y="11" width="27" height="1.8" rx="0.9" fill="#ffffff" />
                <circle cx="8" cy="13.5" r="2.8" fill="#0E1320" />
                <circle cx="8" cy="13.5" r="1.2" fill="#ffffff" />
                <circle cx="22" cy="13.5" r="2.8" fill="#0E1320" />
                <circle cx="22" cy="13.5" r="1.2" fill="#ffffff" />
              </svg>
            </div>
          </div>
          {/* Step dots */}
          <div className="absolute inset-x-[5%] top-0 flex justify-between -translate-y-[7px]">
            {t.howItWorks.steps.map((_, i) => (
              <motion.div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-brand-line bg-white shadow-card-sm"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative px-0 md:px-4"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number badge */}
              <div
                className="w-16 h-16 rounded-blob grid place-items-center font-sora font-extrabold text-[22px] text-white relative z-10 shadow-card-sm"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #E11D28, #ff6b73)"
                    : "linear-gradient(135deg, #1B4FD1, #3f74ff)",
                }}
              >
                {step.n}
              </div>
              <h4 className="font-sora font-bold text-[18px] mt-4 text-brand-ink">
                {step.title}
              </h4>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-brand-ink-body">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDivider fill="#ffffff" />
    </section>
  );
}
