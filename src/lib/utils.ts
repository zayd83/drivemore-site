import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const CONTACT = {
  phone: "0611206001",
  phoneDisplay: "06 11206001",
  whatsapp: "https://wa.me/31611206001",
  email: "contact@rijschooldrivemore.nl",
} as const;
