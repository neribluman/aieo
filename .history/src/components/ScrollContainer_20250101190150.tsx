'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ScrollContainerProps {
  children: React.ReactNode[];
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Get scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll into horizontal movement
  const horizontalScrollProgress = useTransform(
    scrollYProgress,
    [0.33, 0.66], // Two points for horizontal scroll
    [0, -100] // Move one screen width left
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // If we're in the horizontal section
      if (currentSectionIndex === 1) {
        e.preventDefault();
        
        const nextScrollTop = e.deltaY > 0 
          ? Math.min(scrollTop + viewportHeight, viewportHeight * 2)
          : Math.max(scrollTop - viewportHeight, viewportHeight);

        setIsScrolling(true);
        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth'
        });

        setTimeout(() => {
          setIsScrolling(false);
          setCurrentSection(Math.floor(nextScrollTop / viewportHeight));
        }, 700);
      }

      setCurrentSection(currentSectionIndex);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isScrolling]);

  // Section labels
  const sectionLabels = ["Home", "Features", "Success Stories"];

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* First section - vertical */}
      <div className="h-screen w-full scroll-snap-align-start">
        {children[0]}
        {currentSection === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
            <span className="text-sm font-medium">Scroll down</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        )}
      </div>

      {/* Horizontal sections container */}
      <div className="h-screen w-full relative scroll-snap-align-start overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full flex"
          style={{ x: horizontalScrollProgress }}
        >
          {/* Second section */}
          <div className="w-screen h-full flex-shrink-0">
            {children[1]}
          </div>
          {/* Third section */}
          <div className="w-screen h-full flex-shrink-0">
            {children[2]}
          </div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => {
              const scrollTop = index * window.innerHeight;
              containerRef.current?.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
              });
              setCurrentSection(index);
            }}
            className="group flex items-center gap-2"
          >
            <span className="hidden group-hover:block text-sm text-gray-600 font-medium">
              {sectionLabels[index]}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-purple-600 scale-125' 
                  : 'bg-gray-300 hover:bg-purple-400'
              }`}
              aria-label={`Go to ${sectionLabels[index]}`}
            />
          </button>
        ))}
      </div>

      {/* Scroll direction indicator */}
      {currentSection === 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
          <span className="text-sm font-medium">Scroll horizontally</span>
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      )}
    </div>
  );
} 