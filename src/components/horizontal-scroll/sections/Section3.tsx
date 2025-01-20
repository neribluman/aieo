'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Section3() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-[90rem] mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12 py-6 pb-10"
        >
          {/* Product Screenshot */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[70%] relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-video flex items-center justify-center p-2">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20 hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  >
                    <source src="/videos/section3.webm" type="video/webm" />
                  </video>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="w-full md:w-[30%] space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Master Your
              <span className="block mt-2 pb-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Market
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Uncover deep insights across regions, verticals, and personas throughout the buying journey.
            </motion.p>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  initial={false}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{stage.label}</h3>
                      <p className="text-sm text-gray-500">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const stages = [
  {
    label: "Market Segmentation",
    description: "Map your audience across regions and verticals"
  },
  {
    label: "Persona Analysis",
    description: "Understand decision-maker behaviors"
  },
  {
    label: "Journey Mapping",
    description: "Track engagement at every touchpoint"
  },
  {
    label: "Market Fit",
    description: "Align offerings with market needs"
  },
  {
    label: "Growth Strategy",
    description: "Scale across new segments"
  }
]; 