'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          href="/landing-page" 
          className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          AIEO
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/landing-page"
            className={`text-sm ${
              pathname === '/landing-page' 
                ? 'text-blue-400' 
                : 'text-white hover:text-blue-400'
            } transition-colors`}
          >
            Home
          </Link>
          <Link 
            href="/dashboard"
            className={`text-sm ${
              pathname === '/dashboard' 
                ? 'text-blue-400' 
                : 'text-white hover:text-blue-400'
            } transition-colors`}
          >
            Dashboard
          </Link>
          <Link 
            href="/buying-journey"
            className={`text-sm ${
              pathname === '/buying-journey' 
                ? 'text-blue-400' 
                : 'text-white hover:text-blue-400'
            } transition-colors`}
          >
            Buying Journey
          </Link>
          <Link 
            href="/performance"
            className={`text-sm ${
              pathname === '/performance' 
                ? 'text-blue-400' 
                : 'text-white hover:text-blue-400'
            } transition-colors`}
          >
            Performance
          </Link>
        </div>
      </div>
    </motion.nav>
  )
} 