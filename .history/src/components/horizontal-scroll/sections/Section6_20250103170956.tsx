'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Section6() {
  return (
    <motion.div 
      className="min-h-screen w-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <div className="space-x-4">
          <Link 
            href="/terms" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link 
            href="/privacy" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} xfunnel. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
} 