'use client';

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const companies = [
  {
    name: "Claude AI",
    image: "/images/Claude_AI_logo.svg.png",
    className: "w-72 h-16"
  },
  {
    name: "Google AI",
    image: "/images/Google-ai-overviews.svg",
    className: "w-80 h-16"
  },
  {
    name: "Google Gemini",
    image: "/images/Google_Gemini_logo.svg.png",
    className: "w-80 h-16"
  },
  {
    name: "OpenAI",
    image: "/images/OpenAI_Logo.svg.png",
    className: "w-72 h-16"
  },
  {
    name: "Perplexity AI",
    image: "/images/Perplexity_AI_logo.svg.png",
    className: "w-72 h-16"
  }
];

export function SarcasticCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <div className="w-full px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-0 mt-4"
      >
        <h2 className="text-base md:text-lg font-light tracking-wide text-gray-500">
          {/* Desktop version with flex layout */}
          <div className="hidden md:flex items-center justify-center gap-2">
            <span>Get analysis to all the AI Answer Engines</span>
          </div>
          
          {/* Mobile version - full sentence with proper wrapping */}
          <div className="md:hidden px-4 mx-auto max-w-[280px] leading-relaxed inline-flex flex-wrap justify-center items-center gap-1">
            <span>Get analysis to all the AI Answer Engines</span>
          </div>
        </h2>
      </motion.div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false,
          dragFree: true
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {[...companies, ...companies, ...companies].map((company, index) => (
            <CarouselItem key={`${company.name}-${index}`} className="pl-4 basis-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center"
              >
                <div className={`relative ${company.className}`}>
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 [filter:grayscale(100%)]"
                    priority={index < 2}
                  />
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 