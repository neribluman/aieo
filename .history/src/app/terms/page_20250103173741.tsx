import { Title } from "@tremor/react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Title className="text-4xl font-light mb-8">Terms & Conditions</Title>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing and using our services, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600">
              Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in our services</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600">
              Our services are provided "as is". We make no warranties, expressed or implied, and hereby 
              disclaim and negate all other warranties including, without limitation, implied warranties 
              or conditions of merchantability, fitness for a particular purpose, or non-infringement of 
              intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-600">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use 
              or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Revisions and Errata</h2>
            <p className="text-gray-600">
              The materials appearing in our services could include technical, typographical, or photographic 
              errors. We do not warrant that any of the materials are accurate, complete or current. We may 
              make changes to the materials contained in our services at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Links</h2>
            <p className="text-gray-600">
              We have not reviewed all of the sites linked to our services and are not responsible for the 
              contents of any such linked site. The inclusion of any link does not imply endorsement by us 
              of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Modifications</h2>
            <p className="text-gray-600">
              We may revise these terms of service at any time without notice. By using our services you 
              are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 