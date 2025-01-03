'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code, Zap, LineChart } from 'lucide-react';

export function ProductFeatures() {
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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 p-8 will-change-transform"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Powerful
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Feature Set
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={false}
                animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/60 border border-purple-100 hover:border-purple-200 transition-colors duration-200 group"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  perspective: 1000,
                  WebkitPerspective: 1000,
                }}
              >
                <div className="mb-4 p-3 rounded-lg bg-purple-50 w-fit group-hover:bg-purple-100 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
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
              Explore all features
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
    title: "AI Analysis",
    description: "Deep learning algorithms analyze your product's market presence",
    icon: <Code className="w-6 h-6 text-purple-700" />,
    points: [
      "Natural Language Processing",
      "Sentiment Analysis",
      "Market Trend Detection"
    ]
  },
  {
    title: "Real-time Insights",
    description: "Get instant feedback and actionable recommendations",
    icon: <Zap className="w-6 h-6 text-purple-700" />,
    points: [
      "Live Data Processing",
      "Instant Recommendations",
      "Continuous Monitoring"
    ]
  },
  {
    title: "Performance Metrics",
    description: "Track and measure your product's market impact",
    icon: <LineChart className="w-6 h-6 text-purple-700" />,
    points: [
      "Competitive Analysis",
      "Growth Metrics",
      "Impact Assessment"
    ]
  }
]; 