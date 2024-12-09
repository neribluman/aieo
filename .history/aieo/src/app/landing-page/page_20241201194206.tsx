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
              <h1 className="text-5xl md:text-7xl font-clash-display font-medium tracking-tight mb-4">
                AI has formed an opinion
                <br/>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  about your product
                </span>
              </h1>
              
              <p className="text-zinc-400 text-xl md:text-2xl font-light">
                Would you like to know what it is?
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="group relative">
                {/* Subtle scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {/* Refined border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-20 
                              group-hover:opacity-30 transition-opacity duration-500" />
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-8 py-8 text-2xl text-blue-100 bg-white/[0.03] border border-white/10 
                             rounded-lg backdrop-blur-sm focus:outline-none focus:border-white/20 
                             transition-all duration-300 placeholder-blue-200/20
                             hover:bg-white/[0.05] hover:border-white/20"
                    placeholder="Enter your product URL"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  
                  <button
                    className="mt-6 w-full py-4 px-6 text-lg font-medium rounded-lg text-white
                             bg-gradient-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500
                             transition-all duration-300 shadow-lg shadow-blue-900/20
                             hover:shadow-xl hover:shadow-blue-900/30"
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
