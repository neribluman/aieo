'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Loader2, Zap, BarChart, Brain, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Section5() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [url, setUrl] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const handleReveal = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    // We'll use the parent's showEmailModal state through a callback
    window.dispatchEvent(new CustomEvent('showEmailModal', { detail: { url } }));
  };

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-bl from-indigo-50 to-purple-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-12"
        >
          {/* Hero Text */}
          <div className="text-center space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-light text-gray-900"
            >
              Ready to
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Discover?
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Get a deep analysis of your company's AI presence
            </motion.p>
          </div>

          {/* URL Input Section */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full group"
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-2xl opacity-0 
                          group-hover:opacity-5 blur-xl transition-all duration-700"
                animate={{
                  scale: isInputFocused ? 1.02 : 1,
                  opacity: isInputFocused ? 0.1 : 0,
                }}
                transition={{ duration: 0.7 }}
              />
              
              <div className="relative flex items-center">
                <Input
                  placeholder="Enter your product URL"
                  className="w-full px-8 py-8 text-base sm:text-xl bg-white/50 border-gray-200 rounded-xl
                           focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                           hover:bg-white/80 backdrop-blur-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                <motion.button
                  onClick={handleReveal}
                  disabled={isAnalyzing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-3 flex items-center justify-center px-6 py-3 
                           bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-lg text-white
                           hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300
                           shadow-lg shadow-[#2E0854]/20 hover:shadow-[#2E0854]/30
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Processing</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Start Analysis</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={false}
                animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors duration-200"
              >
                <div className="mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={false}
          animate={hasAnimated ? { 
            opacity: 1,
            y: [0, 10, 0]
          } : { opacity: 0 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50"
        >
          <span className="text-sm text-gray-600 font-medium">See Pricing</span>
          <ArrowDown className="w-5 h-5 text-gray-600 animate-bounce" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
    </div>
  );
}

const features = [
  {
    title: "In-depth Analysis",
    description: "Thorough analysis delivered within a few hours",
    icon: <Zap className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Comprehensive Report",
    description: "Detailed breakdown of AI mentions and sentiment",
    icon: <BarChart className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "AI Perception",
    description: "Understand how AI systems view your product",
    icon: <Brain className="w-5 h-5 text-purple-600" />,
  },
]; 