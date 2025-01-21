'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#1a0533]">
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6 text-xs">
            <Link 
              href="/terms" 
              className="text-purple-200/40 hover:text-purple-200/60 transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <span className="hidden md:inline text-purple-200/20">•</span>
            <Link 
              href="/privacy" 
              className="text-purple-200/40 hover:text-purple-200/60 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-purple-200/20">•</span>
            <Link 
              href="/contact" 
              className="text-purple-200/40 hover:text-purple-200/60 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <span className="hidden md:inline text-purple-200/20">•</span>
            <Link 
              href="/about" 
              className="text-purple-200/40 hover:text-purple-200/60 transition-colors duration-200"
            >
              About Us
            </Link>
            <span className="hidden md:inline text-purple-200/20">•</span>
            <Link 
              href="/blog" 
              className="text-purple-200/40 hover:text-purple-200/60 transition-colors duration-200"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 