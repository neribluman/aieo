'use client'

import { useEffect, useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import SearchBar from './components/SearchBar'
import { motion } from 'framer-motion'
import DigitalMirror from './components/DigitalMirror'
import JourneyVisualization from './components/JourneyVisualization'
import Link from 'next/link'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="h-screen flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Your Company's Digital Echo in the AI Landscape
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Every brand leaves an impression in the AI world. What's yours?
          </motion.p>

          <SearchBar />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link 
              href="/performance"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Performance Analytics →
            </Link>
          </motion.div>
        </motion.section>

        {/* Digital Mirror Section */}
        <DigitalMirror />

        {/* Journey Visualization Section */}
        <JourneyVisualization />
      </div>
    </main>
  )
}
