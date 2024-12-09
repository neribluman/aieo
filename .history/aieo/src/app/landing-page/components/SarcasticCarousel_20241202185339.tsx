'use client';

import * as React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const mockCompanies = [
  {
    name: "TechnoStuck Corp",
    tagline: "Still using Excel for AI predictions",
    emoji: "🤖",
    color: "from-blue-500/20 to-purple-500/20",
    image: "/images/1.png",
  },
  {
    name: "Analog Forever Ltd",
    tagline: "Because who needs digital transformation?",
    emoji: "📠",
    color: "from-purple-500/20 to-pink-500/20",
    image: "/images/2.svg",
  },
  {
    name: "Manual Analytics Inc",
    tagline: "Proudly counting beans since 1985",
    emoji: "🧮",
    color: "from-pink-500/20 to-red-500/20",
    image: "/images/3.png",
  },
  {
    name: "AI? No Way! Solutions",
    tagline: "We trust our gut, not algorithms",
    emoji: "🔮",
    color: "from-red-500/20 to-orange-500/20",
    image: "/images/4.svg.png",
  },
  {
    name: "Dinosaur Data LLC",
    tagline: "Extinct methods, modern problems",
    emoji: "🦖",
    color: "from-orange-500/20 to-yellow-500/20",
    image: "/images/5.svg.png",
  },
  {
    name: "Legacy Systems Co",
    tagline: "If it ain't broke, don't upgrade it",
    emoji: "🏛️",
    color: "from-yellow-500/20 to-green-500/20",
    image: "/images/6.svg.png",
  },
  {
    name: "Anti-Innovation Inc",
    tagline: "Proudly resisting change since 1982",
    emoji: "🚫",
    color: "from-green-500/20 to-teal-500/20",
    image: "/images/7.svg.png",
  },
  {
    name: "Manual Override Ltd",
    tagline: "Humans > Machines (we think)",
    emoji: "🔧",
    color: "from-teal-500/20 to-cyan-500/20",
    image: "/images/8.svg.png",
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
        speed: 1.5,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light text-gray-600">
          Join these companies in{" "}
          <span className="italic">not knowing</span> what AI thinks
        </h2>
      </motion.div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden touch-pan-y">
          {[...mockCompanies, ...mockCompanies].map((company, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
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
                className="p-1"
              >
                <Card className="border-0 overflow-hidden relative group bg-transparent shadow-none">
                  <CardContent className="relative aspect-[4/3] p-0">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        className="object-contain opacity-50 transition-all duration-300 group-hover:opacity-75"
                        priority={index < 2}
                      />
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