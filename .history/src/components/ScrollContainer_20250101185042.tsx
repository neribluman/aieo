'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  // Smooth out the horizontal scroll animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400
  });

  // Transform vertical scroll into horizontal movement for sections 1 and 2
  const horizontalScrollProgress = useTransform(
    smoothProgress,
    [0.33, 0.66], // Map the middle section of the scroll (between 33% and 66%)
    ["0%", "-100%"] // Move 100% left (full width of one section)
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

        setTimeout(() => setIsScrolling(false), 800);
      }

      // Update current section
      if (scrollTop !== lastScrollTop) {
        setCurrentSection(currentSectionIndex);
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

        setTimeout(() => setIsScrolling(false), 800);
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
  }, [isScrolling]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* First section - vertical */}
      <div className="h-screen w-full scroll-snap-align-start">
        {children[0]}
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