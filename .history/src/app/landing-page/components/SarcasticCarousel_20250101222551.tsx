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
  },
  {
    name: "Google AI",
    image: "/images/Google-ai-overviews.png",
  },
  {
    name: "Google Gemini",
    image: "/images/Google_Gemini_logo.svg.png",
  },
  {
    name: "OpenAI",
    image: "/images/OpenAI_Logo.svg.png",
  },
  {
    name: "Perplexity AI",
    image: "/images/Perplexity_AI_logo.svg.png",
  }
];

export function SarcasticCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      align: 'start'
    },
    [
      AutoScroll({ 
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden touch-pan-y">
          {[...mockCompanies, ...mockCompanies].map((company, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] min-w-0 md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
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
                  <CardContent className="relative aspect-[16/6] p-0">
                    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                      <div className="relative w-64 h-24">
                        <Image
                          src={company.image}
                          alt={company.name}
                          fill
                          className="object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
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