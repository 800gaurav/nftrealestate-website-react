import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, Users, Gift, AlertCircle, Calendar, Download } from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('signup');

  const sections = [
    { id: 'signup', title: 'Signup & Bonus', icon: Gift },
    { id: 'deposit', title: 'Deposits', icon: DollarSign },
    { id: 'withdrawal', title: 'Withdrawals', icon: Download },
    { id: 'fees', title: 'Fees & Charges', icon: DollarSign },
    { id: 'operations', title: 'Operations', icon: Clock },
    { id: 'restrictions', title: 'Restrictions', icon: XCircle }
  ];

  return (
    <div className="min-h-screen mt-16 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using NFT RealEstate's services
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span className="text-sm">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
          {/* Signup & Bonus Section */}
          {activeSection === 'signup' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Gift className="h-6 w-6 mr-3 text-blue-400" />
                Signup & Bonus
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Free Registration</h3>
                      <p className="text-gray-300">Signup is absolutely free with no hidden costs.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Signup Bonus</h3>
                      <p className="text-gray-300">All new users receive a $5 bonus upon registration.</p>
                      <div className="mt-3 bg-blue-500/10 p-3 rounded-lg inline-flex items-center">
                        <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
                        <span className="font-medium">$5 Signup Bonus</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <XCircle className="h-6 w-6 text-red-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Inactive Users</h3>
                      <p className="text-gray-300">Inactive users cannot refer new members to the platform.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Live Business Requirement</h3>
                      <p className="text-gray-300">All benefits depend on having active, live business on the platform.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposits Section */}
          {activeSection === 'deposit' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-3 text-green-400" />
                Deposit Policies
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                    Deposit Range
                  </h3>
                  <p className="text-gray-300 mb-4">Minimum deposit: $20 â€“ Maximum deposit: $50,000 per user</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-400">Minimum</p>
                      <p className="text-xl font-bold text-green-400">$20</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-400">Maximum</p>
                      <p className="text-xl font-bold text-green-400">$50,000</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    Deposit Fees
                  </h3>
                  <p className="text-gray-300">Deposit fees are determined by the payment platform and may vary.</p>
                </div>
              </div>
            </div>
          )}

          {/* Withdrawals Section */}
          {activeSection === 'withdrawal' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Download className="h-6 w-6 mr-3 text-blue-400" />
                Withdrawal Policies
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                    Minimum Withdrawal
                  </h3>
                  <p className="text-gray-300">Minimum withdrawal amount is $20.</p>
                  <div className="mt-3 bg-blue-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">Minimum: $20</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                    Withdrawal Multiples
                  </h3>
                  <p className="text-gray-300">Withdrawals must be in multiples of $10.</p>
                  <div className="mt-3 bg-blue-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">Multiples of: $10</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    Withdrawal Currency
                  </h3>
                  <p className="text-gray-300">Profit withdrawals are processed only in USDT (BEP20 network).</p>
                  <div className="mt-3 flex items-center bg-yellow-500/10 p-3 rounded-lg">
                    <span className="font-medium">USDT (BEP20) only</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fees & Charges Section */}
          {activeSection === 'fees' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-3 text-red-400" />
                Fees & Charges
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-red-400 mr-2" />
                    Withdrawal Charge
                  </h3>
                  <p className="text-gray-300">A 10% charge applies to all withdrawals.</p>
                  <div className="mt-3 bg-red-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">10% withdrawal charge</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-red-400 mr-2" />
                    Fund Transfer Charge
                  </h3>
                  <p className="text-gray-300">A 5% charge applies to internal fund transfers.</p>
                  <div className="mt-3 bg-red-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">5% transfer charge</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    Deposit Fees
                  </h3>
                  <p className="text-gray-300">Deposit fees vary depending on the payment platform used.</p>
                </div>
              </div>
            </div>
          )}

          {/* Operations Section */}
          {activeSection === 'operations' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-3 text-purple-400" />
                Operational Policies
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-blue-400 mr-2" />
                    Withdrawal Timing
                  </h3>
                  <p className="text-gray-300">Withdrawals are processed daily until 7:00 PM.</p>
                  <div className="mt-3 bg-blue-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">Until 7:00 PM daily</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-blue-400 mr-2" />
                    Income Updates
                  </h3>
                  <p className="text-gray-300">Income updates occur between 11:00 PM â€“ 11:59 PM daily.</p>
                  <div className="mt-3 bg-blue-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">11:00 PM â€“ 11:59 PM</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-400 mr-2" />
                    Weekend Policies
                  </h3>
                  <p className="text-gray-300">No ROI or Appraisal income is processed on Saturdays and Sundays.</p>
                  <div className="mt-3 bg-yellow-500/10 p-3 rounded-lg inline-flex items-center">
                    <span className="font-medium">No income on weekends</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    Capping Policy
                  </h3>
                  <p className="text-gray-300">Working and non-working capping is removed. Only binary pair matching keeps its configured cap.</p>
                  <div className="mt-3 bg-red-500/10 p-3 rounded-lg">
                    <p className="font-medium">Binary Pair Matching Cap Only</p>
                    <div className="flex mt-2">
                      <div className="pr-4 border-r border-gray-700">
                        <p className="text-sm text-gray-400">Working/Non-working</p><p className="font-bold">No cap</p>
                      </div>
                      <div className="pl-4">
                        <p className="text-sm text-gray-400">Binary Pair</p><p className="font-bold">Capped</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Restrictions Section */}
          {activeSection === 'restrictions' && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <XCircle className="h-6 w-6 mr-3 text-red-400" />
                Account Restrictions
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <XCircle className="h-6 w-6 text-red-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Inactive Accounts</h3>
                      <p className="text-gray-300">Inactive users cannot refer new members or earn referral income.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <XCircle className="h-6 w-6 text-red-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Live Business Requirement</h3>
                      <p className="text-gray-300">All benefits and earnings depend on maintaining active, live business on the platform.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Withdrawal Restrictions</h3>
                      <p className="text-gray-300">Withdrawals have minimum amounts, multiples, and specific currency requirements.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Weekend Restrictions</h3>
                      <p className="text-gray-300">No ROI or Appraisal income is processed on Saturdays and Sundays.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Acceptance Section */}
        <div className="mt-12 bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Acceptance of Terms</h2>
          <p className="text-gray-300 text-center mb-6">
            By using NFT RealEstate's platform and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              I Accept the Terms
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
