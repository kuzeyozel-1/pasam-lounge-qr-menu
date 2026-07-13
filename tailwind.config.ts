import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FDF1F1",
          100: "#FBDCDD",
          200: "#F5B7BA",
          300: "#E8848A",
          400: "#D5545C",
          500: "#9E2127",
          600: "#84181D",
          700: "#6B1317",
          800: "#520F12",
          900: "#390A0C",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft-sm": "0 2px 10px -2px rgb(0 0 0 / 0.06)",
        soft: "0 8px 30px -6px rgb(0 0 0 / 0.08)",
        "soft-lg": "0 24px 60px -12px rgb(0 0 0 / 0.14)",
        glow: "0 0 0 1px rgb(158 33 39 / 0.35), 0 0 24px -4px rgb(158 33 39 / 0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
};

export default config;
