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

    // Calculate total scroll width
    const totalWidth = horizontal.offsetWidth;
    const sectionWidth = window.innerWidth;
    const distanceToScroll = totalWidth - sectionWidth;

    // Set container height to include both horizontal scroll and Section4
    const totalScrollDistance = distanceToScroll + window.innerHeight;
    gsap.set(container, {
      height: totalScrollDistance
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalScrollDistance}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        pinSpacing: true,
        onUpdate: function(self) {
          if (!self.isActive) return;
          
          // Calculate normalized progress for horizontal scroll
          const horizontalProgress = Math.min(self.progress * (totalScrollDistance / distanceToScroll), 1);
          
          // Apply horizontal movement only during the first part of the scroll
          gsap.set(horizontal, {
            x: -horizontalProgress * distanceToScroll,
            force3D: true,
            immediateRender: true
          });
        },
        onLeave: function() {
          // When leaving horizontal scroll to Section4
          gsap.to(container, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        },
        onLeaveBack: function() {
          // When scrolling back up from Section4
          gsap.to(container, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        }
      }
    });

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newDistanceToScroll = horizontal.offsetWidth - window.innerWidth;
        const newTotalScrollDistance = newDistanceToScroll + window.innerHeight;
        gsap.set(container, {
          height: newTotalScrollDistance
        });
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
      className="relative overflow-hidden will-change-transform"
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