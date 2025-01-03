'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Clock, Globe, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function Section5() {
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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-bl from-indigo-50 to-purple-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.h2 
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-gray-900"
            >
              Let's
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                Connect
              </span>
            </motion.h2>
            
            <motion.p
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>

            <motion.div
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={false}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
                >
                  <div className="mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{info.title}</h3>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
              <form className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-white/50"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white/50"
                  />
                  <Input
                    type="text"
                    placeholder="Company (optional)"
                    className="w-full bg-white/50"
                  />
                  <Textarea
                    placeholder="Your message"
                    className="w-full bg-white/50 min-h-[120px]"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-white hover:opacity-90 transition-opacity"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const contactInfo = [
  {
    title: "Email Us",
    description: "Our friendly team is here to help",
    icon: <Mail className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Response Time",
    description: "We usually respond within 24 hours",
    icon: <Clock className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Global Support",
    description: "Available in multiple time zones",
    icon: <Globe className="w-5 h-5 text-purple-600" />,
  },
]; 