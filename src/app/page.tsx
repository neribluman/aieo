'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
import Image from 'next/image';
import WaveReveal from "@/components/animata/text/wave-reveal";
import GibberishText from "@/components/animata/text/gibberish-text";
import Counter from "@/components/animata/text/counter";

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
  
  const platforms = [
    "Gemini",
    "AI Overviews",
    "ChatGPT",
    "Claude",
    "Perplexity",
    "Meta AI",
    "Copilot"
  ];

  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState<'wave' | 'gibberish'>('wave');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
      setCurrentAnimation((prev) => prev === 'wave' ? 'gibberish' : 'wave');
    }, 4000);
    return () => clearInterval(interval);
  }, [platforms.length]);

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
      {/* First Section - Hero section */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-white via-purple-50/40 to-white">
        {/* Modern grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-purple-50/40"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              background: [
                "linear-gradient(to bottom right, rgba(147,51,234,0.1), transparent, rgba(168,85,247,0.05))",
                "linear-gradient(to bottom right, rgba(168,85,247,0.1), transparent, rgba(147,51,234,0.05))"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#8b5cf620,transparent)]" />
        </div>
        
        {/* Floating gradient orbs - Enhanced for modern look */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-400/10 via-purple-400/5 to-transparent blur-3xl"
            animate={{
              x: ['-5%', '5%'],
              y: ['-5%', '5%'],
              scale: [0.9, 1.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{ top: '10%', left: '60%' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-violet-500/10 via-violet-500/5 to-transparent blur-3xl"
            animate={{
              x: ['5%', '-5%'],
              y: ['5%', '-5%'],
              scale: [1.1, 0.9],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{ bottom: '10%', right: '60%' }}
          />
        </div>

        <div className="relative z-10 h-screen flex flex-col">
          {/* Hero Section - Main Content */}
          <div className="flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-6 text-left md:col-span-2"
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col items-start">
                    <motion.div 
                      className="text-[3.5rem] md:text-[8rem] font-light tracking-tight text-gray-900 leading-[0.9]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      IMPROVE
                    </motion.div>
                    <motion.div 
                      className="text-[3.5rem] md:text-[8rem] font-light tracking-tight text-gray-900 leading-[0.9] relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                    >
                      CONVERSION
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <motion.span 
                      className="text-[1.2rem] md:text-[1.5rem] text-gray-400/80 tracking-widest uppercase pl-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      on
                    </motion.span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPlatform}
                        className="relative flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          minWidth: '600px',
                          minHeight: '120px'
                        }}
                      >
                        <div className="absolute inset-0 flex items-center">
                          {currentAnimation === 'wave' ? (
                            <WaveReveal
                              text={platforms[currentPlatform]}
                              direction="up"
                              mode="letter"
                              duration="600ms"
                              delay={0}
                              blur={true}
                              className="!justify-start !p-0 !text-[3.5rem] md:!text-[6rem] !font-bold tracking-tight"
                              letterClassName="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 [text-shadow:0_4px_8px_rgba(168,85,247,0.2)] relative hover:scale-110 transition-transform duration-200"
                            />
                          ) : (
                            <GibberishText
                              text={platforms[currentPlatform]}
                              className="text-[3.5rem] md:text-[6rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 [text-shadow:0_4px_8px_rgba(168,85,247,0.2)] relative hover:scale-110 transition-transform duration-200"
                            />
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="w-full max-w-xl mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-2xl opacity-0 
                            group-hover:opacity-10 blur-xl transition-all duration-500"
                  animate={{
                    scale: isInputFocused ? 1.02 : 1,
                    opacity: isInputFocused ? 0.15 : 0,
                  }}
                />
                
                <div className="relative flex items-center">
                  <Input
                    placeholder={placeholder}
                    className="w-full pl-6 pr-24 py-7 text-base sm:text-lg bg-white/80 border-gray-200/50 rounded-xl
                             focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                             hover:bg-white/90 backdrop-blur-xl shadow-xl shadow-purple-500/5"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  <button
                    onClick={handleReveal}
                    disabled={isAnalyzing}
                    className="absolute right-2 flex items-center justify-center px-5 py-2.5
                             bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-lg text-white
                             hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300
                             shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30
                             disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            </motion.div>
          </div>

          {/* Statistics Section */}
          <motion.div 
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
              <div className="text-center">
                <Counter
                  targetValue={266}
                  className="font-mono text-xl md:text-3xl text-[#9400D3] mb-1"
                  delay={isStatsInView ? 0 : 999999}
                />
                <div className="text-gray-500 text-xs md:text-sm">
                  Companies Analyzed
                </div>
              </div>
              <div className="text-center">
                <Counter
                  targetValue={500498}
                  className="font-mono text-xl md:text-3xl text-[#9400D3] mb-1"
                  delay={isStatsInView ? 200 : 999999}
                />
                <div className="text-gray-500 text-xs md:text-sm">
                  Responses Collected
                </div>
              </div>
              <div className="text-center">
                <Counter
                  targetValue={2104028}
                  className="font-mono text-xl md:text-3xl text-[#9400D3] mb-1"
                  delay={isStatsInView ? 400 : 999999}
                />
                <div className="text-gray-500 text-xs md:text-sm">
                  Citations Analyzed
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Transition to Section2 */}
      <div className="relative h-[40vh] -mt-[40vh]">
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" }
          }}
          viewport={{ once: true, margin: "-20%" }}
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(252, 246, 255, 0.4), rgba(250, 245, 255, 0.7), rgba(248, 244, 255, 0.9), rgba(245, 240, 255, 1))'
          }}
        />
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
