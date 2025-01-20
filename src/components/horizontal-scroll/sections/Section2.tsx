'use client';

import { useRef, useEffect } from 'react';
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

export function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6 will-change-transform relative overflow-hidden"
      style={{ 
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Background Elements - Reduced blur intensity */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-lg" />
      <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-lg" />

      <div className="max-w-[90rem] mx-auto w-full relative">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-[30%] space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Track Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Presence
              </span>
            </h2>
            
            <p className="text-lg text-gray-600">
              Analyze thousands of tailored queries monthly to reveal how AI truly perceives your brand.
            </p>

            {/* Metrics Grid - Optimized animations */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ 
                    opacity: 1,
                    transition: { delay: index * 0.1, duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                  className="group transform-gpu"
                >
                  <div className="bg-white/80 p-4 rounded-xl shadow-md border border-purple-100/20 h-full 
                                transition-all duration-200 hover:-translate-y-1 transform-gpu">
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

          {/* Product Screenshot */}
          <div className="w-full md:w-[70%] relative flex items-center justify-center transform-gpu">
            <div className="relative w-full aspect-video flex items-center justify-center">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-xl overflow-hidden border border-purple-100/20 
                            transition-shadow duration-300 transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay={false}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 