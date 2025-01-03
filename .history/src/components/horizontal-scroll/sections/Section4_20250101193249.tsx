'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function Section4() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-8 will-change-transform"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Ready to
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Transform Your Product?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-white/60 border border-purple-100 hover:border-purple-200 transition-colors duration-200"
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitPerspective: 1000,
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Start Your Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of companies using our AI-powered insights to improve their products and market presence.
              </p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-white rounded-lg hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300">
                Get Started
              </button>
            </motion.div>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/60 border border-purple-100 hover:border-purple-200 transition-colors duration-200"
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitPerspective: 1000,
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Book a Demo
              </h3>
              <p className="text-gray-600 mb-6">
                See how our AI technology can specifically benefit your product with a personalized demo.
              </p>
              <button className="w-full px-6 py-3 border-2 border-[#2E0854] text-[#2E0854] rounded-lg hover:bg-[#2E0854] hover:text-white transition-all duration-300">
                Schedule Demo
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex flex-col items-center mt-12"
          >
            <span className="text-gray-600 mb-4">Continue exploring</span>
            <ArrowDown className="w-6 h-6 text-[#2E0854] animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 