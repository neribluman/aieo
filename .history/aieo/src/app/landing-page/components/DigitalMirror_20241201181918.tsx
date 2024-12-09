'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const platforms = [
  { name: 'ChatGPT', color: 'from-green-400 to-blue-500' },
  { name: 'Claude', color: 'from-purple-400 to-indigo-500' },
  { name: 'Gemini', color: 'from-blue-400 to-cyan-500' },
  { name: 'Perplexity', color: 'from-pink-400 to-rose-500' },
]

export default function DigitalMirror() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Your Brand Through AI's Lens
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Understand how different AI platforms perceive and represent your brand's digital presence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
          >
            <div className={`
              absolute inset-0 bg-gradient-to-br ${platform.color} opacity-20 
              rounded-lg transform group-hover:scale-105 transition-transform duration-300
            `} />
            <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">{platform.name}</h3>
              <div className="h-32 flex items-center justify-center">
                <div className={`
                  w-20 h-20 rounded-full bg-gradient-to-br ${platform.color}
                  transform group-hover:scale-110 transition-transform duration-300
                  animate-pulse
                `} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 