"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimal?: boolean;
  className?: string;
}

export function CountUp({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimal = false,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;

    const start = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setValue(target);
        return;
      }

      const startTime = performance.now();
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(parseFloat((eased * target).toFixed(decimal ? 1 : 0)));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (isInView) {
      start();
      return;
    }

    // Safety net: if the intersection observer never reports "in view" (e.g. an
    // edge case on load), don't leave the counter permanently stuck at 0.
    const fallback = setTimeout(start, 1500);
    return () => clearTimeout(fallback);
  }, [isInView, target, duration, decimal]);

  const display = decimal ? value.toFixed(1) : Math.round(value).toLocaleString("nl-NL");

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
