"use client"
import { firstPartner, secondPartner, thirdPartner } from "@/assets"
import { useIsRTL } from "@/hooks/use-is-rtl"
import EmblaCarousel from "@/lib/embla/carousel-wrapper"
import React from "react"
import AutoScroll from "embla-carousel-auto-scroll"

type Props = {}

const PartnersSlider = (props: Props) => {
  const isRTL = useIsRTL()

  return (
    <div>
      <EmblaCarousel
        slides={[
          <div
            key={"1"}
            className="embla__slide flex aspect-square shrink-0 items-center justify-center rounded-xl bg-white p-2 h-28">
            <img className="h-full" src={firstPartner.src} alt="partner" />
          </div>,
          <div
            key={2}
            className="embla__slide flex shrink-0 items-center justify-center rounded-xl bg-white p-2 h-28">
            {/* <img className="hidden h-full md:block" src={secondPartner.src} alt="partner" /> */}
            <img className="block h-full" src={secondPartner.src} alt="partner" />
          </div>,
          <div
            key={3}
            className="embla__slide flex aspect-square shrink-0 items-center justify-center rounded-xl bg-white p-2 h-28">
            <img className="h-full" src={thirdPartner.src} alt="partner" />
          </div>,
        ]}
        options={{ direction: isRTL ? "rtl" : "ltr", loop: true, align: "start" }}
        plugins={[
          AutoScroll({ speed: 1, playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false }),
        ]}
      />
    </div>
  )
}

export default PartnersSlider
