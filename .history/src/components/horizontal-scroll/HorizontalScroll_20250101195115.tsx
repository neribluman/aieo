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

    // Calculate height needed for both horizontal scroll and final section
    const horizontalScrollHeight = distanceToScroll + window.innerHeight;

    // Set container height to include both horizontal scroll and final section
    gsap.set(container, {
      height: horizontalScrollHeight
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${horizontalScrollHeight}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (!self.isActive) return;
          
          // Calculate progress based on scroll position
          const progress = Math.min(self.progress, 1);
          
          // Apply horizontal movement
          gsap.set(horizontal, {
            x: -progress * distanceToScroll,
            force3D: true,
            immediateRender: true
          });
        },
        onLeave: () => {
          // When leaving the horizontal scroll section
          gsap.to(container, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        },
        onLeaveBack: () => {
          // When scrolling back up
          gsap.to(container, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        },
        onRefresh: () => {
          // Update dimensions on refresh with final section height
          const newDistanceToScroll = horizontal.offsetWidth - window.innerWidth;
          gsap.set(container, {
            height: newDistanceToScroll + window.innerHeight
          });
        }
      }
    });

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Update dimensions including final section height
        const newDistanceToScroll = horizontal.offsetWidth - window.innerWidth;
        gsap.set(container, {
          height: newDistanceToScroll + window.innerHeight
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