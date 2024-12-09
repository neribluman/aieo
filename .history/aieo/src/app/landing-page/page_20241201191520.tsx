'use client';
import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              <span className="block">Discover Your Company's</span>
              <span className="block text-blue-400">Digital Echo in the AI Landscape</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Every brand leaves an impression in the AI world. What's yours?
            </p>

            {/* Search Section */}
            <div className="mt-10 max-w-xl mx-auto">
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  className="block w-full px-4 py-4 rounded-lg text-gray-900 bg-white/10 border border-gray-300/20 
                           backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your company URL or name"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                />
                <button
                  className="mt-4 inline-flex items-center px-8 py-3 border border-transparent text-base 
                           font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 
                           md:py-4 md:text-lg md:px-10 transition-all duration-200
                           hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Reveal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The Digital Mirror Section */}
        <section className="py-16 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Your Brand Through AI's Lens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['ChatGPT', 'Claude', 'Gemini', 'Perplexity'].map((platform) => (
                <div
                  key={platform}
                  className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-700/30
                           transform hover:scale-105 transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{platform}</h3>
                  <p className="text-gray-300">
                    Discover how your brand resonates within {platform}'s ecosystem
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
