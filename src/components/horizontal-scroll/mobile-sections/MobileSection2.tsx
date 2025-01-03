'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const metrics = [
  { label: "AI Engine Mentions" },
  { label: "Competitive Rankings" },
  { label: "Sentiment Analysis" },
  { label: "Feature Recognition" },
];

export function MobileSection2() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-24 -top-24 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Text Content */}
        <div className="space-y-6 text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900">
            Track Your
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              AI Presence
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Monitor mentions, rankings, and sentiment across multiple AI engines in real-time.
          </p>
        </div>

        {/* Metrics Cards - Grid Layout */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100/20">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{metric.label}</span>
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
          <div className="relative w-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
            <div className="relative w-full p-4">
              <div className="relative w-full h-full p-6 flex items-center justify-center">
                <Image
                  src="/images/Product(1)2.svg"
                  alt="Product tracking dashboard"
                  fill
                  className="object-contain rounded-xl shadow-lg p-4"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 