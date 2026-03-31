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
        bg: "#090b10",
        surface: "#11141b",
        line: "#1c2533",
        text: "#e8ecf1",
        muted: "#9ea9bc",
        accent: "#7dd3fc",
      },
      boxShadow: {
        panel: "0 10px 35px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.08" },
          "50%": { opacity: "0.2" },
        },
        typing: {
          "0%": { width: "0ch" },
          "100%": { width: "11ch" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        drift: "drift 12s ease-in-out infinite",
        pulseLine: "pulseLine 6s ease-in-out infinite",
        typing: "typing 2.2s steps(11, end) 0.2s 1 forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
