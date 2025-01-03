'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { SarcasticCarousel } from "./landing-page/components/SarcasticCarousel";
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { ScrollContainer } from '@/components/ScrollContainer';

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

  // Section components
  const HeroSection = (
    <main className="h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Floating gradient orbs */}
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

      <div className="relative z-10 h-screen flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12 w-full"
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-geist-sans font-light tracking-tight text-gray-900">
                AI has formed
                <motion.span 
                  className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  an opinion about your product
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-500 font-light mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Would you like to know what it is?
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex justify-center gap-4 mt-8"
              >
                <Link 
                  href="/pricing"
                  className="text-[#2E0854] hover:text-[#9400D3] transition-colors duration-200 flex items-center gap-2"
                >
                  View pricing <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-full max-w-2xl mx-auto group"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-2xl opacity-0 
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
                    className="w-full px-8 py-8 text-base sm:text-xl bg-white/50 border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
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
                             bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-lg text-white
                             hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300
                             shadow-lg shadow-[#2E0854]/20 hover:shadow-[#2E0854]/30
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
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <div className="mb-8">
          <SarcasticCarousel />
        </div>
      </div>
    </main>
  );

  const FeaturesSection = (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-light mb-8"
        >
          Discover What AI Thinks
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Sentiment Analysis",
              description: "Understand how AI perceives your product's emotional impact",
              icon: "🎯"
            },
            {
              title: "Market Position",
              description: "See where you stand in the AI-driven marketplace",
              icon: "📊"
            },
            {
              title: "Growth Opportunities",
              description: "Uncover AI-identified areas for improvement",
              icon: "🚀"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const TestimonialsSection = (
    <div className="h-screen w-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-light mb-12"
        >
          Success Stories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "The AI insights helped us pivot our product strategy completely.",
              author: "Tech Startup",
              rating: "98% AI Approval"
            },
            {
              quote: "We discovered opportunities we never knew existed.",
              author: "E-commerce Leader",
              rating: "95% AI Approval"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl bg-white shadow-xl hover:shadow-2xl transition-shadow"
            >
              <p className="text-xl mb-4 text-gray-700">"{testimonial.quote}"</p>
              <p className="font-medium text-gray-900">{testimonial.author}</p>
              <p className="text-purple-600 mt-2">{testimonial.rating}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ScrollContainer>
        {HeroSection}
        {FeaturesSection}
        {TestimonialsSection}
      </ScrollContainer>

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
                      className="w-full px-4 py-3 bg-gradient-to-r from-[#2E0854] to-[#9400D3] 
                               text-white rounded-lg hover:from-[#3A0A6B] hover:to-[#A020F0] 
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
    </>
  );
}
