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
  const [horizontalScroll, setHorizontalScroll] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // First section - handle vertical scroll to middle section
      if (currentSectionIndex === 0 && e.deltaY > 0) {
        e.preventDefault();
        setIsScrolling(true);
        container.scrollTo({
          top: viewportHeight,
          behavior: 'smooth'
        });
        setCurrentSection(1);
        setTimeout(() => setIsScrolling(false), 700);
      }
      // Middle section - handle horizontal scroll
      else if (currentSectionIndex === 1) {
        e.preventDefault();
        if (horizontalScroll === 0 && e.deltaY > 0) {
          // Scroll right to third section
          setHorizontalScroll(1);
          setCurrentSection(2);
        } else if (horizontalScroll === 1 && e.deltaY < 0) {
          // Scroll left back to second section
          setHorizontalScroll(0);
          setCurrentSection(1);
        } else if (e.deltaY < 0) {
          // Scroll up to first section
          container.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          setCurrentSection(0);
        }
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 700);
      }
      // Last section - handle vertical scroll
      else if (currentSectionIndex === 1 && horizontalScroll === 1) {
        if (e.deltaY < 0) {
          e.preventDefault();
          setHorizontalScroll(0);
          setCurrentSection(1);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 700);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isScrolling, horizontalScroll]);

  // Handle navigation dot clicks
  const handleNavClick = (index: number) => {
    if (!containerRef.current) return;
    
    setIsScrolling(true);
    
    if (index === 0) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setHorizontalScroll(0);
    } else if (index === 1) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
      setHorizontalScroll(0);
    } else if (index === 2) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
      setHorizontalScroll(1);
    }
    
    setCurrentSection(index);
    setTimeout(() => setIsScrolling(false), 700);
  };

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
          animate={{ x: horizontalScroll ? '-100%' : '0%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            onClick={() => handleNavClick(index)}
            className="group flex items-center gap-2"
          >
            <span className="hidden group-hover:block text-sm text-gray-600 font-medium">
              {index === 0 ? "Home" : index === 1 ? "Features" : "Success Stories"}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-purple-600 scale-125' 
                  : 'bg-gray-300 hover:bg-purple-400'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          </button>
        ))}
      </div>

      {/* Scroll direction indicators */}
      {currentSection === 1 && !horizontalScroll && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
          <span className="text-sm font-medium">Scroll right</span>
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      )}
    </div>
  );
} 