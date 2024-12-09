'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-950/20 to-black" />
      
      {/* Reduced opacity noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.01]" />
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-16"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/90">
                Your company has a
                <span className="block mt-2 font-normal bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  digital shadow
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100/50 font-light mt-4">
                Would you like to see it?
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="group relative">
                {/* Simplified scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {/* Static border effect instead of animation */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur opacity-20 
                              group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-8 py-8 text-2xl text-blue-100 bg-black/40 border border-blue-500/20 
                             rounded-lg backdrop-blur-sm focus:outline-none focus:border-blue-400/40 
                             transition-colors duration-300 placeholder-blue-300/20"
                    placeholder="Enter URL"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  
                  <button
                    className="mt-6 w-full py-6 text-lg font-light text-blue-100/90 
                             bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg
                             border border-blue-500/20 backdrop-blur-sm
                             hover:border-blue-400/40 hover:bg-blue-800/30
                             transition-colors duration-300"
                  >
                    Reveal
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
