import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light" | "whatsapp" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sora font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-white shadow-red-cta hover:shadow-red-hover hover:bg-brand-red-dark",
  secondary: "bg-white border-2 border-brand-line text-brand-ink hover:border-brand-red hover:text-brand-red",
  "ghost-light": "border-2 border-white/35 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95",
  // Solid white pill for use on colored/gradient bands (e.g. the crash-course highlight)
  white: "bg-white text-brand-ink shadow-card-sm hover:shadow-card",
};

const sizes: Record<Size, string> = {
  md: "text-[14px] px-5 py-3",
  lg: "text-[15px] px-6 py-3.5 sm:px-7 sm:py-4",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

/** Consistent pill CTA used everywhere on the site — internal links, external (WhatsApp/tel/mailto), and form buttons. */
export function Button({ href, variant = "primary", size = "lg", className = "", children, onClick, type = "button", disabled, ariaLabel }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    if (/^(mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
