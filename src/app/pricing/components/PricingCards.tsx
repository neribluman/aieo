'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Check } from "lucide-react"
import { Baby, Footprints, Scale } from "lucide-react"
import { motion } from "framer-motion"

export function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index }}
        >
          <Card 
            className={`flex flex-col relative bg-white/95 border ${
              plan.name === "Pro" ? "border-[#2E0854]/50 shadow-lg shadow-[#2E0854]/20" : "border-gray-200"
            }`}
          >
            {plan.name === "Pro" && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2E0854] text-white text-sm rounded-full">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-[#2E0854]/10">
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#2E0854] via-[#4a0f8b] to-[#9400D3] bg-clip-text text-transparent">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground ml-2">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
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
              <div className="border-t border-[#2E0854]/20 pt-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#2E0854]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full group ${
                  plan.name === "Enterprise" 
                    ? "border-[#2E0854]/50 hover:border-[#2E0854]" 
                    : "bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#4a0f8b] hover:to-[#a020f0]"
                }`}
                variant={plan.name === "Enterprise" ? "outline" : "default"}
                asChild
              >
                <Link href="/login" className="flex items-center justify-center">
                  {plan.buttonText}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
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
    description: "Great for growing companies",
    price: "Contact Us",
    period: false,
    icon: <Scale className="w-6 h-6 text-[#2E0854]" />,
    highlights: [
      { value: "∞", label: "Questions" },
      { value: "Custom", label: "Responses" },
      { value: "5", label: "Answer Engines" },
    ],
    features: [
      "Everything in Pro, plus:",
      "Improve Ranking",
      "Custom integrations",
      "Dedicated support team",
    ],
    buttonText: "Contact Sales",
  },
] 