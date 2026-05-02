import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Award, Gift, Repeat, Star } from 'lucide-react';

const IncomePlans = () => {
  const [activeTab, setActiveTab] = useState('signup');

  const incomeTypes = [
    { id: 'signup', name: 'Signup Bonus', icon: Gift },
    { id: 'trade', name: 'Trade Income', icon: DollarSign },
    { id: 'referral', name: 'Referral Income', icon: Users },
    { id: 'level', name: 'Level Income', icon: TrendingUp },
    { id: 'appraisal', name: 'Appraisal Income', icon: Award },
    { id: 'rank', name: 'Rank Reward', icon: Star }
  ];

  return (
    <div className="min-h-screen  text-white py-16 px-4 mt-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Jupiter Income Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover multiple ways to earn with Jupiter's comprehensive income streams designed for sustainable wealth creation.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {incomeTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === type.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
          {/* Signup Bonus */}
          {activeTab === 'signup' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Gift className="h-8 w-8 mr-3 text-blue-400" />
                Signup Bonus
              </h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                      <Gift className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Free Registration Bonus</h3>
                      <p className="text-gray-300">Get $5 bonus just for signing up with Jupiter!</p>
                      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-lg font-medium text-green-400">$5 Signup Bonus</p>
                        <p className="text-sm text-gray-400">No investment required</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Level Income */}
          {activeTab === 'level' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <TrendingUp className="h-8 w-8 mr-3 text-green-400" />
                Level Income
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { level: 1, percentage: '20%', range: '<3,000 $' , Investment: 'Unlock' },
                  { level: 2, percentage: '15%', range: '3,000 $', Investment: 'Level 2 Unlock' },
                  { level: 3, percentage: '10%', range: '5,000 $', Investment: 'Level 3 Unlock' },
                  { level: 4, percentage: '10%', range: '8,000 $', Investment: 'Level 4 Unlock' },
                  { level: 5, percentage: '5%', range: '20,000 $', Investment: 'Level 5-10 Unlock' },
                  { level: 6, percentage: '2%', range: '40,000 $', Investment: 'Level 11-20 Unlock' }
                ].map((item) => (
                  <div key={item.level} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-400 transition-colors">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-green-500/20 rounded-full">
                        <span className="text-xl font-bold text-green-400">{item.level}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Level {item.level}</h3>
                      <p className="text-2xl font-bold text-green-400 mb-2">Income {item.percentage}</p>
                      <p className="text-gray-300">Level Business</p>
                      <p className="text-lg font-medium">{item.range}</p>
                      <p className="text-gray-300">Investment</p>
                      <span className="text-lg font-medium">{item.Investment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trade Income */}
          {activeTab === 'trade' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <DollarSign className="h-8 w-8 mr-3 text-yellow-400" />
                Trade Income
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  { percentage: '1%', range: '20–500 $' },
                  { percentage: '1.5%', range: '500–1,000 $' },
                  { percentage: '2%', range: '1,000–2,000 $' },
                  { percentage: '2.5%', range: '2,000–5,000 $' },
                  { percentage: '3%', range: '5,000–10,000 $' },
                  { percentage: '5%', range: '10,000–50,000 $' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-colors">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-yellow-500/20 rounded-full">
                        <DollarSign className="h-6 w-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Level {index + 1}</h3>
                      <p className="text-2xl font-bold text-yellow-400 mb-2">{item.percentage}</p>
                      <p className="text-gray-300">Investment</p>
                      <p className="text-lg font-medium">{item.range}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referral Income */}
          {activeTab === 'referral' && (
            
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <DollarSign className="h-8 w-8 mr-3 text-purple-400" />
                Referral Income
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  { percentage: '3%', range: '20–1,000 $' },
                  { percentage: '5%', range: '1,000–5,000 $' },
                  { percentage: '8%', range: '5,000–10,000 $' },
                  { percentage: '10%', range: '10,000–50,000 $' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-colors">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-yellow-500/20 rounded-full">
                        <DollarSign className="h-6 w-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Level {index + 1}</h3>
                      <p className="text-2xl font-bold text-purple-400 mb-2">{item.percentage}</p>
                      <p className="text-gray-300">Investment</p>
                      <p className="text-lg font-medium">{item.range}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appraisal Income */}
          {activeTab === 'appraisal' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Award className="h-8 w-8 mr-3 text-blue-400" />
                Appraisal Income
              </h2>
              <div className="mb-6 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Conditions</h3>
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                    <Repeat className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-gray-300">50% Power Leg + 50% Other Leg</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { bonus: '$5', powerLeg: '25,00', otherLeg: '25,00', totalBusiness: '5,000$' },
                  { bonus: '$10', powerLeg: '5,000', otherLeg: '5,000', totalBusiness: '10,000$' },
                  { bonus: '$15', powerLeg: '75,00', otherLeg: '75,00', totalBusiness: '15,000$' },
                  { bonus: '$30', powerLeg: '15,000', otherLeg: '15,000', totalBusiness: '30,000$' },
                  { bonus: '$50', powerLeg: '25,000', otherLeg: '25,000', totalBusiness: '50,000$' },
                  { bonus: '$100', powerLeg: '50,000', otherLeg: '50,000', totalBusiness: '1,00,000$' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-500/20 rounded-full">
                        <Award className="h-6 w-6 text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold text-blue-400 mb-2">Bonus : {item.bonus}</p>
                      <h5 className="text-gray-300">Power Leg : {item.powerLeg}</h5>
                      <h5 className="text-gray-300">Other Leg : {item.otherLeg}</h5>
                      <h3 className="text-xl font-semibold mb-2">Total Business : {item.totalBusiness}</h3>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rank Reward */}
          {activeTab === 'rank' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Star className="h-8 w-8 mr-3 text-yellow-400" />
                Rank Reward
              </h2>
              <div className="mb-6 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Conditions</h3>
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
                    <Repeat className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-gray-300">40% Power Leg + 30% Other Leg + 30% Rest Leg</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { reward: '$50', business: '10,000 $' },
                  { reward: '$100', business: '25,000 $' },
                  { reward: '$200', business: '50,000 $' },
                  { reward: '$500', business: '1,00,000 $' },
                  { reward: '$12,00', business: '2,00,000 $' },
                  { reward: '$25,00', business: '5,00,000 $' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-colors">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-yellow-500/20 rounded-full">
                        <Star className="h-6 w-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Rank {index + 1}</h3>
                      <p className="text-2xl font-bold text-yellow-400 mb-2">{item.reward}</p>
                      <p className="text-gray-300">Business Volume</p>
                      <p className="text-lg font-medium">{item.business}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Maximize Your Earnings with Jupiter</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            With multiple income streams and a structured reward system, Jupiter provides unparalleled opportunities for wealth creation in the blockchain space.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Start Earning Today
          </button>
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

export default IncomePlans;