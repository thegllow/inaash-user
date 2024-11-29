import React, { useRef } from "react"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  plugins?: EmblaPluginType[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, plugins } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

  return (
    <div className="embla overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex items-stretch gap-5 lg:gap-8">{slides}</div>
      </div>
    </div>
  )
}

export default EmblaCarousel
