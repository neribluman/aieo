'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

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

export function MobileSection3() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-24 -top-24 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Text Content */}
        <div className="space-y-6 text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900">
            Master Every
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Buying Stage
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Track and optimize your presence across the entire AI-driven buying journey.
          </p>
        </div>

        {/* Stages - Horizontally Scrollable Cards */}
        <div className="flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-[280px] first:ml-0 snap-center"
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100/20">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{stage.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 relative"
        >
          <div className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative w-full p-4">
              <img
                src="/images/product(2)2.svg"
                alt="Buying journey analysis"
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 