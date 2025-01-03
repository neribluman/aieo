'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ScrollContainerProps {
  children: React.ReactNode[];
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Get scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the horizontal scroll animation with less bounce
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.5
  });

  // Transform vertical scroll into horizontal movement
  const horizontalScrollProgress = useTransform(
    smoothProgress,
    [0.33, 0.66, 1], // Three points for two horizontal movements
    ["0%", "-100%", "-200%"] // Move two full screens left
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = 0;
    let isHorizontalScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // Determine if we're in the horizontal scroll section
      isHorizontalScrolling = currentSectionIndex === 1;

      if (isHorizontalScrolling) {
        e.preventDefault();
        
        // Calculate the next section based on scroll direction
        const scrollingDown = e.deltaY > 0;
        const nextScrollTop = scrollingDown 
          ? Math.min(scrollTop + viewportHeight, viewportHeight * 2)
          : Math.max(scrollTop - viewportHeight, viewportHeight);

        setIsScrolling(true);
        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth'
        });

        setTimeout(() => setIsScrolling(false), 1000);
      }

      // Update current section
      const newSection = Math.floor(scrollTop / viewportHeight);
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        lastScrollTop = scrollTop;
      }
    };

    // Handle touch events for mobile
    let touchStart = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchEnd = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStart - touchEnd;
      const deltaY = touchStartY - touchEndY;
      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // If we're in the horizontal section and horizontal swipe is stronger than vertical
      if (currentSectionIndex === 1 && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        
        const nextScrollTop = deltaX > 0 
          ? Math.min(scrollTop + viewportHeight, viewportHeight * 2)
          : Math.max(scrollTop - viewportHeight, viewportHeight);

        setIsScrolling(true);
        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth'
        });

        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrolling, currentSection]);

  // Section labels
  const sectionLabels = ["Home", "Features", "Success Stories"];

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar relative"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* First section - vertical */}
      <div className="h-screen w-full scroll-snap-align-start relative">
        {children[0]}
        {/* Section indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
          <span className="text-sm font-medium">Scroll down</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Horizontal sections container */}
      <div 
        ref={horizontalRef}
        className="h-screen w-full relative scroll-snap-align-start overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 left-0 h-full flex"
          style={{ x: horizontalScrollProgress }}
        >
          {/* Second section */}
          <div className="w-screen h-full flex-shrink-0 relative">
            {children[1]}
          </div>
          {/* Third section */}
          <div className="w-screen h-full flex-shrink-0 relative">
            {children[2]}
          </div>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="fixed left-8 top-8 z-50 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <span className="text-sm font-medium text-gray-600">
          {sectionLabels[currentSection]}
        </span>
      </div>

      {/* Navigation dots with labels */}
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