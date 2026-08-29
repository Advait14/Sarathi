import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        canvas: "var(--color-canvas)",
        surface: {
          DEFAULT: "var(--color-surface)",
          subtle: "var(--color-surface-subtle)",
          muted: "var(--color-surface-muted)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
          subtle: "var(--color-border-subtle)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          active: "var(--color-primary-active)",
          soft: "var(--color-primary-soft)",
          border: "var(--color-primary-border)",
          text: "var(--color-primary-text)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
          soft: "var(--color-accent-soft)",
          border: "var(--color-accent-border)",
          text: "var(--color-accent-text)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          hover: "var(--color-success-hover)",
          soft: "var(--color-success-soft)",
          border: "var(--color-success-border)",
          text: "var(--color-success-text)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          hover: "var(--color-warning-hover)",
          soft: "var(--color-warning-soft)",
          border: "var(--color-warning-border)",
          text: "var(--color-warning-text)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          hover: "var(--color-danger-hover)",
          soft: "var(--color-danger-soft)",
          border: "var(--color-danger-border)",
          text: "var(--color-danger-text)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          hover: "var(--color-info-hover)",
          soft: "var(--color-info-soft)",
          border: "var(--color-info-border)",
          text: "var(--color-info-text)",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        badge: "var(--radius-badge)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        card: "var(--shadow-card)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        sarathi: {
          primary: "#0B57D0",
          "primary-content": "#FFFFFF",
          secondary: "#0F172A",
          "secondary-content": "#FFFFFF",
          accent: "#2563EB",
          "accent-content": "#FFFFFF",
          neutral: "#0F172A",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#F1F5F9",
          "base-content": "#0F172A",
          info: "#0B57D0",
          "info-content": "#FFFFFF",
          success: "#10B981",
          "success-content": "#FFFFFF",
          warning: "#F59E0B",
          "warning-content": "#0F172A",
          error: "#EF4444",
          "error-content": "#FFFFFF",
          "--radius-box": "0.5rem",
          "--radius-field": "0.375rem",
          "--radius-thumb": "0.25rem",
        },
      },
    ],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};

export default config;
