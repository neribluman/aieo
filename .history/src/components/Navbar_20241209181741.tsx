import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'

// Lazy load heavy components
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  loading: () => <div className="animate-pulse h-10 w-10 bg-gray-200 rounded"></div>,
  ssr: false
})

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // Memoize handlers to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md">
      <div className="flex items-center">
        <Image
          src="/Favicon(40x40).png"
          alt="xFunnel Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-xl font-semibold">xFunnel</span>
      </div>

      {/* Mobile optimization */}
      <div className="md:hidden">
        {isOpen && <MobileMenu />}
        <button
          onClick={toggleMenu}
          className="p-2"
          aria-label="Toggle menu"
        >
          {/* Menu icon */}
        </button>
      </div>
    </nav>
  )
} 