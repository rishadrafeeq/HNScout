export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
      <div className="bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              HN Scout (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, and safeguard your information when you use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Device type and operating system</li>
                  <li>Referring website information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Local Storage</h3>
                <p className="text-gray-700">
                  We use your browser&apos;s local storage to save your reading list and preferences. 
                  This data is stored locally on your device and is not transmitted to our servers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To analyze usage patterns and improve our website</li>
              <li>To ensure security and prevent abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              HN Scout uses the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Hacker News API (Algolia)</strong> - For fetching Hacker News stories and comments</li>
              <li><strong>Vercel</strong> - For hosting and analytics (if applicable)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your information. However, 
              no method of transmission over the internet is 100% secure. We strive to use 
              commercially acceptable means to protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Object to processing of your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Local Storage</h2>
            <p className="text-gray-700">
              We use local storage to save your reading list and preferences. This data remains 
              on your device and is not shared with third parties. You can clear this data 
              through your browser settings at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us through 
              our GitHub repository or by email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
