'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center p-8 will-change-transform relative overflow-visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Overlapping gradient elements */}
      <div className="absolute -right-[25%] top-[10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-[25%] bottom-[10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl" />
      
      {/* Connecting element to next section */}
      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-32 h-32">
        <div className="w-full h-full bg-gradient-to-r from-[#2E0854] to-[#9400D3] opacity-10 blur-2xl rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Text Content */}
          <div className="w-full md:w-1/3 space-y-6 relative">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Track Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Presence
              </span>
            </h2>
            
            <p className="text-lg text-gray-600">
              Monitor mentions, rankings, and sentiment across multiple AI engines in real-time.
            </p>

            <div className="flex flex-col gap-4">
              {metrics.map((metric, index) => (
                <div 
                  key={metric.label} 
                  className="flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-gray-700">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Screenshot with continuous flow effect */}
          <div className="w-full md:w-2/3 relative flex items-center justify-center h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center p-4 transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <img
                    src="/images/product(1)2.svg"
                    alt="Product tracking dashboard"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  {/* Dynamic overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-gradient-x pointer-events-none" />
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