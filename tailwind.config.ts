import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11D28",
          "red-dark": "#b3121d",
          blue: "#1B4FD1",
          "blue-light": "#3f74ff",
          ink: "#0E1320",
          "ink-soft": "#5a6478",
          "ink-body": "#475066",
          light: "#F6F8FC",
          "light-2": "#EEF2F9",
          line: "rgba(14,19,32,0.10)",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "28px",
        "brand-sm": "18px",
        "brand-lg": "36px",
      },
      maxWidth: {
        wrap: "1180px",
      },
      boxShadow: {
        "red-cta": "0 12px 26px -12px rgba(225,29,40,0.6)",
        "red-hover": "0 18px 34px -12px rgba(225,29,40,0.78)",
        card: "0 26px 50px -30px rgba(20,30,60,0.5)",
        "card-sm": "0 10px 24px -16px rgba(20,30,60,0.35)",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "blob-morph": "blob-morph 9s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 45% 55% 55%" },
          "50%": { borderRadius: "58% 42% 35% 65% / 55% 60% 40% 45%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
