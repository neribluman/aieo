import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Terms & Conditions | xfunnel',
  description: 'Terms and conditions for using xfunnel platform',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <section className="mb-8">
          <h2>1. Acceptance of Terms</h2>
          <p>[Terms acceptance content placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>2. Use of Service</h2>
          <p>[Service usage terms placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>3. User Responsibilities</h2>
          <p>[User responsibilities content placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>4. Intellectual Property</h2>
          <p>[IP rights content placeholder]</p>
        </section>
      </div>
    </div>
  )
} 