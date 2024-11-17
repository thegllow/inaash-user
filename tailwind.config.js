import { nextui } from "@nextui-org/theme"
import fluid, { extract, fontSize, screens } from "fluid-tailwind" // Tailwind's default screens, in `rem`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(accordion|button|card|chip|code|divider|image|input|kbd|link|listbox|navbar|radio|snippet|toggle|tabs|ripple|spinner|popover).js",
  ],
  content: {
    files: [
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    extract,
  },
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize,
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      colors: {
        primary: "#1AD0D1",
        secondary: "#9F5FFE",
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
    fluid(),
    nextui({
      layout: {
        radius: {
          small: "4px", // rounded-small
          medium: "8px", // rounded-medium
          large: "16px", // rounded-large
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
