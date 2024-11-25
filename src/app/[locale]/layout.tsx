import "@/styles/globals.css"

import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { fontSans } from "@/config/fonts"
import { siteConfig } from "@/config/site"
import NySessionProvider from "@/lib/auth/provider"
import { routing } from "@/lib/i18n/routing"

import { Providers } from "./providers"
import ScreenIndicator from "@/components/common/screen-indecator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const dynamicParams = false

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const messages = await getMessages()
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={["ar", "ur"].includes(locale) ? "rtl" : "ltr"}
      className="dark">
      <head />
      <NextIntlClientProvider messages={messages}>
        <NuqsAdapter>
          <NySessionProvider>
            <body
              className={clsx("min-h-screen bg-background font-sans antialiased dark", fontSans.variable)}>
              <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>{children}</Providers>
              <ScreenIndicator />
            </body>
          </NySessionProvider>
        </NuqsAdapter>
      </NextIntlClientProvider>
    </html>
  )
}
