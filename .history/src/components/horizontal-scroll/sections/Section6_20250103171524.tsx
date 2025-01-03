import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, FileText, Book, Lightbulb, Puzzle } from 'lucide-react';
import Link from 'next/link';

export function Section6() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div 
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-48 -top-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-48 -bottom-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          {/* CTA Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Know What
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                AI Thinks About You
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Start your 14-day free trial today and discover how AI engines perceive your product.
            </motion.p>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2E0854] to-[#9400D3] 
                         text-white rounded-lg hover:from-[#3A0A6B] hover:to-[#A020F0] 
                         transition-all duration-300 shadow-lg shadow-[#2E0854]/20"
              >
                <span className="mr-2">Try it free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Documents Grid */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2 grid grid-cols-2 gap-4"
          >
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={false}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/60 
                         transition-colors duration-200 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center
                               group-hover:scale-110 transition-transform duration-200">
                    {doc.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const documents = [
  {
    title: "Getting Started",
    description: "Quick guide to set up and start using our platform",
    icon: <Book className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Documentation",
    description: "Detailed API references and technical guides",
    icon: <FileText className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Use Cases",
    description: "Real-world examples and success stories",
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Integration Guide",
    description: "Step-by-step integration instructions",
    icon: <Puzzle className="w-5 h-5 text-purple-600" />,
  },
]; 