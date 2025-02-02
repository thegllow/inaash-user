"use client"
import EmblaCarousel from "@/lib/embla/carousel-wrapper"
import { useTranslations } from "next-intl"
import React from "react"
import AutoScroll from "embla-carousel-auto-scroll"
import { useIsRTL } from "@/hooks/use-is-rtl"

type Props = {}

const WhyUs = (props: Props) => {
  const t = useTranslations("about-us.why-us")

  const slidesContent = Array(8).fill("")
  const slides = slidesContent.map((slideContent, index) => {
    return (
      <div
        key={slideContent + index}
        className="embla__slide flex shrink-0 items-center justify-center bg-[#1D1B1B] px-10 text-slate-50 ~h-24/32">
        {t(("reasons." + index) as "reasons.0")}
      </div>
    )
  })

  const isRTL = useIsRTL()
  return (
    <main className="container mx-auto max-w-7xl flex-grow px-6">
      <section className="w-full ~py-14/24 ~/md:~gap-5/10 md:flex-row md:~px-10/20">
        <div className="w-full space-y-12 text-center">
          <div className="mx-auto w-full max-w-sm space-y-1">
            <h2 className="font-medium text-foreground lg:text-2xl">{t("title")}</h2>
            <p className="text-sm text-default-500">{t("description")}</p>
          </div>
          <div>
            <EmblaCarousel
              slides={slides}
              options={{ direction: isRTL ? "rtl" : "ltr", loop: true, align: "start" }}
              plugins={[
                AutoScroll({ speed: 1, playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false }),
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default WhyUs
