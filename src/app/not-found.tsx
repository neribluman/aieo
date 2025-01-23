'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFound() {
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
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <motion.h1 
              className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              404
            </motion.h1>

            {/* Message */}
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              It seems you've ventured into uncharted territory. 
              Let's get you back on track.
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <Button 
                asChild
                className="bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#3A0A6B] hover:to-[#A020F0] text-white px-8"
              >
                <Link href="/">
                  Return Home
                </Link>
              </Button>

              {/* Quick Links */}
              <nav className="flex justify-center gap-6 text-sm text-gray-500">
                <Link href="/blog" className="hover:text-purple-600 transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-purple-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-purple-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 