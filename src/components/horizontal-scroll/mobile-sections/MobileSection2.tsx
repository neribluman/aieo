'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Lightbulb, Target, Trophy } from 'lucide-react';

const metrics = [
  { 
    label: "Query Intelligence",
    description: "Smart analysis of AI responses",
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />
  },
  { 
    label: "Brand Perception",
    description: "How AI views your brand",
    icon: <LineChart className="w-5 h-5 text-purple-600" />
  },
  { 
    label: "Market Position",
    description: "Your standing in AI results",
    icon: <Target className="w-5 h-5 text-purple-600" />
  },
  { 
    label: "Competitive Edge",
    description: "Lead in AI recommendations",
    icon: <Trophy className="w-5 h-5 text-purple-600" />
  },
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
        <div className="w-full max-w-3xl mx-auto px-4 py-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-gray-900">
              Track Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Presence
              </span>
            </h2>
            
            <p className="text-lg text-gray-600">
              Analyze thousands of tailored queries monthly to reveal how AI truly perceives your brand.
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
                <source src="/videos/section2.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100/20 h-full hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  <div className="flex flex-col gap-2">
                    <div className="p-2 bg-purple-50 rounded-lg w-fit">
                      {metric.icon}
                    </div>
                    <h3 className="font-medium text-gray-900">{metric.label}</h3>
                    <p className="text-sm text-gray-500">{metric.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 