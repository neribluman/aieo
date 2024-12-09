'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-950/20 to-black transition-all duration-1000" />
      
      {/* Subtle moving gradient */}
      <motion.div 
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(30,64,175,0.05) 0%, transparent 70%)',
            'radial-gradient(circle at 60% 40%, rgba(30,64,175,0.05) 0%, transparent 70%)',
            'radial-gradient(circle at 40% 60%, rgba(30,64,175,0.05) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(30,64,175,0.05) 0%, transparent 70%)',
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />
      
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-16"
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Your company has a
                <span className="block mt-2 font-normal bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  digital shadow
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-blue-100/50 font-light mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Would you like to see it?
              </motion.p>
            </div>

            <motion.div 
              className="w-full max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="group relative">
                {/* Scanning effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Pulsing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse-slow" />
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-8 py-8 text-2xl text-blue-100 bg-black/40 border border-blue-500/20 
                             rounded-lg backdrop-blur-sm focus:outline-none focus:border-blue-400/40 
                             transition-all duration-500 placeholder-blue-300/20"
                    placeholder="Enter URL"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-6 text-lg font-light text-blue-100/90 
                             bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg
                             border border-blue-500/20 backdrop-blur-sm
                             hover:border-blue-400/40 hover:from-blue-800/50 hover:to-purple-800/50
                             transition-all duration-500"
                  >
                    Reveal
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
