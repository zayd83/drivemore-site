interface WaveDividerProps {
  /** Color the wave "flows into" — the background of the adjacent section. */
  fill: string;
  /** Place at the top of a section (mirrors the wave) instead of the bottom. */
  flip?: boolean;
  className?: string;
}

/** Soft wavy edge for a section — the site's alternative to a hard straight seam between blocks. */
export function WaveDivider({ fill, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 ${flip ? "top-0" : "bottom-0"} leading-[0] pointer-events-none overflow-hidden z-[1] ${className}`}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block w-full h-[34px] sm:h-[52px] md:h-[70px]"
      >
        <path
          d="M0,32 C180,70 360,0 600,24 C840,48 1020,86 1260,58 C1350,46 1410,38 1440,34 L1440,90 L0,90 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
