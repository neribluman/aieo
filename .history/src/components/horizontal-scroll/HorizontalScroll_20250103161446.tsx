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
      // Set up responsive behavior
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1024px)": () => {
          const panels = gsap.utils.toArray<HTMLElement>(horizontal.children);
          const totalWidth = horizontal.scrollWidth;

          // Create the horizontal scroll animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top top",
              end: () => `+=${totalWidth - window.innerWidth}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              snap: {
                snapTo: 1 / (panels.length - 1),
                duration: { min: 0.1, max: 0.3 },
                ease: "power1.inOut"
              },
            }
          });

          // Animate the horizontal scroll
          tl.to(horizontal, {
            x: () => -(totalWidth - window.innerWidth),
            ease: "none",
          });

          // Add parallax effect to each section
          panels.forEach((panel, i) => {
            const images = panel.querySelectorAll("img");
            const texts = panel.querySelectorAll("h2, p");
            
            // Parallax for images
            images.forEach(img => {
              gsap.to(img, {
                xPercent: 20,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tl,
                  start: "left center",
                  scrub: true,
                  invalidateOnRefresh: true
                }
              });
            });

            // Fade in texts
            texts.forEach(text => {
              gsap.from(text, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                  trigger: text,
                  containerAnimation: tl,
                  start: "left center",
                  toggleActions: "play none none reverse"
                }
              });
            });
          });
        },
        // Mobile - vertical scroll
        "(max-width: 1023px)": () => {
          const panels = gsap.utils.toArray<HTMLElement>(horizontal.children);
          
          // Reset any transforms
          gsap.set(horizontal, { x: 0 });
          gsap.set(panels, { clearProps: "all" });

          // Create vertical scroll animations
          panels.forEach((panel, i) => {
            const images = panel.querySelectorAll("img");
            const texts = panel.querySelectorAll("h2, p");

            // Fade in and slide up for mobile
            gsap.from(panel, {
              opacity: 0,
              y: 100,
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                toggleActions: "play none none reverse"
              }
            });
          });
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
      className="relative min-h-screen overflow-hidden will-change-transform"
    >
      <div
        ref={horizontalRef}
        className="flex flex-col lg:flex-row absolute top-0 left-0 h-auto lg:h-screen will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
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
      className={`w-screen min-h-screen lg:h-screen flex-shrink-0 will-change-transform ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {children}
    </section>
  );
} 