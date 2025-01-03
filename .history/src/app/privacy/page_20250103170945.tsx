import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Privacy Policy | xfunnel',
  description: 'Privacy policy and data handling practices for xfunnel platform',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <section className="mb-8">
          <h2>1. Information We Collect</h2>
          <p>[Information collection details placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>2. How We Use Your Information</h2>
          <p>[Information usage details placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>3. Data Protection</h2>
          <p>[Data protection measures placeholder]</p>
        </section>

        <section className="mb-8">
          <h2>4. Your Rights</h2>
          <p>[User rights regarding data placeholder]</p>
        </section>
      </div>
    </div>
  )
} 