import { Title } from "@tremor/react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Title className="text-4xl font-light mb-8">Terms and Conditions</Title>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last Updated: 1/3/2025</p>
          
          <p className="text-gray-600 mb-8">
            Welcome to xfunnel AI Inc. ("xfunnel," "we," "us," or "our"). These Terms and Conditions ("Terms") 
            govern your access to and use of our website, tools, and services (collectively, the "Services"). 
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to 
            these Terms, you may not use our Services.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">By using xfunnel's Services, you confirm that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You are at least 18 years old or the legal age of majority in your jurisdiction.</li>
              <li>You have the authority to enter into these Terms.</li>
              <li>If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-600 mb-4">
              xfunnel provides a proprietary AI-powered tool that analyzes how AI search engines (e.g., ChatGPT, Claude, 
              Perplexity, Gemini, etc.) perceive and present information about companies. Our Services include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><span className="font-medium">Question Generation & Analysis:</span> Creating and analyzing targeted questions based on Ideal Customer Profiles (ICPs).</li>
              <li><span className="font-medium">Metrics Tracking:</span> Monitoring company mentions, average position, sentiment analysis, and feature scores.</li>
              <li><span className="font-medium">Buying Journey Analysis:</span> Tracking performance across key stages of the customer journey.</li>
              <li><span className="font-medium">Citation Analysis:</span> Identifying and analyzing sources used by AI engines.</li>
              <li><span className="font-medium">Actionable Insights:</span> Providing weekly dashboards, content optimization recommendations, and technical improvements.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide accurate, complete, and up-to-date information when using our Services.</li>
              <li>Use the Services only for lawful purposes and in compliance with these Terms.</li>
              <li>Not misuse or exploit the Services for unauthorized purposes, including but not limited to:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Reverse engineering, decompiling, or disassembling our software.</li>
                  <li>Scraping, harvesting, or extracting data from our Services.</li>
                  <li>Distributing malware or engaging in any activity that disrupts the Services.</li>
                </ul>
              </li>
              <li>Not use the Services to infringe on the intellectual property or privacy rights of others.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content, software, algorithms, and materials provided through the Services, including but not limited 
              to text, graphics, logos, and AI models, are the property of xfunnel or its licensors and are protected 
              by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Reproduce, distribute, or create derivative works without our prior written consent.</li>
              <li>Use our trademarks, logos, or branding without explicit permission.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Data Collection and Use</h2>
            <p className="text-gray-600">
              By using our Services, you acknowledge and agree to our collection, use, and sharing of data as described 
              in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Fees and Payment</h2>
            <p className="text-gray-600 mb-4">If you subscribe to a paid plan, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Pay all fees as outlined in your subscription plan.</li>
              <li>Provide accurate billing information and update it as necessary.</li>
              <li>Authorize us to charge your payment method for recurring fees.</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Failure to pay may result in suspension or termination of your access to the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">To the fullest extent permitted by law, xfunnel shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
              <li>Loss of profits, data, or business opportunities arising from your use of the Services.</li>
              <li>Any errors, inaccuracies, or omissions in the insights or recommendations provided.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Indemnification</h2>
            <p className="text-gray-600 mb-4">
              You agree to indemnify and hold harmless xfunnel, its affiliates, and their respective officers, directors, 
              employees, and agents from any claims, liabilities, damages, or expenses arising out of:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Your use of the Services.</li>
              <li>Your violation of these Terms.</li>
              <li>Your infringement of any third-party rights.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to suspend or terminate your access to the Services at any time, with or without notice, 
              for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Violation of these Terms.</li>
              <li>Non-payment of fees.</li>
              <li>Engaging in fraudulent or harmful activities.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">10. Dispute Resolution</h2>
            <p className="text-gray-600">
              Any disputes arising out of or related to these Terms shall be resolved through binding arbitration in 
              accordance with the rules of the American Arbitration Association (AAA). The arbitration shall take place 
              in San Francisco, California, and the decision of the arbitrator shall be final and binding.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-600">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these Terms from time to time. Any changes will be posted on this page with an updated 
              "Last Updated" date. Your continued use of the Services after such changes constitutes your acceptance 
              of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at{" "}
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