'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  onScrollComplete?: () => void;
}

export function HorizontalScroll({ children, onScrollComplete }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrollComplete, setIsScrollComplete] = useState(false);

  useEffect(() => {
    const preloadSections = () => {
      setIsLoaded(true);
    };

    preloadSections();

    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    const totalWidth = horizontal.offsetWidth;

    const tl = gsap.timeline({
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
        onLeave: (self) => {
          if (!isScrollComplete) {
            setIsScrollComplete(true);
            onScrollComplete?.();
            // Smoothly unpin
            gsap.to(container, {
              duration: 0.3,
              ease: "power2.inOut",
              pinSpacer: false,
            });
          }
        },
      },
    });

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onScrollComplete, isScrollComplete]);

  return (
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