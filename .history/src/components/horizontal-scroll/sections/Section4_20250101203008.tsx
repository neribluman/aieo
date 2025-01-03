'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export function Section4() {
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
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-8 will-change-transform"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={false}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Ready to
            <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text">
              Get Started?
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={false}
                animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/60 border border-purple-100 hover:border-purple-200 transition-all duration-200 hover:shadow-lg"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  perspective: 1000,
                  WebkitPerspective: 1000,
                }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-[#2E0854]">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 text-left mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#9400D3]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-white hover:opacity-90 transition-opacity duration-200">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center mt-8"
          >
            <button className="group flex items-center gap-2 text-[#2E0854] hover:text-[#9400D3] transition-colors duration-200">
              Compare all features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small businesses",
    features: [
      "Basic AI Analysis",
      "Weekly Reports",
      "Email Support",
      "1 Product Analysis"
    ]
  },
  {
    name: "Pro",
    price: "$99",
    description: "Ideal for growing companies",
    features: [
      "Advanced AI Analysis",
      "Daily Reports",
      "Priority Support",
      "5 Product Analysis"
    ]
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For large organizations",
    features: [
      "Custom AI Models",
      "Real-time Reports",
      "24/7 Support",
      "Unlimited Analysis"
    ]
  }
]; 