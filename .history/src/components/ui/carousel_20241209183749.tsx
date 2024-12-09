"use client"

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface CarouselProps {
  children: React.ReactNode[]
  autoplay?: boolean
  loop?: boolean
}

export function Carousel({ children, autoplay = true, loop = true }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop },
    autoplay ? [Autoplay()] : []
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        onClick={scrollPrev}
      >
        ←
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        onClick={scrollNext}
      >
        →
      </button>
    </div>
  )
}

export function CarouselSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-[0_0_100%] min-w-0">
      {children}
    </div>
  )
} 