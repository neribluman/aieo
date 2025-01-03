import { Title } from "@tremor/react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Title className="text-4xl font-light mb-8">Privacy Policy</Title>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last Updated: 1/3/2025</p>
          
          <p className="text-gray-600 mb-8">
            At xfunnel AI Inc. ("xfunnel," "we," "us," or "our"), we are committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and share your information when you use our Services.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><span className="font-medium">Personal Information:</span> Name, email address, company name, job title, and other contact details you provide when signing up or using our Services.</li>
              <li><span className="font-medium">Usage Data:</span> Information about how you interact with our Services, including IP addresses, browser type, device information, and pages visited.</li>
              <li><span className="font-medium">AI Analysis Data:</span> Data related to your use of our AI analysis tools, such as questions generated, metrics tracked, and insights provided.</li>
              <li><span className="font-medium">Payment Information:</span> Billing details, such as credit card information, for paid subscriptions.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide, maintain, and improve our Services.</li>
              <li>Generate insights and recommendations based on your use of the Services.</li>
              <li>Communicate with you about updates, promotions, and support.</li>
              <li>Comply with legal obligations and enforce our Terms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">3. Sharing Your Information</h2>
            <p className="text-gray-600">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><span className="font-medium">Service Providers:</span> Third-party vendors who assist us in providing the Services, such as payment processors and cloud hosting providers.</li>
              <li><span className="font-medium">Legal Authorities:</span> When required by law or to protect our rights and property.</li>
              <li><span className="font-medium">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600">
              We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. 
              These measures include encryption, access controls, and regular security audits. However, no method of transmission over 
              the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-600">
              We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access, correct, or delete your personal information.</li>
              <li>Object to or restrict the processing of your information.</li>
              <li>Request a copy of your data in a portable format.</li>
              <li>Withdraw consent for data processing, where applicable.</li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise these rights, please contact us at hello@xfunnel.ai.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries other than your own, where data protection laws may differ. 
              By using our Services, you consent to such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600">
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. 
              Your continued use of the Services after such changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@xfunnel.ai" className="text-purple-600 hover:text-purple-700">
                hello@xfunnel.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 