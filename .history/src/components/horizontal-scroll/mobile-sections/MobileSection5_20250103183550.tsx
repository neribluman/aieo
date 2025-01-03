'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, Lightbulb } from 'lucide-react';

const features = [
  {
    title: "AI Engine Analysis",
    description: "Monitor mentions across ChatGPT, Perplexity, Claude, and Gemini to understand your AI presence.",
    icon: <Search className="w-5 h-5 text-purple-600" />
  },
  {
    title: "Competitive Intelligence",
    description: "Track your ranking vs competitors in AI responses and identify opportunities.",
    icon: <BarChart2 className="w-5 h-5 text-purple-600" />
  },
  {
    title: "Actionable Insights",
    description: "Get clear recommendations to improve your visibility in AI responses.",
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />
  }
];

export function MobileSection5() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-50 py-16 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <motion.div 
        className="absolute -right-24 -top-24 w-48 h-48 bg-purple-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -left-24 -bottom-24 w-48 h-48 bg-indigo-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Text Content */}
        <div className="space-y-6 mb-12">
          <div className="relative">
            <h2 className="text-3xl font-light text-gray-900 tracking-tight">
              What is{' '}
              <motion.span 
                className="inline-block font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                x<span className="italic">f</span>unnel?
              </motion.span>
            </h2>
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 z-[-1] bg-gradient-to-r from-purple-100 to-indigo-100 opacity-[0.7] blur-lg"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <div className="space-y-4">
            <p className="text-base text-gray-600">
              Navigate the AI Search Revolution with confidence. AI engines are changing how people discover solutions, but businesses lack visibility into their AI presence.
            </p>
            <p className="text-base text-gray-600">
              xFunnel helps you understand and optimize how AI engines like ChatGPT, Claude, and Perplexity represent your brand.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-4 rounded-xl transition-all duration-200"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Card Content */}
                <div className="relative flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center
                             shadow-lg shadow-purple-100/50 group-hover:bg-purple-200 transition-colors duration-200 shrink-0"
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg group-hover:text-purple-900 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 