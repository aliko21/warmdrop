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
        primary: {
          DEFAULT: "#C8A97E",
          light: "#D9BF9F",
          dark: "#A88B60",
        },
        brand: {
          DEFAULT: "#2B1F1A",
          secondary: "#3D2D27",
          tertiary: "#4E3C35",
        },
        background: {
          DEFAULT: "#F7F3EE",
          muted: "#EEE8E0",
        },
        accent: {
          DEFAULT: "#E7D3B5",
          light: "#F0E4CC",
        },
        cream: "#FAF7F2",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
      },
      backgroundImage: {
        "warm-gradient":
          "linear-gradient(135deg, #2B1F1A 0%, #4E3C35 50%, #2B1F1A 100%)",
        "hero-overlay":
          "linear-gradient(to left, transparent 30%, rgba(43,31,26,0.7) 60%, #2B1F1A 90%)",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(43, 31, 26, 0.10)",
        "warm-lg": "0 8px 48px rgba(43, 31, 26, 0.16)",
        glow: "0 0 40px rgba(200, 169, 126, 0.35)",
        "glow-sm": "0 0 20px rgba(200, 169, 126, 0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
