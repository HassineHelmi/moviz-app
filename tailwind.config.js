/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f2",
          100: "#ffd7da",
          200: "#ffb1b6",
          300: "#ff858f",
          400: "#ff5c66",
          500: "#D7263D", // DEFAULT
          600: "#b51d30",
          700: "#8a1626",
          800: "#5f0f1a",
          900: "#3b0b10",
          DEFAULT: "#D7263D",
        },
        secondary: {
          50: "#fff9ec",
          100: "#fff2d1",
          200: "#ffe39a",
          300: "#ffd36b",
          400: "#ffc84a",
          500: "#FFC857", // DEFAULT
          600: "#e6ad48",
          700: "#b88736",
          800: "#866323",
          900: "#5a4120",
          DEFAULT: "#FFC857",
        },
        accent: {
          50: "#f1feff",
          100: "#d9fbff",
          200: "#aef7ff",
          300: "#73f0ff",
          400: "#2be0ff",
          500: "#00C2CB", // DEFAULT
          600: "#00a2a7",
          700: "#007b7c",
          800: "#005453",
          900: "#003230",
          DEFAULT: "#00C2CB",
        },
        light: {
          // primitives for light theme
          background: "#F6F7FB",
          surface: "#FFFFFF",
          subtle: "#F1F3F9",
          muted: "#E6E9F2",
          border: "#E2E8F0",
          text: "#0F172A",
          mutedText: "#475569",
        },
        dark: {
          // primitives for dark theme
          background: "#07080D",
          surface: "#0F1724",
          subtle: "#0B1220",
          muted: "#1B2430",
          border: "#16202B",
          text: "#E6EEF6",
          mutedText: "#A7B4C2",
        },
      },
    },
  },
  plugins: [],
}