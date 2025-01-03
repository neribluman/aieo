'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Link as LinkIcon, FileText, Globe, Book } from 'lucide-react';

export function Section4() {
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
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          {/* Text Content */}
          <div className="w-full md:w-1/3 space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Uncover Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Citation Sources
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Discover and analyze the sources AI engines use when discussing your product.
            </motion.p>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {citations.map((citation, index) => (
                <motion.div
                  key={citation.type}
                  initial={false}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
                >
                  <div className="mt-1">
                    {citation.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{citation.type}</h3>
                    <p className="text-sm text-gray-500">{citation.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Product Screenshot */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-2/3 relative flex items-center justify-center h-[80vh]"
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <img
                    src="/images/product(2).svg"
                    alt="Citation analysis dashboard"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const citations = [
  {
    type: "Official Documentation",
    description: "Technical documentation and API references",
    icon: <FileText className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Web Presence",
    description: "Website content and landing pages",
    icon: <Globe className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Backlinks",
    description: "Third-party mentions and references",
    icon: <LinkIcon className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Knowledge Base",
    description: "Educational content and guides",
    icon: <Book className="w-5 h-5 text-purple-600" />,
  },
]; 