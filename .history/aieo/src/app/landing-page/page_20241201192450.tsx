'use client';
import { useState } from 'react';
// import ParticleBackground from './components/ParticleBackground';

export default function LandingPage() {
  const [companyInput, setCompanyInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* <ParticleBackground /> */}
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50">
                  Discover Your Company's
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Digital Echo in the AI Landscape
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl text-blue-100/80 sm:text-2xl md:mt-5 md:max-w-3xl">
                Every brand leaves an impression in the AI world. What's yours?
              </p>
            </div>

            <div className="mt-10 max-w-xl mx-auto animate-fade-in-up">
              <div className={`relative rounded-lg transition-all duration-500 ${
                isInputFocused ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20' : ''
              }`}>
                <input
                  type="text"
                  className="block w-full px-6 py-5 rounded-lg text-gray-100 bg-white/5 border border-blue-200/20 
                           backdrop-blur-sm focus:outline-none focus:border-blue-400/40
                           transition-all duration-300 placeholder-blue-200/50 text-lg"
                  placeholder="Enter your company URL or name"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                <button
                  className="mt-4 w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-lg text-white
                           bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                           transition-all duration-300 transform hover:scale-[1.02]
                           hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Reveal Your AI Presence
                </button>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up delay-300">
              {[
                "Understand how AI perceives your brand",
                "Track your position in the AI recommendation landscape",
                "Optimize your digital footprint across AI platforms"
              ].map((text, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white/5 border border-blue-200/20 backdrop-blur-sm
                           transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
                >
                  <p className="text-blue-100/90">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
