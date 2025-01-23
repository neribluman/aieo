'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stages = [
  {
    label: "Market Segmentation",
    description: "Map your audience across regions and verticals"
  },
  {
    label: "Persona Analysis",
    description: "Understand decision-maker behaviors"
  },
  {
    label: "Journey Mapping",
    description: "Track engagement at every touchpoint"
  },
  {
    label: "Market Fit",
    description: "Align offerings with market needs"
  },
  {
    label: "Growth Strategy",
    description: "Scale across new segments"
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
            Boost Your
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              AI Visibility
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Enhance your AI search visibility with deep insights across regions, verticals, and personas throughout the buying journey.
          </p>
        </div>

        {/* Video Container */}
        <div className="w-full aspect-video bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20 mb-16">
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/videos/section3.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.label} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{stage.label}</h3>
                <p className="text-sm text-gray-500">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 