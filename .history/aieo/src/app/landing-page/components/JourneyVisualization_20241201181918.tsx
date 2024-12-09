'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const journeySteps = [
  {
    title: 'Awareness',
    description: 'How AI introduces your brand to potential customers',
    icon: '🔍',
  },
  {
    title: 'Consideration',
    description: 'AI-driven comparisons and recommendations',
    icon: '⚖️',
  },
  {
    title: 'Decision',
    description: 'Converting AI insights into customer actions',
    icon: '✨',
  },
  {
    title: 'Loyalty',
    description: 'AI-powered retention and advocacy',
    icon: '❤️',
  },
]

export default function JourneyVisualization() {
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
          Navigate Your AI Presence
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Understand how AI shapes your customer's journey at every step
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2" />
        
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 