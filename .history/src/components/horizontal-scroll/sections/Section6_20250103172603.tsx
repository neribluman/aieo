'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, BarChart2, Lightbulb } from 'lucide-react';

export function Section6() {
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
      <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
        >
          {/* Text Content */}
          <div className="w-full md:w-[40%] space-y-6">
            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                What is
                <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                  xFunnel?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mt-6">
                Navigate the AI Search Revolution with confidence. AI engines are changing how people discover solutions, but businesses lack visibility into their AI presence.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                xFunnel helps you understand and optimize how AI engines like ChatGPT, Claude, and Perplexity represent your brand.
              </p>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={false}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/60 
                         transition-all duration-200 group hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center
                               group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">{feature.title}</h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "AI Engine Analysis",
    description: "Monitor mentions across ChatGPT, Perplexity, Claude, and Gemini to understand your AI presence.",
    icon: <Search className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Competitive Intelligence",
    description: "Track your ranking vs competitors in AI responses and identify opportunities.",
    icon: <BarChart2 className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Actionable Insights",
    description: "Get clear steps to improve your AI presence and stay ahead of the curve.",
    icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
  },
]; 