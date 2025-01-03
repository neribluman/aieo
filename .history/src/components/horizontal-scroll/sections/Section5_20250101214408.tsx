'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function Section5() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Implement form submission logic
    console.log(data);
  };

  return (
    <div 
      ref={sectionRef}
      className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-8 will-change-transform relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2 
                initial={false}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-light text-gray-900"
              >
                Let's Start a
                <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
                  Conversation
                </span>
              </motion.h2>
              
              <motion.p
                initial={false}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-600"
              >
                Ready to take control of your AI presence? We're here to help.
              </motion.p>
            </div>

            <motion.form
              initial={false}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <Input
                  {...register('name', { required: true })}
                  placeholder="Your Name"
                  className="bg-white/50 border-purple-100 focus:border-purple-300"
                />
                <Input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="Email Address"
                  className="bg-white/50 border-purple-100 focus:border-purple-300"
                />
                <Input
                  {...register('company')}
                  placeholder="Company (Optional)"
                  className="bg-white/50 border-purple-100 focus:border-purple-300"
                />
                <Textarea
                  {...register('message', { required: true })}
                  placeholder="Your Message"
                  className="bg-white/50 border-purple-100 focus:border-purple-300 min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:opacity-90 transition-opacity"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>
          </motion.div>

          {/* Right Column - Decorative Elements */}
          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 rounded-full blur-2xl" />
              <div className="absolute inset-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/contact-decoration.svg"
                  alt="Decorative contact illustration"
                  className="w-2/3 h-2/3 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 