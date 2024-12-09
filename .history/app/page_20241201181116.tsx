'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import SearchBar from './components/SearchBar';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  const handleSearch = () => {
    if (!searchValue) return;
    setIsScanning(true);
    // Add scanning logic here
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Discover Your Company's Digital Echo in the AI Landscape
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/80 mb-12">
              Every brand leaves an impression in the AI world. What's yours?
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                value={searchValue}
                onChange={setSearchValue}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                isScanning={isScanning}
                onSearch={handleSearch}
              />
            </div>
          </motion.div>
        </div>

        {/* Digital Mirror Section */}
        <section className="py-20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Brand Through AI's Lens
              </h2>
              <p className="text-xl text-blue-200/70 max-w-2xl mx-auto">
                See how leading AI platforms perceive and represent your brand across the digital landscape.
              </p>
            </motion.div>

            {/* AI Platforms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['ChatGPT', 'Claude', 'Gemini', 'Perplexity'].map((platform) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-4">{platform}</h3>
                    <div className="h-32 relative overflow-hidden rounded-lg bg-black/20">
                      {/* Platform-specific visualization would go here */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 