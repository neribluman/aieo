'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Text Content */}
          <div className="w-full md:w-1/3 space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 opacity-0">
              Track Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Presence
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 opacity-0">
              Monitor mentions, rankings, and sentiment across multiple AI engines in real-time.
            </p>

            <div className="flex flex-col gap-4 opacity-0">
              {metrics.map((metric, index) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-gray-700">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="w-full md:w-2/3 relative flex items-center justify-center h-[80vh] opacity-0">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20 hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <img
                    src="/images/product(1)2.svg"
                    alt="Product tracking dashboard"
                    className="w-full h-full object-contain rounded-xl shadow-lg"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const metrics = [
  { label: "AI Engine Mentions" },
  { label: "Competitive Rankings" },
  { label: "Sentiment Analysis" },
  { label: "Feature Recognition" },
]; 