import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg-primary)",
        foreground: "var(--color-text-primary)",
        primary: "var(--color-brand-indigo)",
        secondary: "var(--color-brand-green)",
        accent: "var(--color-brand-orange)",
        premium: "var(--color-brand-purple)",
        card: "var(--color-bg-card)",
        elevated: "var(--color-bg-elevated)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "16px",
        input: "12px",
        badge: "8px",
      },
      animation: {
        "shimmer": "shimmer 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;
