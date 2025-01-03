'use client';

import { motion } from 'framer-motion';
import { ContactForm } from './components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Floating gradient orb */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/10 to-transparent blur-3xl"
          animate={{
            x: ['-10%', '10%'],
            y: ['-10%', '10%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{ top: '20%', left: '60%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
              Get in 
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Touch
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </main>
  );
} 