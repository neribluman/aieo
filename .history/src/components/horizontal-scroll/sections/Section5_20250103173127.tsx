'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Section5() {
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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0533] to-[#2E0854] p-8 will-change-transform relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute -right-48 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -left-48 bottom-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/20 rounded-full"
            animate={{
              y: [-20, -40, -20],
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
          className="text-center space-y-8"
        >
          {/* Main Heading */}
          <div className="relative">
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-7xl font-light text-white tracking-tight"
            >
              AI Already Has an
              <motion.span 
                className="block mt-2 font-normal bg-gradient-to-r from-purple-300 to-indigo-300 text-transparent bg-clip-text relative"
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
                Opinion About You
              </motion.span>
            </motion.h2>
            
            {/* Glowing effect behind text */}
            <motion.div
              className="absolute -inset-x-8 -inset-y-6 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl z-[-1]"
              animate={{
                opacity: [0.5, 0.7, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Subheading */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-2xl text-purple-100/90 font-light"
          >
            Discover What It Is Today
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pt-8"
          >
            <Link
              href="/pricing"
              className="group relative inline-flex items-center"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.1 }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 bg-white text-[#2E0854] rounded-xl
                         hover:bg-purple-50 transition-all duration-200
                         font-medium text-lg shadow-xl shadow-purple-950/20"
              >
                <span className="relative flex items-center gap-2">
                  Reveal AI's Perspective
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 