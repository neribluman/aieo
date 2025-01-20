'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    // Save initial styles for cleanup
    ScrollTrigger.saveStyles([container, horizontal]);

    // Create context for cleanup
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1024px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 0.1,
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true
            }
          });

          // Use timeline for smoother animation
          tl.to(horizontal, {
            x: () => -(horizontal.scrollWidth - window.innerWidth),
            ease: "none"
          });
        },
        // Mobile
        "(max-width: 1023px)": () => {
          gsap.set(horizontal, { x: 0, clearProps: "all" });
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="flex flex-col lg:flex-row absolute top-0 left-0 h-auto lg:h-screen will-change-transform"
        style={{ 
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
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
      className={`w-screen min-h-screen lg:h-screen flex-shrink-0 ${className}`}
    >
      {children}
    </section>
  );
} 