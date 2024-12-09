'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Bot } from "lucide-react";

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Grid and orbs background remains the same */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      {/* Previous orbs code remains... */}

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12 w-full"
          >
            {/* Title section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-geist-sans font-light tracking-tight text-gray-900">
                The AI has formed
                <motion.span 
                  className="block mt-2 font-normal bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
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
            </motion.div>

            {/* Enhanced Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-full max-w-2xl mx-auto"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl">
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-sm font-medium text-gray-500">
                        Product URL
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 
                                      group-hover:opacity-5 blur-xl transition-all duration-700" />
                        <div className="relative flex items-center">
                          <Bot className="absolute left-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="url"
                            placeholder="Enter your product URL"
                            className="pl-10 py-6 text-lg bg-white/50 border-gray-200 rounded-lg
                                     focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                          <Search className="absolute right-3 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-500">
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email for the full report"
                        className="py-6 text-lg bg-white/50 border-gray-200 rounded-lg
                                 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full py-6 text-lg font-medium rounded-lg bg-gradient-to-r 
                             from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
                             text-white transition-all duration-500 shadow-[0_8px_30px_rgb(59,130,246,0.2)]
                             hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)]"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Reveal AI's Perspective</span>
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
