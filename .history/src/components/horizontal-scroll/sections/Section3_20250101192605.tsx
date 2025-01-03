'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Section3() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    // Only animate once when the section comes into view
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-8 will-change-transform"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Trusted by
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Industry Leaders
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={false}
                animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/60 border border-purple-100 hover:border-purple-200 transition-colors duration-200 text-left"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  perspective: 1000,
                  WebkitPerspective: 1000,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E0854] to-[#9400D3] flex items-center justify-center text-white text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex gap-2">
                  {testimonial.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center mt-8"
          >
            <button className="group flex items-center gap-2 text-[#2E0854] hover:text-[#9400D3] transition-colors duration-200">
              View all case studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechForward",
    quote: "The AI-driven insights have transformed how we position our products in the market. The real-time analysis is invaluable.",
    tags: ["Real-time Analysis", "Market Insights"],
  },
  {
    name: "Michael Rodriguez",
    role: "Product Lead at InnovateCo",
    quote: "The depth of analysis and actionable recommendations helped us improve our product-market fit significantly.",
    tags: ["Product Strategy", "AI Insights"],
  },
]; 