'use client';

import * as React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const mockCompanies = [
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
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      align: 'center',
      dragFree: true
    },
    [
      AutoScroll({ 
        speed: 0.5,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
  );

  // Create more sets for smoother infinite scroll
  const extendedCompanies = [...mockCompanies, ...mockCompanies, ...mockCompanies, ...mockCompanies, ...mockCompanies];

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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden touch-pan-y justify-center items-center">
          {extendedCompanies.map((company, index) => (
            <div 
              key={`${company.name}-${index}`}
              className="relative flex-[0_0_auto] min-w-0 px-4 md:px-6"
              style={{ 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-0"
              >
                <Card className="border-0 overflow-hidden relative group bg-transparent shadow-none">
                  <CardContent className="relative p-0 flex items-center justify-center h-24">
                    <div className="flex items-center justify-center w-full h-full">
                      <div className={`relative ${company.className}`}>
                        <Image
                          src={company.image}
                          alt={company.name}
                          fill
                          className="object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 [filter:grayscale(100%)]"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 