'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Section3() {
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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 py-6 pb-10"
        >
          {/* Product Screenshot */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[85%] relative flex items-center justify-center"
          >
            <div className="w-full bg-white rounded-xl shadow-xl">
              <img
                src="/images/product(1).svg"
                alt="Buying journey analysis"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="w-full md:w-1/3 space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Master Every
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Buying Stage
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Track and optimize your presence across the entire AI-driven buying journey.
            </motion.p>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  initial={false}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{stage.label}</h3>
                      <p className="text-sm text-gray-500">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const stages = [
  {
    label: "Problem Exploration",
    description: "How users discover and define their needs"
  },
  {
    label: "Solution Education",
    description: "Learning about available solutions"
  },
  {
    label: "Solution Comparison",
    description: "Evaluating different options"
  },
  {
    label: "Feature Evaluation",
    description: "Deep diving into capabilities"
  },
  {
    label: "User Feedback",
    description: "Understanding user experiences"
  }
]; 