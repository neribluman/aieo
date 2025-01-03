'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, FileText, Globe, Book } from 'lucide-react';

const citations = [
  {
    type: "Website Links",
    description: "Direct references to your website pages",
    icon: <LinkIcon className="w-6 h-6 text-purple-600" />
  },
  {
    type: "Documentation",
    description: "Technical docs and guides",
    icon: <FileText className="w-6 h-6 text-purple-600" />
  },
  {
    type: "Online Reviews",
    description: "User feedback and testimonials",
    icon: <Globe className="w-6 h-6 text-purple-600" />
  },
  {
    type: "Content Marketing",
    description: "Blogs, articles, and resources",
    icon: <Book className="w-6 h-6 text-purple-600" />
  }
];

export function MobileSection4() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -right-24 -top-24 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Text Content */}
        <div className="space-y-6 text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900">
            Uncover Your
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Citation Sources
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Discover and analyze the sources AI engines use when discussing your product.
          </p>
        </div>

        {/* Citations - Grid Layout */}
        <div className="grid grid-cols-1 gap-3">
          {citations.map((citation, index) => (
            <motion.div
              key={citation.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100/20"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                    <div className="w-5 h-5">{citation.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-base">{citation.type}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{citation.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Product Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 relative"
        >
          <div className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative w-full p-4">
              <img
                src="/images/product(2).svg"
                alt="Citation analysis dashboard"
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 