import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { background } from "@/assets"
import { Link } from "@nextui-org/link"
import clsx from "clsx"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"

import { fontSans } from "@/config/fonts"
import { siteConfig } from "@/config/site"
import { routing } from "@/lib/i18n/navigation"
import Header from "@/components/common/header"
import { Navbar } from "@/components/navbar"

import { Providers } from "./providers"

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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

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
    <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <head />
      <NextIntlClientProvider messages={messages}>
        <body className={clsx("min-h-screen bg-background font-sans antialiased dark", fontSans.variable)}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="fixed inset-0 flex items-center justify-center">
              <Image className="object-contain" src={background} alt="inaash background" />
            </div>
            <div className="relative flex h-screen flex-col">
              <Header />
              <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
              <footer className="flex w-full items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage">
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
