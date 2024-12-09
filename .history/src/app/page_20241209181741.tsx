'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { SarcasticCarousel } from "./landing-page/components/SarcasticCarousel";
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReveal = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, url }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setIsSuccess(false);
          setEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="h-screen relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-400/10 to-transparent blur-3xl"
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

      <div className="relative z-10 h-screen flex flex-col">
        {/* Hero Section */}
        <div className="w-full px-4 md:px-6">
          {/* Hero section */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              AI has formed
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}an opinion about your product
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Would you like to know what it is?
            </p>
            
            {/* URL Input section */}
            <div className="w-full max-w-md mb-12">
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 
                            group-hover:opacity-5 blur-xl transition-all duration-700"
                  animate={{
                    scale: isInputFocused ? 1.02 : 1,
                    opacity: isInputFocused ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.7 }}
                />
                
                <div className="relative flex items-center">
                  <Input
                    placeholder="Enter your product URL"
                    className="w-full px-8 py-8 text-xl bg-white/50 border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-blue-500/20 transition-all duration-300
                             hover:bg-white/80 backdrop-blur-sm"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  <motion.button
                    onClick={handleReveal}
                    disabled={isAnalyzing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-3 flex items-center justify-center px-6 py-3 
                             bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white
                             hover:from-blue-500 hover:to-purple-500 transition-all duration-300
                             shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Analyzing</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Reveal</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Companies section - fixed mobile layout */}
            <div className="w-full text-center mb-8">
              <p className="text-gray-600 text-sm md:text-base whitespace-normal px-4">
                Companies that haven't discovered what AI thinks about them yet
              </p>
              
              {/* Logo carousel/grid */}
              <div className="mt-8 flex flex-wrap justify-center gap-8">
                <Image
                  src="/hubspot-logo.png"
                  alt="HubSpot"
                  width={120}
                  height={40}
                  className="opacity-50"
                />
                {/* Other logos... */}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mb-8">
          <SarcasticCarousel />
        </div>
      </div>

      <Dialog.Root open={showEmailModal} onOpenChange={setShowEmailModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                   bg-white rounded-xl p-8 w-full max-w-md shadow-2xl
                                   z-[101] animate-in fade-in-0 zoom-in-95"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {!isSuccess ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900">Almost there! 🚀</h2>
                  <p className="text-gray-600">
                    We're analyzing your product's AI presence. Enter your email and we'll send you the detailed results once they're ready.
                  </p>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                               text-white rounded-lg hover:from-blue-500 hover:to-purple-500 
                               transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                      ) : (
                        'Send me the results'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-gray-900">Thank you! ✨</h2>
                  <p className="text-gray-600">
                    We'll send your analysis results shortly. Keep an eye on your inbox!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
