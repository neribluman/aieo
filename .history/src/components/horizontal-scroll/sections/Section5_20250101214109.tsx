'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Section5() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
        >
          {/* Left Side - CTA */}
          <div className="w-full md:w-1/2 space-y-8">
            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-light text-gray-900">
                Ready to
                <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                  Get Started?
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Let's transform how AI understands and represents your brand.
              </p>
              <Button
                onClick={handleContactClick}
                className="group relative overflow-hidden rounded-full px-8 py-6 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 text-lg flex items-center gap-2">
                  Contact Us <MessageSquare className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Preview */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl">
              <div className="absolute -top-6 right-8">
                <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-gray-900">Let's Connect</h3>
                <p className="text-gray-600">Our team is ready to help you take control of your AI presence.</p>
                <div className="h-32 w-full bg-gray-100/50 rounded-lg blur-[2px]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-8 h-8 text-purple-600" />
        </motion.div>
      </div>
    </div>
  );
} 