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
  },
  {
    name: "Analog Forever Ltd",
    tagline: "Because who needs digital transformation?",
    emoji: "📠",
  },
  {
    name: "Manual Analytics Inc",
    tagline: "Proudly counting beans since 1985",
    emoji: "🧮",
  },
  {
    name: "AI? No Way! Solutions",
    tagline: "We trust our gut, not algorithms",
    emoji: "🔮",
  },
  {
    name: "Dinosaur Data LLC",
    tagline: "Extinct methods, modern problems",
    emoji: "🦖",
  },
];

export function SarcasticCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full max-w-5xl mx-auto mt-20 px-4">
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
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockCompanies.map((company, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <CardContent className="flex flex-col aspect-[4/3] items-center justify-center p-6">
                    <span className="text-5xl mb-4">{company.emoji}</span>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500 italic text-center">
                      {company.tagline}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 