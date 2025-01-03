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
  const [horizontalDistance, setHorizontalDistance] = useState(0);

  // Get scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Much gentler spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 1
  });

  // Transform vertical scroll into horizontal movement with more precise control
  const horizontalScrollProgress = useTransform(
    smoothProgress,
    [0.33, 0.49, 0.51, 0.66], // More precise breakpoints
    ["0%", "0%", "-100%", "-100%"] // Stable positions
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;
    let isInTransition = false;

    const updateSection = (scrollTop: number) => {
      const viewportHeight = window.innerHeight;
      const rawSection = scrollTop / viewportHeight;
      const newSection = Math.round(rawSection); // Round to nearest section
      
      if (newSection !== currentSection && !isInTransition) {
        setCurrentSection(newSection);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || isInTransition) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollTop / viewportHeight);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Determine scroll direction
      const isScrollingDown = e.deltaY > 0;
      const isHorizontalSection = currentSection === 1;

      if (isHorizontalSection) {
        e.preventDefault();

        // Handle horizontal scrolling
        const newDistance = horizontalDistance + (isScrollingDown ? 1 : -1);
        if (newDistance >= 0 && newDistance <= 1) {
          setHorizontalDistance(newDistance);
          setIsScrolling(true);
          isInTransition = true;

          // Update section after horizontal scroll
          setTimeout(() => {
            isInTransition = false;
            setIsScrolling(false);
          }, 800);
        } else if (isScrollingDown && newDistance > 1) {
          // Move to next vertical section
          container.scrollTo({
            top: viewportHeight * 2,
            behavior: 'smooth'
          });
        } else if (!isScrollingDown && newDistance < 0) {
          // Move to previous vertical section
          container.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } else {
        // Handle vertical scrolling
        const nextScrollTop = isScrollingDown
          ? Math.min(scrollTop + viewportHeight, viewportHeight * 2)
          : Math.max(scrollTop - viewportHeight, 0);

        setIsScrolling(true);
        isInTransition = true;

        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth'
        });

        // Update section after scroll completes
        setTimeout(() => {
          isInTransition = false;
          setIsScrolling(false);
          updateSection(nextScrollTop);
        }, 800);
      }
    };

    // Touch handling with improved precision
    let touchStart = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling || isInTransition) return;

      const touchEnd = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStart - touchEnd;
      const deltaY = touchStartY - touchEndY;
      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;

      if (currentSection === 1 && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();

        // Calculate horizontal movement
        const movement = deltaX / window.innerWidth;
        const newDistance = horizontalDistance + movement;

        if (newDistance >= 0 && newDistance <= 1) {
          setHorizontalDistance(newDistance);
        }
      }
    };

    const handleTouchEnd = () => {
      if (currentSection === 1) {
        // Snap to nearest section
        const targetDistance = Math.round(horizontalDistance);
        setHorizontalDistance(targetDistance);
      }
    };

    // Event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling, currentSection, horizontalDistance]);

  // Section labels
  const sectionLabels = ["Home", "Features", "Success Stories"];

  const handleNavClick = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsScrolling(true);
    
    if (index === 1) {
      // Reset horizontal distance when navigating to features
      setHorizontalDistance(0);
    }

    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsScrolling(false);
      setCurrentSection(index);
    }, 800);
  };

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
        {currentSection === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500">
            <span className="text-sm font-medium">Scroll down</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        )}
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
            onClick={() => handleNavClick(index)}
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