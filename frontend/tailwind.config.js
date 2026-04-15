/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accent-soft) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 12px 32px -18px rgb(15 23 42 / 0.3)",
        card: "0 24px 56px -30px rgb(15 23 42 / 0.4)",
        glow: "0 0 0 1px rgb(96 47 247 / 0.2), 0 20px 50px -24px rgb(96 47 247 / 0.55)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 50% 0%, rgba(96, 47, 247, 0.2) 0%, rgba(26, 27, 35, 0) 52%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 360ms ease-out both",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
