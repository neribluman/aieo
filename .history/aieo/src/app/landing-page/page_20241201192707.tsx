'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import ParticleBackground from './components/ParticleBackground';

const placeholderExamples = [
  "Try 'Microsoft'",
  "Enter 'Tesla'",
  "Search 'Amazon'",
  "Type 'Apple'",
];

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse-slow" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-blue-100/90 mb-2">
                  Discover Your Company's
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 text-transparent bg-clip-text">
                    Digital Echo
                  </span>
                  <span className="text-blue-100/80"> in the</span>
                  <span className="block text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    AI Landscape
                  </span>
                </span>
                {/* Decorative elements */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              </h1>
              
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100/70 font-light">
                Every brand leaves an impression in the AI world. What's yours?
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <div className="group relative">
                {/* Pulsing ring effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full px-8 py-6 rounded-lg text-lg text-gray-100 bg-black/20 
                             border border-blue-200/20 backdrop-blur-sm focus:outline-none 
                             focus:border-blue-400/40 transition-all duration-300 
                             placeholder-blue-200/30"
                    placeholder={placeholderExamples[placeholderIndex]}
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-lg text-white
                             bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 
                             hover:from-blue-500 hover:via-blue-400 hover:to-purple-400
                             transition-all duration-300 shadow-lg shadow-blue-500/20
                             hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    Reveal Your AI Presence
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Understand AI Perception",
                  description: "See how AI systems view and represent your brand",
                  icon: "🔍"
                },
                {
                  title: "Track AI Presence",
                  description: "Monitor your position in AI recommendations",
                  icon: "📊"
                },
                {
                  title: "Optimize AI Footprint",
                  description: "Enhance your visibility across AI platforms",
                  icon: "✨"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-xl bg-white/[0.03] border border-blue-200/10 
                           backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300
                           shadow-lg shadow-black/5"
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-100 mb-2">{card.title}</h3>
                  <p className="text-blue-100/70">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
