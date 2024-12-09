'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const mockCompanies = [
  {
    name: "TechnoStuck Corp",
    tagline: "Still using Excel for AI predictions",
    emoji: "🤖",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    name: "Analog Forever Ltd",
    tagline: "Because who needs digital transformation?",
    emoji: "📠",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    name: "Manual Analytics Inc",
    tagline: "Proudly counting beans since 1985",
    emoji: "🧮",
    color: "from-pink-500/20 to-red-500/20"
  },
  {
    name: "AI? No Way! Solutions",
    tagline: "We trust our gut, not algorithms",
    emoji: "🔮",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    name: "Dinosaur Data LLC",
    tagline: "Extinct methods, modern problems",
    emoji: "🦖",
    color: "from-orange-500/20 to-yellow-500/20"
  },
];

export function SarcasticCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
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

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockCompanies.map((company, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-1"
              >
                <Card className="border-0 overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-300" />
                  
                  <CardContent className="relative flex flex-col aspect-[4/3] items-center justify-center p-6">
                    <span className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {company.emoji}
                    </span>
                    <motion.h3 
                      className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                    >
                      {company.name}
                    </motion.h3>
                    <p className="text-sm text-gray-500 italic text-center group-hover:text-gray-700 transition-colors duration-300">
                      {company.tagline}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 