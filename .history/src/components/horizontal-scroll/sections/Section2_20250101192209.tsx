'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Section2() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 will-change-transform">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Powered by
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Advanced AI Technology
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-100 hover:border-purple-200 transition-all duration-300"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-8"
          >
            <button className="group flex items-center gap-2 text-[#2E0854] hover:text-[#9400D3] transition-colors duration-200">
              Learn more about our technology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Real-time Analysis",
    description: "Get instant insights about your product's market position and competitive landscape.",
    icon: "🚀",
  },
  {
    title: "Deep Learning",
    description: "Our AI continuously learns from market trends to provide more accurate insights.",
    icon: "🧠",
  },
  {
    title: "Smart Recommendations",
    description: "Receive actionable recommendations based on comprehensive data analysis.",
    icon: "💡",
  },
]; 