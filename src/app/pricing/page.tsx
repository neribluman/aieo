import { PricingCards } from "./components/PricingCards"

export default function PricingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
      {/* Background Layer */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        {/* Floating gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/10 to-transparent blur-3xl"
            style={{
              top: '20%',
              left: '60%',
              animation: 'float 20s ease-in-out infinite alternate',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              perspective: 1000,
              willChange: 'transform'
            }}
          />
        </div>
      </div>

      {/* Content Layer */}
      <div 
        className="relative z-10" 
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="py-24">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900">
              Simple, transparent
              <span className="block mt-2 font-normal bg-gradient-to-r from-[#2E0854] to-[#9400D3] text-transparent bg-clip-text leading-normal pb-1">
                pricing for everyone
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always know what you'll pay.
            </p>
          </div>

          <PricingCards />
        </div>
      </div>
    </main>
  )
} 