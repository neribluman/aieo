'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { Search, BarChart2, Lightbulb } from 'lucide-react';

export function Section6() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      controls.start("visible");
    }
  }, [isInView, hasAnimated, controls]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <motion.div 
        className="absolute -right-48 -top-48 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
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
        className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            animate={{
              y: [-10, -30, -10],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
        >
          {/* Enhanced Text Content */}
          <div className="w-full md:w-[40%] space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
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
                  className="absolute -inset-x-6 -inset-y-4 z-[-1] bg-gradient-to-r from-purple-100 to-indigo-100 opacity-[0.7] blur-lg"
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
              <motion.p
                className="text-xl text-gray-600 mt-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Navigate the AI Search Revolution with confidence. AI engines are changing how people discover solutions, but businesses lack visibility into their AI presence.
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 mt-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                xFunnel helps you understand and optimize how AI engines like ChatGPT, Claude, and Perplexity represent your brand.
              </motion.p>
            </motion.div>
          </div>

          {/* Enhanced Feature Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="relative p-6 rounded-xl transition-all duration-200 group"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Card Content */}
                <div className="relative flex flex-col gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center
                             shadow-lg shadow-purple-100/50 group-hover:bg-purple-200 transition-colors duration-200"
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-xl group-hover:text-purple-900 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-200">
                      {feature.description}
                    </p>
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
    icon: <Search className="w-7 h-7 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />,
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