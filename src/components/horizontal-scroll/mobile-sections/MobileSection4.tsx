'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, FileText, Globe, Book } from 'lucide-react';

const citations = [
  {
    type: "Citation Analysis",
    description: "Identify what drives AI recommendations",
    icon: <FileText className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Content Strategy",
    description: "Shape the narrative that matters",
    icon: <Globe className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Impact Patterns",
    description: "Understand citation influence",
    icon: <LinkIcon className="w-5 h-5 text-purple-600" />,
  },
  {
    type: "Authority Building",
    description: "Establish lasting market presence",
    icon: <Book className="w-5 h-5 text-purple-600" />,
  },
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
            Build Your
            <span className="block mt-2 mb-1 pb-3 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Playbook
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Decode the patterns behind influential citations to craft your perfect market presence.
          </p>
        </div>

        {/* Video Container */}
        <div className="w-full aspect-video bg-white/90 rounded-xl shadow-2xl overflow-hidden border border-purple-100/20 mb-16">
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/videos/section4.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          {citations.map((citation, index) => (
            <div key={citation.type} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
              <div className="mt-1">
                {citation.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{citation.type}</h3>
                <p className="text-sm text-gray-500">{citation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 