"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 200, damping: 22, mass: 0.6 };

export function FloatingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), SPRING);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-18, 18]), SPRING);
  const glareX = useTransform(rawX, [-0.5, 0.5], ["-30%", "130%"]);
  const glareY = useTransform(rawY, [-0.5, 0.5], ["-30%", "130%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.38) 0%, transparent 65%)`
  );

  useEffect(() => {
    setMounted(true);

    const handleMouse = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma != null) rawX.set(Math.max(-0.5, Math.min(0.5, e.gamma / 30)));
      if (e.beta != null) rawY.set(Math.max(-0.5, Math.min(0.5, (e.beta - 30) / 30)));
    };

    const el = cardRef.current;
    el?.addEventListener("mousemove", handleMouse);
    el?.addEventListener("mouseleave", handleLeave);
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      el?.removeEventListener("mousemove", handleMouse);
      el?.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [rawX, rawY]);


  return (
    <div
      ref={cardRef}
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={mounted ? { y: [0, -12, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[300px] h-[188px] md:w-[340px] md:h-[213px] select-none"
      >
        {/* Card body */}
        <div
          className="absolute inset-0 rounded-[16px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(20,30,60,0.55)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8faff] to-[#eef2f9]" />

          {/* Red header band */}
          <div className="absolute inset-x-0 top-0 h-[52px] bg-brand-red flex items-center px-5 gap-3">
            <span className="font-sora font-black text-white text-[22px] leading-none tracking-tight">
              DM
            </span>
            <span className="font-sora font-semibold text-white/80 text-[8px] tracking-[0.2em] uppercase leading-tight">
              RIJSCHOOL<br />DRIVE MORE
            </span>
            {/* chip deco */}
            <div className="ml-auto w-[36px] h-[26px] rounded-[5px] bg-gradient-to-br from-[#e8c84a] to-[#b8922a] opacity-90" />
          </div>

          {/* Holder name area */}
          <div className="absolute top-[62px] left-5 right-5">
            <p className="font-inter text-[9px] tracking-[0.16em] uppercase text-brand-ink-soft">
              Naam / Name
            </p>
            <p className="font-sora font-bold text-[15px] text-brand-ink mt-0.5">
              Jouw naam hier
            </p>
            <p className="font-inter text-[9px] tracking-[0.1em] text-brand-ink-soft mt-0.5">
              Geboortedatum &nbsp;01.01.2000
            </p>
          </div>

          {/* Photo placeholder */}
          <div className="absolute right-5 top-[62px] w-[52px] h-[64px] rounded-[6px] bg-gradient-to-br from-brand-red/20 to-brand-blue/20 border border-brand-line flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa6bd" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          {/* Bottom bar */}
          <div className="absolute inset-x-0 bottom-0 h-[34px] bg-brand-ink/[0.04] border-t border-brand-line/50 flex items-center px-5 gap-2">
            {/* Barcode lines */}
            <div className="flex gap-[2px] items-center flex-1">
              {[10, 6, 9, 4, 7, 11, 5, 8, 6, 10, 4, 7, 9, 5, 8].map((h, i) => (
                <div
                  key={i}
                  className="bg-brand-ink/70 rounded-[1px]"
                  style={{ width: i % 3 === 0 ? "3px" : "1.5px", height: `${h}px` }}
                />
              ))}
            </div>
            <span className="font-sora font-bold text-[8px] tracking-[0.1em] text-brand-ink/50">
              CBR · NL
            </span>
          </div>

          {/* Glare overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[16px]"
            style={{ background: glareBg }}
          />
        </div>

        {/* Card shadow / depth layer */}
        <div
          className="absolute inset-x-4 -bottom-6 h-8 rounded-full blur-xl bg-brand-blue/20"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
}
