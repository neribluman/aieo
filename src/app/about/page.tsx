'use client';

import { motion } from 'framer-motion';
import { ChartBarIcon, UserGroupIcon, LightBulbIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
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

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900">
              Navigating the
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text leading-normal">
                AI Search Revolution
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              At x<span className="italic">f</span>unnel, we're on a mission to help businesses thrive in a world where AI is rewriting the rules of online discovery
          </p>
          </motion.div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <div 
        className="relative z-10 min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'url("/images/future-of-ai-search-2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-light text-white mb-8">
              The AI Search Revolution
            </h2>
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-200">
                Traditional search engines used to rely on keywords and link rankings, but modern AI-powered engines—like ChatGPT, Perplexity, Claude, and Gemini - engage in real conversations, providing context-driven answers that reshape how people seek information.
              </p>
              <p className="text-gray-200">
                This evolution has created a serious challenge for companies everywhere. Conventional SEO tactics simply aren't enough anymore, and AI engines function largely as "black boxes," leaving businesses in the dark about how their content is interpreted or ranked.
              </p>
            </div>
          </motion.div>
            </div>
          </div>

      {/* Solution Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Introducing
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                x<span className="italic">f</span>unnel
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              Your Solution for the AI Era: A forward-thinking platform built to demystify AI search engines
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Deep ICP Understanding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-105 -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg p-2.5 mb-4">
                  <UserGroupIcon className="w-full h-full text-purple-600" />
        </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Deep ICP Understanding</h3>
                <p className="text-gray-600">
                  We don't just study keywords and algorithms—we delve into your Ideal Customer Profiles (ICPs) across various personas, industries, and geographies to craft AI-friendly queries tailored precisely to your audience.
                </p>
              </div>
            </motion.div>

            {/* Feature 2: AI Engine Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-105 -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg p-2.5 mb-4">
                  <ChartBarIcon className="w-full h-full text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">AI Engine Analysis</h3>
              <p className="text-gray-600">
                  x<span className="italic">f</span>unnel offers a 360-degree view across ChatGPT, Perplexity, Claude, and Gemini. You'll gain unprecedented insights into where your content appears, how it's ranked, and how users interact with it.
              </p>
            </div>
            </motion.div>

            {/* Feature 3: Actionable Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-105 -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg p-2.5 mb-4">
                  <LightBulbIcon className="w-full h-full text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                  No more guesswork. We present clear, data-driven steps to improve your visibility across AI platforms, so you can focus on strategic changes that truly make a difference.
              </p>
            </div>
            </motion.div>

            {/* Feature 4: Continuous Monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-105 -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg p-2.5 mb-4">
                  <ArrowPathIcon className="w-full h-full text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Continuous Monitoring</h3>
              <p className="text-gray-600">
                  The AI landscape changes fast—x<span className="italic">f</span>unnel keeps you ahead of the game with real-time monitoring and weekly updates, ensuring you're always ready to adapt.
              </p>
            </div>
            </motion.div>
          </div>
          </div>
        </div>

      {/* Why It Matters Section */}
      <div className="relative z-10 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/future-of-ai-vid.mp4" type="video/mp4" />
          </video>
          {/* Light overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Why x<span className="italic">f</span>unnel
              <span className="block mt-2 font-normal">
                Matters
              </span>
            </h2>
            <p className="mt-6 text-xl text-purple-100/90 max-w-2xl mx-auto">
              The shift to AI-powered search is not just a technological change—it's a fundamental transformation in how buyers discover and evaluate solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-4xl font-mono mb-2 text-[#2E0854]">266+</div>
              <div className="text-purple-100/80">Companies Analyzed</div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-4xl font-mono mb-2 text-[#2E0854]">500K+</div>
              <div className="text-purple-100/80">Responses Collected</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-4xl font-mono mb-2 text-[#2E0854]">2.1M+</div>
              <div className="text-purple-100/80">Citations Analyzed</div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
                  Businesses that fail to adapt risk being left behind, as AI engines increasingly influence purchasing decisions. 
                  <span className="block mt-4 text-purple-200">
                    x<span className="italic">f</span>unnel empowers you to take control of your AI search presence, ensuring your brand is accurately represented and effectively positioned to drive conversions.
                  </span>
                </p>
                <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-purple-100/90">
                  With x<span className="italic">f</span>unnel, you're not just optimizing for today's search engines—you're future-proofing your business for the AI-driven world of tomorrow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Meet Our
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Visionary Team
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              A team of futuristic entrepreneurs shaping the future of AI-powered discovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Neri Bluman */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-[1.02] -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="aspect-[4/3] mb-6 rounded-lg overflow-hidden">
                  <img 
                    src="/images/neri.jpeg" 
                    alt="Neri Bluman - Co-Founder & CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Neri Bluman</h3>
                <p className="text-gray-600 mb-4">
                  With a background in driving growth through innovative tech, Neri guides our strategic vision and champions x<span className="italic">f</span>unnel's mission to empower businesses in the AI era.
                </p>
                <a 
                  href="https://www.linkedin.com/in/neribluman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </motion.div>

            {/* Beeri Amiel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl transform transition-all duration-300 group-hover:scale-[1.02] -z-10" />
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div className="aspect-[4/3] mb-6 rounded-lg overflow-hidden">
                  <img 
                    src="/images/beeri.jpeg" 
                    alt="Beeri Amiel - Co-Founder & CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Beeri Amiel</h3>
                <p className="text-gray-600 mb-4">
                  Beeri leads the technical heart of x<span className="italic">f</span>unnel, ensuring our platform remains at the cutting edge of AI search analysis while delivering tangible results for our clients.
          </p>
            <a 
                  href="https://www.linkedin.com/in/beeri-amiel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn Profile
            </a>
          </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Ready to Take Control of Your
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Search Presence?
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-500">
              We can't wait to partner with you—and show the world just how powerful your brand can be when it's perfectly positioned for the new era of AI search.
            </p>
            <div className="mt-10 flex justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#3A0A6B] hover:to-[#A020F0] transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-105"
              >
                Start Now for Free
              </a>
            </div>
          </motion.div>
        </div>
    </div>
    </main>
  );
} 
