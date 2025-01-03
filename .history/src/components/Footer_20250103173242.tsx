'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-gray-500">
            <Link 
              href="/terms" 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <span className="hidden md:inline text-gray-300">•</span>
            <Link 
              href="/privacy" 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-gray-300">•</span>
            <Link 
              href="/contact" 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <span className="hidden md:inline text-gray-300">•</span>
            <Link 
              href="/about" 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 