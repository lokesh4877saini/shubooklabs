/** @type {import('tailwindcss').Config} */

module.exports = {

content: [
  "./*.html",

  "./about/**/*.html",
  "./services/**/*.html",
  "./studio-rent/**/*.html",
  "./podcast-with-us/**/*.html",
  "./portfolio/**/*.html",
  "./contact/**/*.html",
  "./policies/**/*.html",

  "./_layouts/**/*.html",
  "./_includes/**/*.html",

  "./_posts/**/*.html",

  "./assets/js/**/*.js"
],

darkMode: "class",

theme: {
extend: {

  colors: {

    dark: {
      bg: "#0B1120",
      card: "#111827",
      surface: "#1F2937",
      border: "#374151",
    },

    brand: {
      light: "#60A5FA",
      DEFAULT: "#3B82F6",
      dark: "#2563EB",
      glow: "#93C5FD",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#CBD5E1",
      muted: "#94A3B8",
    }
  },

  backgroundImage: {

    "brand-gradient":
      "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)",

    "brand-shine":
      "linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)",

    "hero-gradient":
      "linear-gradient(180deg, #0B1120 0%, #111827 60%, #0B1120 100%)",

    "card-gradient":
      "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
  },

  boxShadow: {

    glow:
      "0 0 30px rgba(59,130,246,0.35)",

    "glow-lg":
      "0 0 60px rgba(59,130,246,0.25)",
  },

  keyframes: {

    shimmer: {
      "0%": {
        backgroundPosition: "-200% 0",
      },

      "100%": {
        backgroundPosition: "200% 0",
      },
    },

    spinSlow: {
      from: {
        transform: "rotate(0deg)",
      },

      to: {
        transform: "rotate(360deg)",
      },
    },

    spinSlowReverse: {
      from: {
        transform: "rotate(360deg)",
      },

      to: {
        transform: "rotate(0deg)",
      },
    },

    float: {
      "0%,100%": {
        transform: "translateY(0px)",
      },

      "50%": {
        transform: "translateY(-12px)",
      },
    }
  },

  animation: {

    shimmer:
      "shimmer 2s linear infinite",

    "spin-slow":
      "spinSlow 20s linear infinite",

    "spin-slow-reverse":
      "spinSlowReverse 30s linear infinite",

    float:
      "float 6s ease-in-out infinite",
  }
}

},

plugins: [],
}