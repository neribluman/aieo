'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SearchBar() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsAnalyzing(true)
    // Add API call logic here
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  return (
    <motion.form
      className="w-full max-w-2xl relative"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your company URL or name"
          className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isAnalyzing 
              ? ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 10px rgba(59, 130, 246, 0)']
              : '0 0 0 0 rgba(59, 130, 246, 0)'
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Reveal'}
        </button>
      </div>
    </motion.form>
  )
} 