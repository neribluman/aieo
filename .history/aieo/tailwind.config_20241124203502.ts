import type { Config } from "tailwindcss";

/** @type {import('@tremor/react').colors} */
const colors = require("@tremor/react").colors;

/** @type {import('@tremor/react').metrics} */
const metrics = require("@tremor/react").metrics;

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        ...colors,
        tremor: {
          brand: {
            faint: "#eff6ff",
            muted: "#bfdbfe",
            subtle: "#60a5fa",
            DEFAULT: "#3b82f6",
            emphasis: "#1d4ed8",
            inverted: "#ffffff",
          },
          background: {
            muted: "#f9fafb",
            subtle: "#f3f4f6",
            DEFAULT: "#ffffff",
            emphasis: "#374151",
          },
          border: {
            DEFAULT: "#e5e7eb",
          },
          ring: {
            DEFAULT: "#e5e7eb",
          },
          content: {
            subtle: "#9ca3af",
            DEFAULT: "#6b7280",
            emphasis: "#374151",
            strong: "#111827",
            inverted: "#ffffff",
          },
        },
      },
      boxShadow: {
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: metrics.fontSize,
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|border)-(indigo|emerald|violet|amber|rose|blue|red|green|yellow|orange|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /^(w|h)-./,
    },
    {
      pattern: /^(bg|text)-(.*)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
} satisfies Config;

export default config;