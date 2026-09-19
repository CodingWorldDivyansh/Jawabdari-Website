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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#0B1B2F",
        orange: {
          DEFAULT: "#FF7A00",
          hover: "#E66E00",
        },
        "warm-white": "#FAF7F2",
        mist: "#E6EAF0",
        "verified-green": "#1E9E6A",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#0B1B2F",
          600: "#0B1B2F",
          700: "#0B1B2F",
          800: "#0B1B2F",
          900: "#0B1B2F",
        },
        amber: {
          DEFAULT: "#FFC21A",
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        }
      },
    },
  },
  plugins: [],
};
export default config;
