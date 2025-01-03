'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollContainerProps {
  children: React.ReactNode[];
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Get scroll progress
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll into horizontal movement for sections 1 and 2
  const horizontalScrollProgress = useTransform(
    scrollYProgress,
    [0.33, 1], // Start horizontal scroll after first section (33%)
    [0, -200] // Move 200vw left (2 sections)
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // If we're past the first section, handle horizontal scrolling
      if (currentSectionIndex >= 1) {
        e.preventDefault();
        const nextScrollTop = scrollTop + (e.deltaY > 0 ? viewportHeight : -viewportHeight);
        
        setIsScrolling(true);
        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth'
        });

        setTimeout(() => setIsScrolling(false), 1000);
      }

      setCurrentSection(currentSectionIndex);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isScrolling]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* First section - vertical */}
      <div className="h-screen w-full scroll-snap-align-start">
        {children[0]}
      </div>

      {/* Horizontal sections container */}
      <motion.div 
        className="h-[200vh] relative" // 2 viewport heights for 2 horizontal sections
        style={{ scrollSnapAlign: 'start' }}
      >
        <motion.div 
          className="sticky top-0 h-screen flex overflow-visible"
          style={{ x: horizontalScrollProgress }}
        >
          {/* Second section */}
          <div className="min-w-screen h-full flex-shrink-0">
            {children[1]}
          </div>
          {/* Third section */}
          <div className="min-w-screen h-full flex-shrink-0">
            {children[2]}
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => {
              const scrollTop = index === 0 ? 0 : window.innerHeight;
              containerRef.current?.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
              });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-purple-600 scale-125' 
                : 'bg-gray-300 hover:bg-purple-400'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 