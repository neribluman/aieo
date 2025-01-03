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
          // Create a continuous scroll effect
          const sections = horizontal.children;
          const totalWidth = Array.from(sections).reduce((acc, section) => {
            const width = section.getBoundingClientRect().width;
            return acc + width - (width * 0.15); // 15% overlap
          }, 0);

          gsap.to(horizontal, {
            x: () => -(totalWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1.5, // Increased for smoother scrolling
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // Add parallax effect to sections
          Array.from(sections).forEach((section, i) => {
            const depth = i * 0.1; // Increasing parallax effect for each section
            gsap.to(section, {
              scale: 1 - depth,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                containerAnimation: ctx.data?.[0],
                start: "left center",
                end: "right center",
                scrub: true
              }
            });
          });
        },
        // Mobile
        "(max-width: 1023px)": () => {
          // Reset any transforms
          gsap.set(horizontal, { x: 0, clearProps: "all" });
        }
      });
    });

    return () => {
      ctx.revert(); // Clean up all animations and scroll triggers
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/10 to-transparent blur-3xl -top-1/4 -right-1/4" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/10 to-transparent blur-3xl -bottom-1/4 -left-1/4" />
      </div>
      
      <div
        ref={horizontalRef}
        className="flex flex-col lg:flex-row absolute top-0 left-0 h-auto lg:h-screen"
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
      className={`w-screen min-h-screen lg:h-screen flex-shrink-0 relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/50 to-transparent opacity-50 pointer-events-none" />
      {children}
    </section>
  );
} 