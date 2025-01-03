'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Section5() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const router = useRouter();

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }

    // Add scroll listener for transition
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
      const threshold = window.innerHeight * 0.7; // 70% of viewport height
      
      if (rect.top < threshold) {
        router.push('/pricing');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView, hasAnimated, router]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-white p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <motion.div
        initial={false}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-8 max-w-4xl relative"
      >
        <h2 className="text-4xl md:text-5xl font-light text-gray-900">
          Ready to
          <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
            Get Started?
          </span>
        </h2>
        
        <p className="text-xl text-gray-600">
          Choose the perfect plan for your needs
        </p>

        <motion.div
          animate={hasAnimated ? {
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
          className="mt-12"
        >
          <ChevronDown className="w-12 h-12 text-purple-600 opacity-50" />
        </motion.div>
      </motion.div>
    </div>
  );
} 