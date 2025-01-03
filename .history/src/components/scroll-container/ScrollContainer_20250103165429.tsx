'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface ScrollIndicatorProps {
  className?: string;
}

function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.5,
    });

    // Initial state
    gsap.set(indicatorRef.current, { opacity: 0, y: 0 });

    // Animation sequence
    tl.to(indicatorRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(indicatorRef.current, {
      y: 100,
      duration: 1,
      ease: 'power1.inOut'
    })
    .to(indicatorRef.current, {
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });

    // Stop animation on scroll
    const handleScroll = () => {
      tl.kill();
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (indicatorRef.current) {
            indicatorRef.current.style.display = 'none';
          }
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={indicatorRef}
      className={`fixed left-1/2 bottom-8 -translate-x-1/2 z-50 hidden lg:block ${className}`}
    >
      <div className="relative flex flex-col items-center gap-2">
        <div className="w-[2px] h-16 bg-gradient-to-b from-[#2E0854] to-[#9400D3] rounded-full opacity-50 blur-[1px]" />
        <div className="absolute w-[2px] h-16 bg-gradient-to-b from-[#2E0854] to-[#9400D3] rounded-full animate-pulse" />
      </div>
    </div>
  );
}

interface ScrollContainerProps {
  children: React.ReactNode;
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the smoother
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper">
      <div ref={contentRef} className="smooth-content">
        {children}
      </div>
      <ScrollIndicator />
    </div>
  );
} 