import { Fira_Code as FontMono } from "next/font/google"
import localFont from "next/font/local"
export const fontSans = localFont({
  src: [
    {
      path: "../fonts/IBMPlexSansArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },

    {
      path: "../fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
