'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
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
      y: 60,
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
      const scrollPosition = window.scrollY;
      
      // Only hide when scrolled past hero section (assuming hero is 100vh)
      if (scrollPosition > window.innerHeight * 0.3) {
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
      }
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
      className={`fixed left-1/2 bottom-12 -translate-x-1/2 z-50 hidden lg:block pointer-events-none ${className}`}
    >
      <div className="relative flex flex-col items-center gap-2">
        <div className="text-sm text-gray-500 font-light mb-2">Scroll to explore</div>
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#2E0854] to-[#9400D3] rounded-full opacity-50 blur-[1px]" />
        <div className="absolute bottom-0 w-[2px] h-12 bg-gradient-to-b from-[#2E0854] to-[#9400D3] rounded-full animate-pulse" />
      </div>
    </div>
  );
} 