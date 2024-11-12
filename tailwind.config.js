import { nextui } from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      colors: {
        primary: "#1AD0D1",
        white: "#BEB7C8",
        black: "#2E2A33",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "6px", // rounded-small
          medium: "16px", // rounded-medium
          large: "24px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {},
        dark: {
          colors: {
            background: "#1A1919",
          },
        },
      },
    }),
  ],
}
