'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Enhanced grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Floating orbs with improved gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl"
          animate={{
            x: ['-10%', '10%'],
            y: ['-10%', '10%'],
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{ top: '10%', left: '60%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-2xl"
          animate={{
            x: ['10%', '-10%'],
            y: ['10%', '-10%'],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{ top: '60%', left: '20%' }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-16"
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-geist-sans font-light tracking-tight text-gray-900">
                The AI has formed
                <motion.span 
                  className="block mt-2 font-normal bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  an opinion about your product
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-500 font-light mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Would you like to know what it is?
              </motion.p>
            </motion.div>

            {/* Enhanced search box section */}
            <motion.div 
              className="w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="group relative">
                {/* Futuristic glow effect */}
                <motion.div 
                  className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 
                            group-hover:opacity-100 blur-xl transition-all duration-700 animate-pulse-slow"
                  animate={{
                    scale: isInputFocused ? 1.02 : 1,
                    opacity: isInputFocused ? 1 : 0,
                  }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Search container */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-2 
                              shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100
                              group-hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)]
                              transition-all duration-500">
                  <div className="relative flex items-center">
                    {/* AI Icon */}
                    <div className="absolute left-4 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <input
                      type="text"
                      className="w-full px-14 py-7 text-xl text-gray-800 bg-transparent
                               focus:outline-none placeholder-gray-400"
                      placeholder="Enter your product URL"
                      value={companyInput}
                      onChange={(e) => setCompanyInput(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />

                    {/* Scan Icon */}
                    <div className="absolute right-4 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="mt-3 w-full py-5 px-6 text-lg font-medium rounded-xl text-white
                             bg-gradient-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500
                             transition-all duration-500
                             shadow-[0_8px_30px_rgb(59,130,246,0.2)]
                             hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)]"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Reveal AI's Perspective</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
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
