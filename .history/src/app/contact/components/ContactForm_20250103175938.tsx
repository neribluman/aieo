'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'contact',
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-3 bg-white/50 border-gray-200 rounded-xl
                        focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                        hover:bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-3 bg-white/50 border-gray-200 rounded-xl
                        focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                        hover:bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        <Select
          value={formData.subject}
          onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
          required
        >
          <SelectTrigger className="w-full px-4 py-3 bg-white/50 border-gray-200 rounded-xl
                                  focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                                  hover:bg-white/80 backdrop-blur-sm">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Your message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          className="min-h-[150px] w-full px-4 py-3 bg-white/50 border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-[#2E0854]/20 transition-all duration-300
                    hover:bg-white/80 backdrop-blur-sm"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-4 bg-gradient-to-r from-[#2E0854] to-[#9400D3] rounded-xl
                  text-white font-medium hover:from-[#3A0A6B] hover:to-[#A020F0]
                  transition-all duration-300 shadow-lg shadow-[#2E0854]/20
                  hover:shadow-[#2E0854]/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Sending...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
} 