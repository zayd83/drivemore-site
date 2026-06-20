"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const needleRotate = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const ringDash = useTransform(scrollYProgress, [0, 1], [0, 226]);

  return (
    <motion.div
      className="speedometer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background disc */}
        <circle cx="36" cy="36" r="34" fill="white" stroke="rgba(14,19,32,0.08)" strokeWidth="1.5" />
        {/* Track */}
        <circle
          cx="36"
          cy="36"
          r="27"
          stroke="rgba(14,19,32,0.08)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="170 226"
          strokeDashoffset="28"
          strokeLinecap="round"
          transform="rotate(120 36 36)"
        />
        {/* Progress arc */}
        <motion.circle
          cx="36"
          cy="36"
          r="27"
          stroke="url(#speedGrad)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="170 226"
          strokeLinecap="round"
          style={{
            strokeDashoffset: useTransform(ringDash, (v) => 170 - v * 0.75),
          }}
          transform="rotate(120 36 36)"
        />
        {/* Needle */}
        <motion.line
          x1="36"
          y1="36"
          x2="36"
          y2="16"
          stroke="var(--red)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ rotate: needleRotate, originX: "36px", originY: "36px" }}
        />
        {/* Hub */}
        <circle cx="36" cy="36" r="4" fill="var(--ink)" />
        <defs>
          <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--red)" />
            <stop offset="100%" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
