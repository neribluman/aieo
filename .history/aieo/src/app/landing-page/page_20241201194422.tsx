'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Gentle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 via-transparent to-transparent" />
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-16"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-geist-sans font-light tracking-tight text-gray-900">
                The AI has formed
                <span className="block mt-2 font-normal bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  an opinion about your product
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 font-light mt-4">
                Would you like to know what it is?
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="group relative">
                {/* Elegant hover effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 
                              group-hover:opacity-10 blur-lg transition-all duration-500" />
                
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-8 py-6 text-xl text-gray-800 bg-white border border-gray-200 
                             rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                             transition-all duration-300 placeholder-gray-400
                             hover:border-gray-300"
                    placeholder="Enter your product URL"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-4 px-6 text-lg font-medium rounded-lg text-white
                             bg-gradient-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500
                             transition-all duration-300 shadow-md
                             hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Reveal AI's Perspective
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-8 mt-16 text-gray-600">
              <div className="text-center">
                <div className="text-2xl font-medium text-blue-600 mb-2">100K+</div>
                <div className="text-sm">Products Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-blue-600 mb-2">5</div>
                <div className="text-sm">AI Engines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-blue-600 mb-2">Real-time</div>
                <div className="text-sm">Analysis</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
