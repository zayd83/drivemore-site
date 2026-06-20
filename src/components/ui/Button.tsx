"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: "button";
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
}

interface ButtonAsAnchor extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: "a";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white shadow-red-cta hover:shadow-red-hover hover:-translate-y-0.5",
  secondary:
    "bg-brand-blue text-white shadow-brand-blue hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-brand-ink border border-brand-line hover:border-brand-ink hover:-translate-y-0.5",
  white:
    "bg-white text-brand-ink hover:-translate-y-0.5 hover:shadow-card-sm",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2.5 gap-1.5",
  md: "text-[15px] px-6 py-3.5 gap-2",
  lg: "text-base px-7 py-4 gap-2.5",
};

const baseClass =
  "font-sora font-semibold rounded-full inline-flex items-center justify-center transition-all duration-200 ease-out whitespace-nowrap cursor-pointer select-none";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const cls = cn(baseClass, variants[variant], sizes[size], className);

    if (props.as === "link") {
      const { href, as: _, ...rest } = props as ButtonAsLink;
      return (
        <Link href={href} className={cls} {...(rest as object)}>
          {children}
        </Link>
      );
    }

    if (props.as === "a") {
      const { href, as: _, ...rest } = props as ButtonAsAnchor;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }

    const { as: _, ...rest } = props as ButtonAsButton;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cls}
        whileTap={{ scale: 0.97 }}
        {...(rest as object)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
