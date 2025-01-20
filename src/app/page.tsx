'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { SarcasticCarousel } from "./landing-page/components/SarcasticCarousel";
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { HorizontalScroll, Section } from "@/components/horizontal-scroll/HorizontalScroll";
import { Section2 } from "@/components/horizontal-scroll/sections/Section2";
import { Section3 } from "@/components/horizontal-scroll/sections/Section3";
import { Section4 } from "@/components/horizontal-scroll/sections/Section4";
import { Section5 } from "@/components/horizontal-scroll/sections/Section5";
import { Section6 } from "@/components/horizontal-scroll/sections/Section6";
import { Footer } from "@/components/Footer";
import { MobileSection2 } from "@/components/horizontal-scroll/mobile-sections/MobileSection2";
import { MobileSection3 } from "@/components/horizontal-scroll/mobile-sections/MobileSection3";
import { MobileSection4 } from "@/components/horizontal-scroll/mobile-sections/MobileSection4";
import { MobileSection5 } from "@/components/horizontal-scroll/mobile-sections/MobileSection5";

function useDelayedCounter(
  end: number,
  duration: number = 2000,
  start: number = 0,
  delay: number = 0
) {
  const [count, setCount] = useState(end);
  const countRef = useRef(end);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const isReady = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isReady.current = true;
      if (!hasStarted.current) {
        hasStarted.current = true;
        requestAnimationFrame(animate);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animate = (timestamp: number) => {
    if (!isReady.current) return;
    
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      setCount(start);
      countRef.current = start;
    }
    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / duration, 1);
    
    const currentCount = Math.floor(start + (end - start) * percentage);
    
    if (currentCount !== countRef.current) {
      countRef.current = currentCount;
      setCount(currentCount);
    }

    if (percentage < 1) {
      requestAnimationFrame(animate);
    }
  };

  return count;
}

function useDelayedCombinedCounter(
  end: number,
  initialDuration: number = 2000,
  incrementInterval: number = 1000,
  minIncrement: number = 1,
  maxIncrement: number = 5,
  delay: number = 0
) {
  const [count, setCount] = useState(end);
  const countRef = useRef(end);
  const startTimeRef = useRef<number | null>(null);
  const hasReachedInitial = useRef(false);
  const hasStarted = useRef(false);
  const isReady = useRef(false);
  const prevTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      isReady.current = true;
      if (!hasStarted.current) {
        hasStarted.current = true;
        requestAnimationFrame(animate);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animate = (timestamp: number) => {
    if (!isReady.current) return;
    
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      setCount(0);
      countRef.current = 0;
    }
    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / initialDuration, 1);
    
    const currentCount = Math.floor(end * percentage);
    
    if (currentCount !== countRef.current) {
      countRef.current = currentCount;
      setCount(currentCount);
    }

    if (percentage < 1) {
      requestAnimationFrame(animate);
    } else {
      hasReachedInitial.current = true;
      prevTimeRef.current = performance.now();
    }
  };

  useEffect(() => {
    if (!hasReachedInitial.current || !isReady.current) return;

    const animateIncrement = (timestamp: number) => {
      if (!prevTimeRef.current) {
        prevTimeRef.current = timestamp;
        return requestAnimationFrame(animateIncrement);
      }

      const deltaTime = timestamp - prevTimeRef.current;
      
      if (deltaTime >= incrementInterval) {
        const randomIncrement = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
        setCount(prev => prev + randomIncrement);
        prevTimeRef.current = timestamp;
      }

      requestAnimationFrame(animateIncrement);
    };

    const animationFrame = requestAnimationFrame(animateIncrement);
    return () => cancelAnimationFrame(animationFrame);
  }, [incrementInterval, minIncrement, maxIncrement, hasReachedInitial.current]);

  return count;
}

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placeholder, setPlaceholder] = useState('Enter your company or product name');
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  
  const companiesCount = useDelayedCounter(266, 3500, 0, isStatsInView ? 0 : 999999);
  const responsesCount = useDelayedCombinedCounter(500498, 3000, 3000, 1, 4, isStatsInView ? 0 : 999999);
  const citationsCount = useDelayedCombinedCounter(2104028, 2500, 1600, 1, 6, isStatsInView ? 0 : 999999);

  useEffect(() => {
    const handleShowEmailModal = (event: CustomEvent<{ url: string }>) => {
      setUrl(event.detail.url);
      setShowEmailModal(true);
    };

    window.addEventListener('showEmailModal', handleShowEmailModal as EventListener);
    return () => {
      window.removeEventListener('showEmailModal', handleShowEmailModal as EventListener);
    };
  }, []);

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 768) {
        setPlaceholder('Enter company name');
      } else {
        setPlaceholder('Enter your company or product name');
      }
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);
    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);

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
    <main className="relative">
      {/* First Section - Keep existing hero section */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        {/* Floating gradient orbs - Only show on desktop */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
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
          {/* Hero Section */}
          <div className="flex-1 flex items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 w-full -mt-32"
            >
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-geist-sans font-light tracking-tight text-gray-900 leading-[1.1]">
                  Improve conversion on
                  {/* Desktop version with full animations */}
                  <motion.span 
                    className="hidden md:block mt-2 mb-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text leading-[1.1] py-1 relative"
                  >
                    <motion.span
                      className="inline-block relative"
                      animate={{
                        y: [0, -4, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="relative">
                        {/* Main text */}
                        <span className="bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                          AI Search Engines
                        </span>
                        
                        {/* Digital processing effect */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text mix-blend-screen"
                          animate={{
                            x: [0, -4, 0],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "anticipate",
                          }}
                        >
                          AI Search Engines
                        </motion.span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#9400D3] to-[#2E0854] text-transparent bg-clip-text mix-blend-screen"
                          animate={{
                            x: [0, 4, 0],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "anticipate",
                            delay: 0.15,
                          }}
                        >
                          AI Search Engines
                        </motion.span>

                        {/* Scan line effect */}
                        <motion.span
                          className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
                          style={{ height: '4px' }}
                          animate={{
                            y: [-20, 40],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "linear",
                          }}
                        />

                        {/* Highlight flash */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text"
                          animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0.8, 1.1, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        >
                          AI Search Engines
                        </motion.span>
                      </span>
                    </motion.span>
                  </motion.span>

                  {/* Simplified mobile version */}
                  <motion.span 
                    className="block md:hidden mt-2 mb-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text leading-[1.1] py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    AI Search Engines
                  </motion.span>
                </h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-500 font-light mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Before your competitors do
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl mx-auto group mt-8"
                >
                  <div className="relative">
                    {/* Desktop hover effect */}
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-2xl opacity-0 
                                group-hover:opacity-5 blur-xl transition-all duration-700 hidden md:block"
                      animate={{
                        scale: isInputFocused ? 1.02 : 1,
                        opacity: isInputFocused ? 0.1 : 0,
                      }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    <div className="relative flex items-center">
                      <Input
                        placeholder={placeholder}
                        className="w-full px-8 py-8 text-base sm:text-xl bg-white/50 border-gray-200 rounded-xl
                                 focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                                 hover:bg-white/80 backdrop-blur-sm md:backdrop-blur-sm"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      />
                      <button
                        onClick={handleReveal}
                        disabled={isAnalyzing}
                        className="absolute right-3 flex items-center justify-center px-6 py-3 
                                 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-lg text-white
                                 hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300
                                 shadow-lg shadow-[#2E0854]/20 hover:shadow-[#2E0854]/30
                                 disabled:opacity-50 disabled:cursor-not-allowed md:motion-safe:hover:scale-102"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Analyzing</span>
                          </>
                        ) : (
                          <>
                            <span className="mr-2 hidden md:inline">Try for Free</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Get your first AI search engine analysis completely free
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Statistics Section */}
          <motion.div 
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
              <div className="text-center">
                <motion.div 
                  className="font-mono text-2xl md:text-3xl text-[#9400D3] mb-1"
                >
                  {new Intl.NumberFormat().format(companiesCount)}
                </motion.div>
                <div className="text-gray-500 text-sm">
                  Companies Analyzed
                </div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="font-mono text-2xl md:text-3xl text-[#9400D3] mb-1"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={responsesCount}
                >
                  {new Intl.NumberFormat().format(responsesCount)}
                </motion.div>
                <div className="text-gray-500 text-sm">
                  Responses Collected
                </div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="font-mono text-2xl md:text-3xl text-[#9400D3] mb-1"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={citationsCount}
                >
                  {new Intl.NumberFormat().format(citationsCount)}
                </motion.div>
                <div className="text-gray-500 text-sm">
                  Citations Analyzed
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carousel Section */}
          <div className="mb-8">
            <SarcasticCarousel />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Sections */}
      <div className="hidden md:block">
        <HorizontalScroll>
          <Section>
            <Section2 />
          </Section>
          <Section>
            <Section3 />
          </Section>
          <Section>
            <Section4 />
          </Section>
        </HorizontalScroll>
      </div>

      {/* Mobile Sections */}
      <div className="block md:hidden">
        <MobileSection2 />
        <MobileSection3 />
        <MobileSection4 />
        <MobileSection5 />
      </div>

      {/* Vertical Sections */}
      <div className="hidden md:block">
        <Section>
          <Section6 />
        </Section>
      </div>
      <Section>
        <Section5 />
      </Section>

      <Footer />

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
    </main>
  );
}
