import type { ReactNode } from "react";

type Color = "red" | "blue" | "gradient";
type Size = "sm" | "md" | "lg";

const colorClasses: Record<Color, { bg: string; icon: string }> = {
  red: { bg: "bg-brand-red/10", icon: "text-brand-red" },
  blue: { bg: "bg-brand-blue/10", icon: "text-brand-blue" },
  gradient: { bg: "", icon: "text-white" },
};

const sizeClasses: Record<Size, { box: string; icon: string }> = {
  sm: { box: "w-11 h-11", icon: "w-5 h-5" },
  md: { box: "w-14 h-14", icon: "w-[26px] h-[26px]" },
  lg: { box: "w-20 h-20", icon: "w-9 h-9" },
};

interface IconBlobProps {
  icon: ReactNode;
  color?: Color;
  size?: Size;
  animate?: boolean;
  className?: string;
}

/** Icon centered on a soft, organically-shaped gradient/tint blob — the site's stand-in for photography. */
export function IconBlob({ icon, color = "red", size = "md", animate = false, className = "" }: IconBlobProps) {
  const c = colorClasses[color];
  const s = sizeClasses[size];

  return (
    <div
      className={`relative grid place-items-center flex-shrink-0 ${s.box} ${c.bg} ${animate ? "animate-blob-morph" : "rounded-blob"} ${className}`}
      style={
        color === "gradient"
          ? { background: "linear-gradient(135deg, #E11D28, #1B4FD1)" }
          : undefined
      }
    >
      <div className={`relative ${s.icon} ${c.icon}`}>{icon}</div>
    </div>
  );
}
