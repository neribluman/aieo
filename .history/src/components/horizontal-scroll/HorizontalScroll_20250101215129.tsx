'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadSections = () => {
      setIsLoaded(true);
    };
    preloadSections();

    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const vertical = verticalRef.current;

    if (!container || !horizontal || !vertical) return;

    // Calculate the total width for horizontal scroll (all sections except the last one)
    const totalWidth = horizontal.offsetWidth;
    const sectionCount = horizontal.children.length;
    const sectionWidth = window.innerWidth;
    const horizontalDistance = sectionWidth * (sectionCount - 1);

    // Create horizontal scroll timeline
    const horizontalTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${horizontalDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        markers: false,
        onUpdate: (self) => {
          if (!self.isActive) return;
          gsap.set(horizontal, {
            x: -self.progress * horizontalDistance,
            force3D: true,
            immediateRender: true
          });
        },
        onComplete: () => {
          // Enable vertical scrolling only after horizontal is complete
          ScrollTrigger.create({
            trigger: vertical,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            markers: false,
          });
        }
      },
    });

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate dimensions
        const newSectionWidth = window.innerWidth;
        const newHorizontalDistance = newSectionWidth * (sectionCount - 1);
        
        // Update ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.kill(true);
        });
        
        // Reinitialize with new dimensions
        horizontalTl.invalidate().restart();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      horizontalTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split children into horizontal and vertical sections
  const childrenArray = React.Children.toArray(children);
  const horizontalSections = childrenArray.slice(0, 4); // First 4 sections for horizontal scroll
  const verticalSections = childrenArray.slice(4); // Section5 for vertical scroll

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div 
        ref={containerRef} 
        className="relative h-screen overflow-hidden"
        style={{ 
          visibility: isLoaded ? 'visible' : 'hidden',
          touchAction: 'none' // Prevent default touch behaviors
        }}
      >
        <div
          ref={horizontalRef}
          className="flex flex-nowrap absolute top-0 left-0 h-screen will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            WebkitPerspective: 1000,
          }}
        >
          {horizontalSections}
        </div>
      </div>
      <div
        ref={verticalRef}
        className="relative will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000,
        }}
      >
        {verticalSections}
      </div>
    </div>
  );
}

// Section component for consistent styling
export function Section({ 
  children,
  className = "",
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section 
      className={`w-screen h-screen flex-shrink-0 will-change-transform ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000,
      }}
    >
      {children}
    </section>
  );
} 