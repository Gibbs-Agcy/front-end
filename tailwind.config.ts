import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#0f172a",
          primary: {
            50: "#e6f1fe",
            100: "#cce3fd",
            200: "#99c7fb",
            300: "#66aaf9",
            400: "#338ef7",
            500: "#006FEE",
            600: "#005bc4",
            700: "#004493",
            800: "#002e62",
            900: "#001731",
            DEFAULT: "#006FEE",
            foreground: "#ffffff",
          },
          secondary: {
            50: "#f2eafa",
            100: "#e4d4f4",
            200: "#c9a9e9",
            300: "#ae7ede",
            400: "#9353d3",
            500: "#7828c8",
            600: "#6020a0",
            700: "#481878",
            800: "#301050",
            900: "#180828",
            DEFAULT: "#7828c8",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#17c964",
            foreground: "#ffffff",
          },
          warning: {
            DEFAULT: "#f5a524",
            foreground: "#000000",
          },
          danger: {
            DEFAULT: "#f31260",
            foreground: "#ffffff",
          },
          content1: {
            DEFAULT: "#f8fafc",
            foreground: "#0f172a",
          },
        },
      },
      dark: {
        colors: {
          background: "#0f172a",
          foreground: "#f1f5f9",
          primary: {
            50: "#001731",
            100: "#002e62",
            200: "#004493",
            300: "#005bc4",
            400: "#006FEE",
            500: "#338ef7",
            600: "#66aaf9",
            700: "#99c7fb",
            800: "#cce3fd",
            900: "#e6f1fe",
            DEFAULT: "#3b82f6",
            foreground: "#ffffff",
          },
          secondary: {
            50: "#180828",
            100: "#301050",
            200: "#481878",
            300: "#6020a0",
            400: "#7828c8",
            500: "#9353d3",
            600: "#ae7ede",
            700: "#c9a9e9",
            800: "#e4d4f4",
            900: "#f2eafa",
            DEFAULT: "#a855f7",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#10b981",
            foreground: "#ffffff",
          },
          warning: {
            DEFAULT: "#f59e0b",
            foreground: "#000000",
          },
          danger: {
            DEFAULT: "#ef4444",
            foreground: "#ffffff",
          },
          content1: {
            DEFAULT: "#1e293b",
            foreground: "#f1f5f9",
          },
        },
      },
    },
  })],
};
export default config;

