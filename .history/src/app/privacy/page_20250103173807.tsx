import { Title } from "@tremor/react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Title className="text-4xl font-light mb-8">Privacy Policy</Title>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600">
              We collect information that you provide directly to us, information we obtain automatically when 
              you use our services, and information from other sources. This includes:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Account information (name, email, password)</li>
              <li>Usage data and analytics</li>
              <li>Device information and identifiers</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Protect our rights and property</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600">
              We do not share your personal information with third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>In connection with a business transfer or transaction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect the security of your 
              personal information. However, please note that no method of transmission over the Internet or 
              method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600">
              You have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to track activity on our services and hold certain 
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
              being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not intended for use by children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you become aware that a child has provided us with 
              personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 