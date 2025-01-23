'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, Baby, Footprints, Scale, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from "@/components/ui/input"

export function PricingCards() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isThinking, setIsThinking] = useState(false);

  const handleTryPlan = (planName: string) => {
    setSelectedPlan(planName);
    setShowEmailModal(true);
    setCurrentStep(1);
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsThinking(true);
    
    // Simulate "thinking" for 1.5 seconds
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsThinking(false);
    setCurrentStep(2);
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
        body: JSON.stringify({ 
          email, 
          url: companyName,
          plan: selectedPlan 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setIsSuccess(false);
          setEmail('');
          setCompanyName('');
          setSelectedPlan(null);
          setCurrentStep(1);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="h-full"
          >
            <Card 
              className={`flex flex-col h-full relative bg-white/95 border ${
                plan.name === "Pro" ? "border-[#2E0854]/50 shadow-lg shadow-[#2E0854]/20" : "border-gray-200"
              }`}
            >
              {plan.name === "Pro" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2E0854] text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center flex-none">
                <div className="mx-auto mb-4 p-3 rounded-full bg-[#2E0854]/10">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px] flex items-center justify-center">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#2E0854] via-[#4a0f8b] to-[#9400D3] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 mb-6">
                  {plan.highlights.map((highlight) => (
                    <div key={highlight.label} className="text-center">
                      <div className="text-xl font-bold bg-gradient-to-r from-[#2E0854] via-[#4a0f8b] to-[#9400D3] bg-clip-text text-transparent">
                        {highlight.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {highlight.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#2E0854]/20 pt-4 flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-sm ${
                        feature.includes("Actionable AI conversion") 
                          ? "bg-gradient-to-r from-[#2E0854]/10 to-transparent p-2 rounded-lg font-medium" 
                          : ""
                      }`}>
                        <Check className="w-4 h-4 text-[#2E0854] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex-none pt-4">
                <Button 
                  className={`w-full group ${
                    plan.name === "Enterprise" 
                      ? "border-[#2E0854]/50 hover:border-[#2E0854]" 
                      : "bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#4a0f8b] hover:to-[#a020f0]"
                  }`}
                  variant={plan.name === "Enterprise" ? "outline" : "default"}
                  onClick={() => handleTryPlan(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog.Root open={showEmailModal} onOpenChange={setShowEmailModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                   bg-white rounded-xl p-8 w-full max-w-md shadow-2xl
                                   z-[101] animate-in fade-in-0 zoom-in-95">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {!isSuccess ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900">Almost there! 🚀</h2>
                  
                  {currentStep === 1 && (
                    <>
                      <p className="text-gray-600">
                        Let's analyze your AI presence and help you improve it.
                      </p>
                      <form onSubmit={handleCompanySubmit} className="space-y-4">
                        <Input
                          type="text"
                          placeholder="Enter your company or product name"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-3"
                        />
                        <button
                          type="submit"
                          disabled={isThinking}
                          className="w-full px-4 py-3 bg-gradient-to-r from-[#2E0854] to-[#9400D3] 
                                   text-white rounded-lg hover:from-[#3A0A6B] hover:to-[#A020F0] 
                                   transition-all duration-300 disabled:opacity-50"
                        >
                          {isThinking ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Analyzing scope...</span>
                            </div>
                          ) : (
                            'Analyze'
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="space-y-4 text-gray-600">
                        <p>
                          We'll analyze your AI presence by making hundreds of calls per response. 
                          With 16 responses, this will take about an hour to complete thoroughly.
                        </p>
                        <p className="text-sm">
                          We'll send you a single email (no spam!) when your analysis is ready.
                        </p>
                      </div>
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
                            'Get Started'
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-gray-900">Thank you! ✨</h2>
                  <p className="text-gray-600">
                    We'll send your analysis results in about an hour. Keep an eye on your inbox!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

const plans = [
  {
    name: "Free",
    description: "We love small websites",
    price: "$0",
    period: false,
    icon: <Baby className="w-6 h-6 text-[#2E0854]" />,
    highlights: [
      { value: "16", label: "Questions" },
      { value: "16", label: "Responses" },
      { value: "1", label: "Answer Engine" },
    ],
    features: [
      "Optimized Question Generation",
      "Buying Journey Analysis",
      "Response Analysis",
      "Competitor Tracking",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Pro",
    description: "Just started getting some traction?",
    price: "$199",
    period: true,
    icon: <Footprints className="w-6 h-6 text-[#2E0854]" />,
    highlights: [
      { value: "∞", label: "Questions" },
      { value: "1,000", label: "Responses" },
      { value: "5", label: "Answer Engines" },
    ],
    features: [
      "Everything in Free, plus:",
      "Citation Analysis",
      "Extra credits at $0.1/response",
      "Priority Support",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Enterprise",
    description: "Let's grow your AI conversion together",
    price: "Contact Us",
    period: false,
    icon: <Scale className="w-6 h-6 text-[#2E0854]" />,
    highlights: [
      { value: "1hr", label: "Weekly Meeting" },
      { value: "AI", label: "Conversion Focus" },
      { value: "∞", label: "Support" },
    ],
    features: [
      "Everything in Pro, plus:",
      "Weekly 1-hour strategy sessions with our AI experts",
      "Actionable AI conversion recommendations",
      "Implementation guidance and support",
    ],
    buttonText: "Contact Sales",
  },
]; 