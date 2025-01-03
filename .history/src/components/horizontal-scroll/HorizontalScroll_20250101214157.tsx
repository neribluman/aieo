'use client';

import { useEffect, useRef, useState } from 'react';
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

    // Calculate the width of the horizontal scroll section (excluding the last section)
    const horizontalSections = horizontal.children;
    const totalWidth = Array.from(horizontalSections)
      .slice(0, -1) // Exclude the last section
      .reduce((width, section) => width + (section as HTMLElement).offsetWidth, 0);

    // Create the horizontal scroll timeline
    const horizontalTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 0.1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        markers: false,
        onUpdate: (self) => {
          if (!self.isActive) return;
          gsap.set(horizontal, {
            x: -self.progress * (totalWidth - window.innerWidth),
            force3D: true,
            immediateRender: true
          });
        },
      },
    });

    // Create the vertical scroll timeline for the last section
    const verticalTl = gsap.timeline({
      scrollTrigger: {
        trigger: vertical,
        start: () => `top+=${totalWidth} top`,
        end: "bottom bottom",
        scrub: 0.1,
        pin: false,
        markers: false,
      },
    });

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      horizontalTl.kill();
      verticalTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split children into horizontal and vertical sections
  const childrenArray = React.Children.toArray(children);
  const horizontalSections = childrenArray.slice(0, -1); // All but last section
  const verticalSection = childrenArray[childrenArray.length - 1]; // Last section

  return (
    <>
      <div 
        ref={containerRef} 
        className="relative min-h-screen overflow-hidden will-change-transform"
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
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
        className="relative w-full will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000,
        }}
      >
        {verticalSection}
      </div>
    </>
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