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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-[90rem] mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
        >
          {/* Text Content */}
          <div className="w-full md:w-[30%] space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Build Your
              <span className="block mt-2 mb-1 pb-3 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Playbook
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Decode the patterns behind influential citations to craft your perfect market presence.
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
            className="w-full md:w-[70%] relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-video flex items-center justify-center p-2">
              <div className="relative w-full h-full bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20 hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  >
                    <source src="/videos/section4.webm" type="video/webm" />
                  </video>
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
    type: "Citation Analysis",
    description: "Identify what drives AI recommendations",
    icon: <FileText className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Content Strategy",
    description: "Shape the narrative that matters",
    icon: <Globe className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Impact Patterns",
    description: "Understand citation influence",
    icon: <LinkIcon className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Authority Building",
    description: "Establish lasting market presence",
    icon: <Book className="w-5 h-5 text-purple-600" />,
  },
]; 