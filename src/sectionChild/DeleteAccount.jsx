import React from "react";


const DeleteAccount = () => {
  return (

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Account Deletion Policy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

            <section>
              <p>
                At <strong>JupiterToken</strong>, we respect your right to control
                your personal data. Users can request the deletion of their
                account at any time by following the process described below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                How to Request Account Deletion
              </h2>
              <p>
                To delete your account, please send a deletion request from
                your registered email address with the following details:
              </p>

              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Registered Email ID</li>
                <li>User ID / Referral Code</li>
                <li>Registered Mobile Number</li>
                <li>Reason for account deletion (optional)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Where to Send the Request
              </h2>
              <p>
                Please email your account deletion request to:
              </p>
              <p className="mt-2 font-medium text-gray-800">
                📧 support@jupiter.com
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Account Deletion Timeline
              </h2>
              <p>
                Once we receive your request, your account will be reviewed and
                permanently deleted within <strong>35 working days</strong>.
              </p>
              <p className="mt-2 text-gray-600">
                During this period, our team may contact you for verification
                purposes to ensure account security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Data Retention
              </h2>
              <p>
                After account deletion, all personal data associated with your
                account will be permanently removed from our systems, except
                where retention is required by applicable laws or regulations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Important Notes
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Account deletion is irreversible</li>
                <li>Any remaining balance or rewards will be forfeited</li>
                <li>You will no longer have access to your account after deletion</li>
              </ul>
            </section>

          </div>
        </div>
      </div>

  );
};

export default DeleteAccount;
