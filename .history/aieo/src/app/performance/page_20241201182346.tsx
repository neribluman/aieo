'use client'

import { motion } from 'framer-motion'
import { LineChart } from '@tremor/react'

const performanceData = [
  {
    date: '2024-01',
    sentiment: 85,
    position: 72,
    mentions: 120,
    probability: 65,
  },
  {
    date: '2024-02',
    sentiment: 88,
    position: 75,
    mentions: 145,
    probability: 70,
  },
  // Add more data points as needed
]

const metrics = [
  { name: 'Average Sentiment', value: 'sentiment' },
  { name: 'Average Position', value: 'position' },
  { name: 'Company Mentioned', value: 'mentions' },
  { name: 'Recommendation Probability', value: 'probability' },
]

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          AI Engine Performance Over Time
        </h1>

        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex flex-wrap gap-4 mb-6">
            {metrics.map((metric) => (
              <button
                key={metric.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${metric.value === 'mentions' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
              >
                {metric.name}
              </button>
            ))}
          </div>

          <div className="h-[400px]">
            <LineChart
              className="h-full"
              data={performanceData}
              index="date"
              categories={['sentiment', 'position', 'mentions', 'probability']}
              colors={['emerald', 'blue', 'purple', 'rose']}
              yAxisWidth={40}
              showAnimation={true}
              showLegend={false}
              curveType="natural"
              customTooltip={({ payload }) => (
                <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  {payload?.map((item: any) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="capitalize">{item.name}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </motion.div>
    </main>
  )
} 