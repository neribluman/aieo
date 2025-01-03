import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'What is xfunnel | xfunnel',
  description: 'Learn about xfunnel - Your AI-powered sales optimization platform',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">What is xfunnel?</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-lg text-muted-foreground">
          [Overview content placeholder]
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <p className="text-lg text-muted-foreground">
          [Features content placeholder]
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground">
          [How it works content placeholder]
        </p>
      </section>
    </div>
  )
} 