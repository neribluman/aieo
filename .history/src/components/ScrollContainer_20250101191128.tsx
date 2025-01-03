'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface ScrollContainerProps {
  children: React.ReactNode[];
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useHorizontalScroll();
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const horizontalContainer = horizontalRef.current;
    if (!container || !horizontalContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // First section - vertical scroll
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
      // Update section based on horizontal scroll
      else if (currentSectionIndex === 1) {
        // Update current section based on scroll position
        if (horizontalContainer.scrollLeft > window.innerWidth / 2) {
          setCurrentSection(2);
        } else {
          setCurrentSection(1);
        }
      }
    };

    // Listen for horizontal scroll to update section
    const handleScroll = () => {
      if (horizontalContainer.scrollLeft > window.innerWidth / 2) {
        setCurrentSection(2);
      } else {
        setCurrentSection(1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    horizontalContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      horizontalContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  const handleNavClick = (index: number) => {
    if (!containerRef.current || !horizontalRef.current) return;
    
    setIsScrolling(true);
    
    if (index === 0) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      horizontalRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else if (index === 1) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
      horizontalRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else if (index === 2) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
      horizontalRef.current.scrollTo({
        left: window.innerWidth,
        behavior: 'smooth'
      });
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
      <div className="h-screen scroll-snap-align-start">
        <div 
          ref={horizontalRef}
          className="h-full flex overflow-x-auto hide-scrollbar scroll-smooth whitespace-nowrap"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Second section */}
          <div className="w-screen h-full flex-shrink-0 scroll-snap-align-start">
            {children[1]}
          </div>
          {/* Third section */}
          <div className="w-screen h-full flex-shrink-0 scroll-snap-align-start">
            {children[2]}
          </div>
        </div>
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
      {currentSection === 1 && horizontalRef.current?.scrollLeft === 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
          <span className="text-sm font-medium">Scroll right</span>
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      )}
    </div>
  );
} 