import React, { useEffect, useState } from 'react';
import {
  ArrowRight, Play, Shield, Zap, Award,
  Users, Globe, TrendingUp, BarChart3, DollarSign, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ------------------- First Hero Section (Crypto Trading) -------------------
export const Hero = () => {
  const [currentPrice, setCurrentPrice] = useState(42850.45);
  const [priceChange, setPriceChange] = useState(0);
const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100;
      setCurrentPrice(prev => prev + change);
      setPriceChange(change);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Success Orbit Begins With
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Jupiter</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              The Jupiter is a modern blockchain-based business opportunity
              designed to combine crypto technology with sustainable networking rewards.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Powered by the Jupiter (JUP) token on the Solana blockchain,
              this project ensures fast, secure, and decentralized transactions
              while rewarding members through multiple income streams.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
              onClick={()=> navigate('/login')}
              >
                <span>Start Trading Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
          
            </div>
          </div>

          {/* Right */}
          <div className="relative">
              <img src="/Images/logo2.png" alt="SecureTrade Logo" className="h-full w-full object-fill" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ------------------- Second Hero Section (Jupiter) -------------------
export const HeroJupiter = () => {
  const [currentPrice, setCurrentPrice] = useState(1.55);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.1;
      setCurrentPrice(prev => prev + change);
      setPriceChange(change);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, text: 'Bank-Level Security' },
    { icon: Zap, text: 'Lightning Fast Trades' },
    { icon: Award, text: 'Award Winning Platform' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

        {/* Company Profile Section */}
        <div className="mt-24 grid md:grid-cols-1 gap-8">


          {/* Future of Jupiter Section */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-400" />
              Future of Jupiter
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Merges earning potential with blockchain economy.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">7 Billion supply, demand increasing with adoption.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Members earn from both MLM incomes and token appreciation.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Long-term wealth building opportunity.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Everyone is Investing Section */}
        <div className="mt-12 bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
            Why Everyone is Investing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-blue-400 mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trust & Transparency</h3>
              <p className="text-gray-400">Built on blockchain technology ensuring complete transparency in all transactions.</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-purple-400 mb-4">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Dual Earning Potential</h3>
              <p className="text-gray-400">Daily earning opportunities combined with valuable token growth over time.</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
              <div className="text-green-400 mb-4">
                <Globe className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Access</h3>
              <p className="text-gray-400">Decentralized transactions, global access, and multiple income streams for everyone.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// export { Hero, HeroJupiter };
