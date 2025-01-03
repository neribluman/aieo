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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadSections = () => {
      setIsLoaded(true);
    };
    preloadSections();

    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    // Calculate total scroll width with buffer
    const totalWidth = horizontal.offsetWidth;
    const sectionWidth = window.innerWidth;
    const distanceToScroll = totalWidth - sectionWidth;
    
    // Add 20% buffer to ensure complete scroll
    const scrollDistance = distanceToScroll * 1.2;

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.5, // Increased from 0.1 to make it less responsive
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        pinSpacing: true,
        markers: false, // Helpful for debugging
        onUpdate: function(self) {
          if (!self.isActive) return;
          
          // Normalize progress to account for buffer
          const progress = Math.min((self.progress * scrollDistance) / distanceToScroll, 1);
          gsap.set(horizontal, {
            x: -progress * distanceToScroll,
            force3D: true,
            immediateRender: true
          });
        },
        onLeave: function() {
          // Only trigger when fully scrolled
          if (Math.abs(this.progress - 1) < 0.01) {
            ScrollTrigger.refresh();
          }
        },
        onLeaveBack: function() {
          // Only trigger when fully scrolled back
          if (Math.abs(this.progress) < 0.01) {
            ScrollTrigger.refresh();
          }
        }
      }
    });

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden will-change-transform h-screen"
      style={{ 
        visibility: isLoaded ? 'visible' : 'hidden',
        zIndex: 1
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
        {children}
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