import React from "react";


const PrivacyPolicy = () => {
  return (
   
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                1. Introduction
              </h2>
              <p>
                JupiterToken ("we", "our", "us") respects your privacy and is
                committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, and safeguard
                your data when you use our website, mobile application, and
                related services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal information (name, email, phone number)</li>
                <li>User ID and referral information</li>
                <li>Device and usage information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and maintain our services</li>
                <li>To verify user identity and prevent fraud</li>
                <li>To communicate updates and support messages</li>
                <li>To improve platform performance and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect
                your data against unauthorized access, alteration, disclosure,
                or destruction. However, no system is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                5. Sharing of Information
              </h2>
              <p>
                We do not sell or rent your personal data to third parties.
                Information may be shared only when required by law or to
                provide essential services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                6. Cookies & Tracking
              </h2>
              <p>
                We may use cookies and similar technologies to enhance user
                experience, analyze usage, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                7. User Responsibilities
              </h2>
              <p>
                Users are responsible for maintaining the confidentiality of
                their account credentials. Any activity performed using your
                account will be considered authorized by you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                9. Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy
                Policy, please contact us at:
              </p>
              <p className="mt-2 font-medium text-gray-800">
                📧 support@jupiter.com
              </p>
            </section>

          </div>
        </div>
      </div>

  );
};

export default PrivacyPolicy;
