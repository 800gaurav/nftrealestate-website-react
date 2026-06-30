import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Award, Users, Globe, TrendingUp, BarChart3,
  DollarSign, CheckCircle, Calendar, MapPin, Building2, Clock,
  ArrowUpRight, Check, Copy, Key, Laptop, Network, Briefcase, Lock,
  Rocket, ChevronRight, Menu, X, Landmark, FileText, HelpCircle,
  Phone, Mail, Heart, Leaf, Layers, ChevronDown
} from 'lucide-react';

const NftRealEstateLanding = () => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState('');
  
  // Counters for Slide 1
  const stats = [
    { value: "10+", label: "YEARS IN MARKET" },
    { value: "$2B+", label: "ASSETS MANAGED" },
    { value: "50k+", label: "PROPERTIES LISTED" },
    { value: "120+", label: "COUNTRIES PRESENT" },
    { value: "100k+", label: "HAPPY INVESTORS" }
  ];

  // Services for Slide 6
  const services = [
    { icon: Building2, title: "Real Estate Services", desc: "Global brokerage and high-value asset acquisition." },
    { icon: TrendingUp, title: "Property Investment", desc: "Strategic capital allocation in prime global markets." },
    { icon: Layers, title: "Property Management", desc: "End-to-end maintenance and tenant lifecycle management." },
    { icon: Rocket, title: "NFT Real Estate", desc: "Fractional ownership powered by blockchain technology." },
    { icon: DollarSign, title: "Digital Asset Services", desc: "Secure custody and trading of tokenized assets." },
    { icon: Landmark, title: "E-Commerce", desc: "Integrated marketplace for luxury lifestyle goods." },
    { icon: Globe, title: "Tour & Travel", desc: "Premium concierge and global travel experiences." },
    { icon: Landmark, title: "Banking Services", desc: "Decentralized finance and wealth management tools." },
    { icon: Award, title: "Education Services", desc: "Blockchain and real estate investment masterclasses." },
    { icon: Shield, title: "Insurance Services", desc: "Comprehensive risk coverage for physical/digital assets." },
    { icon: Briefcase, title: "Job Services", desc: "Global career opportunities in the Web3 ecosystem." },
    { icon: BarChart3, title: "Trading Services", desc: "Advanced tools for real-time asset exchange." },
    { icon: Leaf, title: "Agriculture Services", desc: "Sustainable land investment and agri-tech solutions." },
    { icon: Heart, title: "Health Services", desc: "Integrated wellness and healthcare access for members." },
    { icon: Users, title: "Business Consulting", desc: "Strategic advisory for enterprise digital transformation." }
  ];

  // Ranks & Rewards for Slide 12
  const ranks = [
    { rank: "Bronze", business: "$1,000", reward: "Welcome Kit", color: "from-amber-700 to-amber-900", icon: Award },
    { rank: "Silver", business: "$5,000", reward: "Android Mobile", color: "from-slate-400 to-slate-600", icon: Laptop },
    { rank: "Gold", business: "$20,000", reward: "Bangkok Tour", color: "from-yellow-500 to-amber-600", icon: Globe },
    { rank: "Diamond", business: "$50,000", reward: "Thailand 3N/4 Day + Car + Foreign D/P", color: "from-cyan-400 to-blue-500", icon: Shield },
    { rank: "Crown", business: "$100,000", reward: "Fortuner", color: "from-red-500 to-rose-600", icon: Award },
    { rank: "Ambassador", business: "$500,000", reward: "2% Royalty T/C", color: "from-purple-500 to-indigo-600", icon: Rocket }
  ];

  // Timeline for Slide 3
  const timeline = [
    { year: "2013", title: "Company Founded", desc: "Laid foundation for digital assets integration." },
    { year: "2015", title: "Commercial Expansion", desc: "Scaled properties portfolio across US." },
    { year: "2018", title: "Global Network", desc: "Opened corporate desks in EMEA and Asia." },
    { year: "2020", title: "Large Scale Ops", desc: "Optimized property portfolio and operations." },
    { year: "2022", title: "Digital Shift", desc: "First testnet of fractional property tokenization." },
    { year: "2024", title: "Blockchain R&D", desc: "Developed audited cross-chain contracts." },
    { year: "2026", title: "NFT Ecosystem", desc: "Launch of global decentralized real estate marketplace." }
  ];

  // Slide 8 Ecosystem Filter list
  const ecoTabs = [
    "Physical Property", "Asset Verification", "Blockchain Reg.", "Digital Ownership", "NFT Representation", "Global Access"
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="text-gray-100 font-sans min-h-screen relative overflow-hidden">
      
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* ========================================================================
          SLIDE 1: HERO SECTION
          ======================================================================== */}
      <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 z-10">
        {/* Background Skyline */}
        <div className="absolute inset-0 z-[-1] opacity-35 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-[#070b13]/80 to-transparent"></div>
        </div>

      

        {/* Hero Body Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center items-center my-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Invest in Real Estate.<br />
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Own it as an NFT.</span><br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent font-medium">Earn for Life.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed border border-yellow-500/20 bg-slate-950/50 backdrop-blur-md px-6 py-3 rounded-full inline-block"
          >
            Where Physical Real Estate Meets Blockchain Technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start Investing
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const aboutEl = document.getElementById('about');
                if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-slate-900/80 hover:bg-slate-950 border border-gray-800 hover:border-gray-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Bottom Counters & Footer Tag */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-y border-yellow-500/20 bg-slate-950/40 backdrop-blur-md p-6 rounded-2xl mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:border-r last:border-r-0 border-yellow-500/10 last:border-0 px-2">
                <p className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-1">{stat.value}</p>
                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs tracking-widest text-gray-500 uppercase">
            NFT REALESTATE CORP. | WWW.NFTREALESTATE.US | NEW YORK, USA
          </p>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 2: ABOUT US & AURUM TOWER
          ======================================================================== */}
      <section id="about" className="py-24 border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">About Us</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content cards */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-8 rounded-2xl transition-all duration-300 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Company Profile</h3>
                <p className="text-gray-300 leading-relaxed">
                  Founded in 2013, NFT RealEstate Corp. has been a pioneer in asset management for over a decade. Headquartered in New York, we manage a diverse portfolio of over <strong className="text-white">$2 Billion</strong> in global real estate assets. We combine traditional wealth structures with modern Web3 standards.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-8 rounded-2xl transition-all duration-300 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To democratize real estate investment by leveraging blockchain technology. We transform physical properties into digital NFTs, allowing investors worldwide to own fractional shares of premium assets with complete transparency, high security, and deep liquidity.
                </p>
              </div>
            </div>

            {/* Right Card: Aurum Tower */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-yellow-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                {/* Gold reflection effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Premium Asset</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">AURUM TOWER</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-red-400" /> Financial District, NY 10001
                    </p>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                    Tokenized
                  </span>
                </div>

                {/* Simulated Image */}
                {/* <div className="relative rounded-2xl overflow-hidden h-60 bg-[url('https://images.unsplash.com/photo-1542362567-b07eac790acd?q=80&w=800')] bg-cover bg-center mb-6 border border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs bg-slate-900/90 text-yellow-400 border border-yellow-500/20 px-2 py-1 rounded">
                      Office / Retail
                    </span>
                    <span className="text-lg font-bold text-white">$250,000,000 USD</span>
                  </div>
                </div> */}

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-gray-850">
                    <p className="text-gray-400 text-xs">Total Token Supply</p>
                    <p className="font-bold text-white mt-1">250,000,000</p>
                    <p className="text-[10px] text-gray-500">AURUM TOKENS</p>
                  </div>
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-gray-850">
                    <p className="text-gray-400 text-xs">Token Price</p>
                    <p className="font-bold text-yellow-400 mt-1">$1.00 USD</p>
                    <p className="text-[10px] text-gray-500">Fixed Rate</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-400">Funding Progress</span>
                    <span className="text-yellow-400">75% ($187,500,000 USD)</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Soft Cap: $100M</span>
                    <span>Hard Cap: $250M</span>
                  </div>
                </div>

                {/* Footer Badges */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-800 text-[10px] text-center font-bold text-gray-400">
                  <div className="bg-slate-950/60 p-1.5 rounded flex flex-col items-center gap-1 border border-gray-800">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    KYC Verified
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded flex flex-col items-center gap-1 border border-gray-800">
                    <Shield className="h-3.5 w-3.5 text-yellow-400" />
                    Audit Pass
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded flex flex-col items-center gap-1 border border-gray-800">
                    <Layers className="h-3.5 w-3.5 text-blue-400" />
                    On-Chain
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded flex flex-col items-center gap-1 border border-gray-800">
                    <Zap className="h-3.5 w-3.5 text-teal-400" />
                    24/7 Trade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 3: COMPANY JOURNEY (TIMELINE)
          ======================================================================== */}
      <section id="journey" className="py-24 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Company Journey</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">More than a decade of Real Estate Excellence</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          {/* Timeline Scrollable Row */}
          <div className="relative overflow-x-auto pb-8 pt-4 scrollbar-thin">
            <div className="flex min-w-[1000px] justify-between items-start relative px-10">
              
              {/* Line Connector */}
              <div className="absolute top-10 left-12 right-12 h-1 bg-gradient-to-r from-yellow-500/10 via-yellow-500 to-yellow-500/10 z-0"></div>

              {timeline.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-36 text-center relative z-10">
                  <div className="text-lg font-bold text-yellow-400 mb-2 bg-[#070b13] px-2 rounded">{item.year}</div>
                  
                  {/* Point */}
                  <div className="w-5 h-5 rounded-full bg-slate-950 border-4 border-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/50 mb-4 transition-transform hover:scale-125 duration-300 cursor-pointer"></div>
                  
                  <h4 className="text-sm font-bold text-white mb-1 px-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 px-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Annual report metrics cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 text-yellow-400">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Annual Revenue</p>
                <p className="text-2xl font-extrabold text-white mt-1">$8.7B <span className="text-xs text-emerald-400 font-semibold">+14.6% YoY</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                <DollarSign className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Income</p>
                <p className="text-2xl font-extrabold text-white mt-1">$2.1B <span className="text-xs text-emerald-400 font-semibold">+18.3% YoY</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Global Employees</p>
                <p className="text-2xl font-extrabold text-white mt-1">12,500+ <span className="text-xs text-emerald-400 font-semibold">+9.7% YoY</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 4: LEADERSHIP & ADVISORY BOARD
          ======================================================================== */}
      {/* <section id="leadership" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Leadership & Advisory Board</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
         
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/20 p-8 rounded-2xl text-center backdrop-blur-md group transition-all duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-yellow-500/25 group-hover:border-yellow-500/50 transition-colors bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300')] bg-cover bg-center">
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Michael Anderson</h3>
              <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-4">Chairman â€“ Global Strategy</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Leads strategic planning, innovation initiatives, global partnerships, and long-term organizational growth.
              </p>
            </div>

   
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/20 p-8 rounded-2xl text-center backdrop-blur-md group transition-all duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-yellow-500/25 group-hover:border-yellow-500/50 transition-colors bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300')] bg-cover bg-center">
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Rahul Sharma</h3>
              <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-4">Director â€“ Global Operations</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Responsible for operations management, stakeholder engagement, strategic partnerships, and international expansion.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/20 p-8 rounded-2xl text-center backdrop-blur-md group transition-all duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-yellow-500/25 group-hover:border-yellow-500/50 transition-colors bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300')] bg-cover bg-center">
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Fahed Ahmed Saeed AlAwadhi</h3>
              <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-4">Director â€“ Infrastructure</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                15+ years of infrastructure development experience. MBA (Hons.) Strategic Management, B.Sc Civil Engineering.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ========================================================================
          SLIDE 5: GLOBAL PRESENCE
          ======================================================================== */}
      <section id="presence" className="py-24 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Global Presence</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Strategic Corporate Hubs</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dubai */}
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md group transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=200')] bg-cover opacity-15 group-hover:scale-110 transition-transform duration-500"></div>
              <Building2 className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Dubai, UAE</h3>
              <p className="text-xs text-gray-400">Control Tower, 21st Floor, Motor City, Dubai</p>
            </div>

            {/* New York */}
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md group transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=200')] bg-cover opacity-15 group-hover:scale-110 transition-transform duration-500"></div>
              <Landmark className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">New York, USA</h3>
              <p className="text-xs text-gray-400">1250 Broadway, Suite 3600, NY 10001</p>
            </div>

            {/* London */}
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md group transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=200')] bg-cover opacity-15 group-hover:scale-110 transition-transform duration-500"></div>
              <Building2 className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">London, UK</h3>
              <p className="text-xs text-gray-400">30 Churchill Place, Canary Wharf, E14 5EU</p>
            </div>

            {/* Toronto */}
            <div className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md group transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=200')] bg-cover opacity-15 group-hover:scale-110 transition-transform duration-500"></div>
              <MapPin className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Toronto, Canada</h3>
              <p className="text-xs text-gray-400">100 King Street West, Suite 5600, Toronto</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 6: SERVICES ECOSYSTEM
          ======================================================================== */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Services Ecosystem</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Comprehensive Digital & Physical Asset Solutions</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="bg-slate-950/60 border border-gray-800 hover:border-yellow-500/30 p-5 rounded-xl backdrop-blur-sm hover:scale-[1.02] hover:bg-slate-950 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-500/20 text-yellow-400 w-fit mb-3 group-hover:bg-yellow-500/20 transition-all">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{srv.title}</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 7: GLOBAL NETWORK ARCHITECTURE
          ======================================================================== */}
      <section id="network" className="py-24 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Global Network Architecture</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Scalable 4-Level Ecosystem Framework</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          {/* Custom Interactive Node Tree */}
          <div className="border border-gray-800 bg-slate-950/60 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col items-center gap-12 relative">
              {/* Root Node */}
              <div className="border-2 border-yellow-400 bg-slate-900 text-yellow-400 px-8 py-3.5 rounded-xl font-bold tracking-wider text-sm shadow-lg shadow-yellow-400/10">
                GLOBAL PLATFORM
              </div>

              {/* Connecting vertical line */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-yellow-400 to-gray-700"></div>

              {/* Level 2 Nodes (Left/Right Divisions) */}
              <div className="grid grid-cols-2 gap-8 sm:gap-24 w-full relative">
                {/* Horizontal branch line */}
                <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-gray-700"></div>
                
                {/* Left Branch */}
                <div className="flex flex-col items-center gap-8 relative">
                  <div className="absolute top-[-8px] left-1/2 w-0.5 h-8 bg-gray-700"></div>
                  <div className="border border-emerald-400 bg-slate-950 text-emerald-400 px-6 py-2.5 rounded-lg font-bold text-xs shadow-md shadow-emerald-400/5 mt-4">
                    LEFT DIVISION
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-700"></div>
                  
                  {/* Level 3 Left Subdivisions */}
                  <div className="grid grid-cols-2 gap-4 w-full relative">
                    <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-gray-850"></div>
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mb-2"></div>
                      <p className="text-[11px] font-bold text-gray-300">Regional A</p>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mb-2"></div>
                      <p className="text-[11px] font-bold text-gray-300">Regional B</p>
                    </div>
                  </div>
                </div>

                {/* Right Branch */}
                <div className="flex flex-col items-center gap-8 relative">
                  <div className="absolute top-[-8px] left-1/2 w-0.5 h-8 bg-gray-700"></div>
                  <div className="border border-blue-400 bg-slate-950 text-blue-400 px-6 py-2.5 rounded-lg font-bold text-xs shadow-md shadow-blue-400/5 mt-4">
                    RIGHT DIVISION
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-700"></div>
                  
                  {/* Level 3 Right Subdivisions */}
                  <div className="grid grid-cols-2 gap-4 w-full relative">
                    <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-gray-850"></div>
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mb-2"></div>
                      <p className="text-[11px] font-bold text-gray-300">Regional C</p>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mb-2"></div>
                      <p className="text-[11px] font-bold text-gray-300">Regional D</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center italic text-xs text-gray-400 mt-6 bg-[#070b13] px-4 py-2 border border-gray-800 rounded-lg">
                "Unlimited depth supporting millions of global stakeholders"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 8: NFT-POWERED REAL ESTATE ECOSYSTEM (PROCESS FLOW)
          ======================================================================== */}
      <section id="ecosystem" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">NFT-Powered Real Estate Ecosystem</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Real World Value. Digital Future.</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          {/* Process Flow Cards (4 Steps) */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl relative group">
              <span className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <Building2 className="h-10 w-10 text-yellow-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">Physical Asset</h3>
              <p className="text-xs text-gray-400 leading-relaxed">A premium real estate asset with intrinsic, verified real-world value.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl relative group">
              <span className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <Network className="h-10 w-10 text-blue-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">Digital Representation</h3>
              <p className="text-xs text-gray-400 leading-relaxed">The asset is tokenized into fractional, unique digital tokens representing ownership.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl relative group">
              <span className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <Layers className="h-10 w-10 text-purple-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">NFT Token</h3>
              <p className="text-xs text-gray-400 leading-relaxed">A unique cryptographic NFT is minted, locking the legal ownership deeds on-chain.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl relative group">
              <span className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                4
              </span>
              <Shield className="h-10 w-10 text-teal-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">On-Chain Ownership</h3>
              <p className="text-xs text-gray-400 leading-relaxed">The NFT is hosted on-chain, securing peer-to-peer fractional trading and transparent ownership.</p>
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="bg-slate-950/60 border border-gray-800 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex flex-wrap gap-2 justify-center border-b border-gray-800 pb-4 mb-6">
              {ecoTabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === idx
                      ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10"
                      : "bg-slate-900/60 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-center max-w-3xl mx-auto">
              {activeTab === 0 && <p className="text-gray-300 text-sm">Every asset is chosen from key international metros, focusing on stable occupancy, rental yields, and high capital appreciation.</p>}
              {activeTab === 1 && <p className="text-gray-300 text-sm">Strict double-audit mechanisms involving legal title checks, structural reports, and third-party evaluations are complete before tokenization.</p>}
              {activeTab === 2 && <p className="text-gray-300 text-sm">Incorporating real-world SPV (Special Purpose Vehicle) corporate frames mapped directly to on-chain smart contract distributions.</p>}
              {activeTab === 3 && <p className="text-gray-300 text-sm">Enjoy full fractional rights. Yields from rent and property value increases are split proportionally and directly to owners' wallets.</p>}
              {activeTab === 4 && <p className="text-gray-300 text-sm">Unique non-fungible tokens represent your direct legal stake, allowing visual ownership tracking and portfolio customization.</p>}
              {activeTab === 5 && <p className="text-gray-300 text-sm">Zero border friction. Buy, trade, or transfer fractional real estate ownership 24/7 globally without legal overhead.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 9: TECHNOLOGY INFRASTRUCTURE
          ======================================================================== */}
      <section id="infrastructure" className="py-24 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Technology Infrastructure</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Architecture blueprint rendering */}
            <div className="bg-slate-950 border border-yellow-500/20 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent)] pointer-events-none"></div>
              
              <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
                <Network className="h-5 w-5 text-yellow-400" /> Enterprise Blockchain Architecture
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {/* Layer 1 */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-gray-800">
                  <div className="text-blue-400 font-bold uppercase mb-1">Blockchain Layer</div>
                  <div className="text-gray-400">Distributed Ledger â€¢ Decentralized Nodes â€¢ Consensus â€¢ P2P</div>
                </div>

                {/* Layer 2 */}
                <div className="bg-slate-900/65 p-4 rounded-xl border border-gray-800">
                  <div className="text-teal-400 font-bold uppercase mb-1">Smart Contracts Layer</div>
                  <div className="text-gray-400">Automation â€¢ Business Logic â€¢ Yield Execs â€¢ Audited Code</div>
                </div>

                {/* Layer 3 */}
                <div className="bg-slate-900/65 p-4 rounded-xl border border-gray-800">
                  <div className="text-red-400 font-bold uppercase mb-1">Security Layer</div>
                  <div className="text-gray-400">Identity Management â€¢ E2E Encryption â€¢ Access Controls â€¢ KYC/AML</div>
                </div>

                {/* Layer 4 */}
                <div className="bg-slate-900/65 p-4 rounded-xl border border-gray-800">
                  <div className="text-purple-400 font-bold uppercase mb-1">Global Access Layer</div>
                  <div className="text-gray-400">Web Portal â€¢ Mobile Apps â€¢ API Gateways â€¢ IoT Integrations</div>
                </div>
              </div>
            </div>

            {/* Right: Detailed explanations */}
            <div className="space-y-6">
              <div className="border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/20 transition-colors bg-slate-950/40">
                <h4 className="text-lg font-bold text-yellow-400 mb-2">Blockchain Layer</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Immutable distributed ledger for secure property registration, token issuance, and NFT minting operations.</p>
              </div>

              <div className="border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/20 transition-colors bg-slate-950/40">
                <h4 className="text-lg font-bold text-teal-400 mb-2">Smart Contracts</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Automated execution of property yields distributions, peer-to-peer transfers, and secondary pool operations.</p>
              </div>

              <div className="border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/20 transition-colors bg-slate-950/40">
                <h4 className="text-lg font-bold text-red-400 mb-2">Security Layer</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Enterprise-grade multi-signature vault architecture, automated compliance checking, and KYC/AML protocols.</p>
              </div>

              <div className="border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/20 transition-colors bg-slate-950/40">
                <h4 className="text-lg font-bold text-purple-400 mb-2">Global Access</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Secure cross-platform entry through standard web portals, custom API access, and native mobile clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 10: INVESTMENT PACKAGES
          ======================================================================== */}
      <section id="packages" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Investment Packages</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Start your journey â€” minimum investment $12</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Starter */}
            <div className="border border-slate-800 bg-slate-950/60 backdrop-blur-md rounded-2xl p-6 relative flex flex-col justify-between hover:border-teal-500/30 transition-all">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full border border-teal-500/20">Entry Level</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Starter</h3>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">$12</span>
                  <span className="text-xs text-gray-400"> USD</span>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 pt-6 border-t border-gray-900">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400" /> Staking Income (0.5% 1% daily)</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400" /> No signup bonus</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400" /> Team Growth Bonus 1%</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-400" /> Basic Dashboard Access</li>
                </ul>
              </div>
              <button onClick={() => navigate('/dashboard/funds/deposit?package=S1')} className="w-full bg-slate-900 hover:bg-slate-800 border border-gray-800 text-white font-bold py-2.5 rounded-xl text-xs mt-8 transition-colors">
                Select Starter
              </button>
            </div>

            {/* Silver */}
            <div className="border border-slate-800 bg-slate-950/60 backdrop-blur-md rounded-2xl p-6 relative flex flex-col justify-between hover:border-blue-500/30 transition-all">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">Grow Faster</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Silver</h3>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">$25</span>
                  <span className="text-xs text-gray-400"> USD</span>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 pt-6 border-t border-gray-900">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> All Starter Benefits</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Higher Staking Rate</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Team Growth Bonus 2%</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Priority Support 24/7</li>
                </ul>
              </div>
              <button onClick={() => navigate('/dashboard/funds/deposit?package=S2')} className="w-full bg-slate-900 hover:bg-slate-800 border border-gray-800 text-white font-bold py-2.5 rounded-xl text-xs mt-8 transition-colors">
                Select Silver
              </button>
            </div>

            {/* Gold */}
            <div className="border border-yellow-500/30 bg-slate-950/60 backdrop-blur-md rounded-2xl p-6 relative flex flex-col justify-between hover:border-yellow-500/50 transition-all shadow-lg shadow-yellow-500/5">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-400">
                Most Popular
              </span>
              <div>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Gold</h3>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">$50</span>
                  <span className="text-xs text-gray-400"> USD</span>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 pt-6 border-t border-gray-900">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-400" /> All Silver Benefits</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-400" /> 10% Matching Income</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-400" /> Full Rank Eligibility</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-400" /> Dedicated Account Manager</li>
                </ul>
              </div>
              <button onClick={() => navigate('/dashboard/funds/deposit?package=S3')} className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 rounded-xl text-xs mt-8 transition-colors">
                Select Gold
              </button>
            </div>

            {/* Platinum */}
            <div className="border border-slate-800 bg-slate-950/60 backdrop-blur-md rounded-2xl p-6 relative flex flex-col justify-between hover:border-purple-500/30 transition-all">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20">Best Value</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Platinum</h3>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">$100</span>
                  <span className="text-xs text-gray-400"> USD</span>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 pt-6 border-t border-gray-900">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> All Benefits Unlocked</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 3% Max Team Bonus</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> All 4 Income Streams</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> VIP Investor Benefits</li>
                </ul>
              </div>
              <button onClick={() => navigate('/dashboard/funds/deposit?package=S4')} className="w-full bg-slate-900 hover:bg-slate-800 border border-gray-800 text-white font-bold py-2.5 rounded-xl text-xs mt-8 transition-colors">
                Select Platinum
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 11: INCOME PLAN (4 EARNING STREAMS)
          ======================================================================== */}
      <section id="incomes" className="py-24 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Income Plan</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">4 powerful earning streams â€” working 24/7 for you</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Stream 1 */}
            <div className="border border-teal-500/20 bg-slate-950/60 p-6 rounded-2xl flex gap-5 items-start">
              <div className="bg-teal-500/10 p-3.5 rounded-xl text-teal-400 border border-teal-500/20 flex-shrink-0">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-white">Staking Income</h3>
                  <span className="text-xs font-bold bg-teal-500/15 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded">0.5% 1% Daily</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  40% of joining amount is auto-staked. Earn daily returns of 0.5% to 1% directly in your staking wallet, compounding automatically for exponential growth.
                </p>
              </div>
            </div>

            {/* Stream 2 */}
            <div className="border border-blue-500/20 bg-slate-950/60 p-6 rounded-2xl flex gap-5 items-start">
              <div className="bg-blue-500/10 p-3.5 rounded-xl text-blue-400 border border-blue-500/20 flex-shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-white">Rank / Reward</h3>
                  <span className="text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">10% Direct</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Earn 10% instant direct commission on every new member you introduce to the platform. No referral caps or limitsâ€”enjoy infinite earning possibilities.
                </p>
              </div>
            </div>

            {/* Stream 3 */}
            <div className="border border-yellow-500/20 bg-slate-950/60 p-6 rounded-2xl flex gap-5 items-start">
              <div className="bg-yellow-500/10 p-3.5 rounded-xl text-yellow-400 border border-yellow-500/20 flex-shrink-0">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-white">Team Growth Bonus</h3>
                  <span className="text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">1%â€“3% Team</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Earn 1% to 3% bonus on your entire team's total cumulative business volume. Requires a minimum of 10 direct referrals and a $100 package level to unlock the full 3% margin.
                </p>
              </div>
            </div>

            {/* Stream 4 */}
            <div className="border border-orange-500/20 bg-slate-950/60 p-6 rounded-2xl flex gap-5 items-start">
              <div className="bg-orange-500/10 p-3.5 rounded-xl text-orange-400 border border-orange-500/20 flex-shrink-0">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-white">Matching Income</h3>
                  <span className="text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded">10% Matching</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Earn 10% matching income on your team's binary pairs. Calculations start at a 2:1/1:2 binary ratio, then convert to a standard 1:1 ratio. Only binary pair matching cap applies.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 12: RANK & REWARDS
          ======================================================================== */}
      <section id="rewards" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Rank & Rewards</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Rise through the ranks â€” earn lifestyle-changing rewards</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranks.map((rank, idx) => {
              const IconComp = rank.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-slate-950 to-slate-900 border border-gray-800 p-6 rounded-2xl hover:border-yellow-500/20 transition-all flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${rank.color} p-4 rounded-full text-white mb-5 shadow-lg shadow-black/40`}>
                    <IconComp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{rank.rank}</h3>
                  <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-4">Business: {rank.business}</p>
                  
                  <div className="w-full bg-slate-950/80 border border-gray-900 py-3 px-4 rounded-xl text-sm font-semibold text-gray-300">
                    {rank.reward}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

   

      {/* ========================================================================
          SLIDE 14: HOW TO GET STARTED
          ======================================================================== */}
      <section id="getstarted" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">How to Get Started</h2>
            <p className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">4 simple steps to begin your real estate investment journey</p>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-950/60 border border-gray-850 p-6 rounded-2xl relative hover:border-yellow-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-sm font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">01</span>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Register</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Create your account using a referral link. Complete KYC verification and secure your decentralized wallet credentials.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/60 border border-gray-850 p-6 rounded-2xl relative hover:border-yellow-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-sm font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">02</span>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Choose Package</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Select your preferred investment tier, ranging from $12 to $100, to unlock different earning potentials.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/60 border border-gray-850 p-6 rounded-2xl relative hover:border-yellow-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-sm font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">03</span>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Start Earning</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your staking rewards begin from day one, accumulating directly into your yield account. Compounding works 24/7.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950/60 border border-gray-850 p-6 rounded-2xl relative hover:border-yellow-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-sm font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">04</span>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Build & Scale</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Share the referral opportunity, unlock higher network tier bonuses, and scale your passive earning portfolios.
                </p>
              </div>
            </div>

          </div>

          {/* Join Now Bar */}
          <div className="mt-12 bg-gradient-to-r from-yellow-500 to-amber-600 p-6 rounded-2xl shadow-xl shadow-yellow-500/5 text-slate-950 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
            <div>
              <p className="font-extrabold text-lg">Ready to begin your journey?</p>
              <p className="text-xs text-slate-900 font-semibold mt-0.5">Register with your upline's referral link today</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-black/20"
            >
              Join Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SLIDE 15: FOOTER SECTION
          ======================================================================== */}
      <footer className="py-16 bg-slate-950 border-t border-gray-900 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <img src="/Images/logo1.png" alt="NFT RealEstate Logo" className="h-28 w-auto mx-auto mb-4 object-contain" />
          
          <h2 className="text-xl font-bold text-white mb-2">NFT RealEstate Corp.</h2>
          <p className="text-xs text-yellow-400 tracking-wider uppercase font-semibold mb-10">The Future of Property Ownership is Here</p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm text-gray-400 mb-12">
            <div className="flex flex-col items-center gap-2">
              <Globe className="h-5 w-5 text-yellow-400" />
              <a href="https://www.nftrealestate.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                www.nftrealestate.us
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="h-5 w-5 text-yellow-400" />
              <a href="mailto:supportnftrealestate@gmail.com" className="hover:text-white transition-colors">
                supportnftrealestate@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              <span>1250 Broadway, NY 10001</span>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 text-[11px] text-gray-500">
            Â© 2025 NFT REALESTATE CORP. | ALL RIGHTS RESERVED | EST. 2013
          </div>
        </div>
      </footer>

    </div>
  );
};

export default NftRealEstateLanding;



