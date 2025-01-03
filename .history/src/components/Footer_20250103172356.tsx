'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full">
      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2E0854] to-[#9400D3] py-16">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Ready to shape your
              <span className="block mt-2 font-normal">AI presence?</span>
            </h2>
            <p className="text-lg text-purple-100/90 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-white text-[#2E0854] rounded-xl
                         hover:bg-purple-50 transition-all duration-200 shadow-lg shadow-purple-900/20
                         font-medium text-lg group"
              >
                Try it free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Links Section */}
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