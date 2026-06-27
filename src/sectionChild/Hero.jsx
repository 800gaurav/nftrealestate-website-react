import { useEffect, useState } from 'react';
import {
  ArrowRight, Shield, Zap, Award, Users, Globe,
  TrendingUp, BarChart3, DollarSign, CheckCircle, Building2, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── MAIN HERO ──────────────────────────────────────────────────────────────
export const Hero = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({ years: 0, assets: 0, properties: 0, investors: 0 });

  useEffect(() => {
    const targets = { years: 10, assets: 2, properties: 50, investors: 100 };
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        years: Math.round(targets.years * progress),
        assets: Math.round(targets.assets * progress * 10) / 10,
        properties: Math.round(targets.properties * progress),
        investors: Math.round(targets.investors * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: `${count.years}+`, label: "Years in Market" },
    { value: `$${count.assets}B+`, label: "Assets Managed" },
    { value: `${count.properties}k+`, label: "Properties Listed" },
    { value: `${count.investors}k+`, label: "Happy Investors" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-400 text-sm font-medium">
              <Building2 className="h-4 w-4" /> NFT RealEstate Corp. · Est. 2013
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Invest in Real Estate.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Own it as an NFT.
              </span>{" "}
              Earn for Life.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Where Physical Real Estate Meets Blockchain Technology. Fractional ownership
              of premium global properties — powered by NFT and secured on blockchain.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
              1250 Broadway, Suite 3600, New York, NY 10001
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
              >
                Start Investing Now <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-colors">
                <p className="text-4xl font-extrabold text-cyan-400">{s.value}</p>
                <p className="text-slate-400 text-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            { icon: Shield, text: "Bank-Level Security" },
            { icon: Zap, text: "Blockchain-Powered" },
            { icon: Globe, text: "120+ Countries" },
            { icon: Award, text: "10+ Years in Market" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-full px-5 py-2.5 text-sm text-slate-300">
              <Icon className="h-4 w-4 text-cyan-400" /> {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── ABOUT / WHY INVEST ────────────────────────────────────────────────────
export const HeroJupiter = () => {
  const navigate = useNavigate();

  const offices = [
    { city: "New York, USA", address: "1250 Broadway, Suite 3600, NY 10001" },
    { city: "Dubai, UAE", address: "Control Tower, 21st Floor, Motor City" },
    { city: "London, UK", address: "30 Churchill Place, Canary Wharf, E14 5EU" },
    { city: "Toronto, Canada", address: "100 King Street West, Suite 5600" },
  ];

  const journey = [
    { year: "2013", title: "Company Founded" },
    { year: "2015", title: "Commercial Expansion" },
    { year: "2018", title: "Global Network" },
    { year: "2020", title: "Large Scale Ops" },
    { year: "2022", title: "Digital Shift" },
    { year: "2024", title: "Blockchain R&D" },
    { year: "2026", title: "NFT Ecosystem" },
  ];

  return (
    <section className="bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* About */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium mb-4">
              About Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              A Decade of Real Estate Excellence
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Founded in 2013, NFT RealEstate Corp. has been a pioneer in asset management for over a decade.
              Headquartered in New York, we manage a diverse portfolio of over <span className="text-white font-semibold">$2 Billion</span> in global real estate assets.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our mission is to democratize real estate investment by leveraging blockchain technology.
              We transform physical properties into digital NFTs, allowing investors worldwide to own
              fractional shares of premium assets with complete transparency and liquidity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingUp, label: "Staking Income", value: "0.5%–1% Daily", color: "text-emerald-400" },
              { icon: Users, label: "Referral Income", value: "10% Direct", color: "text-blue-400" },
              { icon: BarChart3, label: "Team Growth", value: "1%–3% Bonus", color: "text-purple-400" },
              { icon: DollarSign, label: "Matching Income", value: "10% Binary", color: "text-orange-400" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-slate-500 transition-colors">
                <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                <p className="text-slate-400 text-xs">{item.label}</p>
                <p className={`font-bold text-lg ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Journey */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Company Journey</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {journey.map((j, i) => (
              <div key={j.year} className={`flex items-center gap-2 ${i === journey.length - 1 ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-slate-900 border-slate-700'} border rounded-full px-4 py-2`}>
                <span className="text-cyan-400 font-bold text-sm">{j.year}</span>
                <span className="text-slate-300 text-sm">{j.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Invest */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <BarChart3 className="h-6 w-6 text-purple-400" /> Why Everyone is Investing
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Trust & Transparency", desc: "Built on blockchain ensuring complete transparency in all property transactions and ownership records.", color: "text-blue-400", border: "hover:border-blue-500" },
              { icon: Zap, title: "Dual Earning Potential", desc: "Daily staking income from real estate yield + network income from referrals and binary team.", color: "text-purple-400", border: "hover:border-purple-500" },
              { icon: Globe, title: "Global Access", desc: "120+ countries presence. Own premium real estate anywhere in the world as a tokenized NFT.", color: "text-emerald-400", border: "hover:border-emerald-500" },
            ].map((card) => (
              <div key={card.title} className={`bg-slate-900/60 p-6 rounded-xl border border-slate-700 ${card.border} transition-colors`}>
                <card.icon className={`h-10 w-10 ${card.color} mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Offices */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-cyan-400" /> Global Corporate Hubs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offices.map((o) => (
              <div key={o.city} className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
                <Globe className="h-5 w-5 text-cyan-400 mb-3" />
                <p className="font-semibold text-white">{o.city}</p>
                <p className="text-slate-400 text-sm mt-1">{o.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-400" /> The Future of Property Ownership
          </h2>
          <ul className="space-y-4">
            {[
              "Transform physical properties into digital NFTs for global fractional ownership.",
              "7B+ token supply with demand increasing with global adoption of the platform.",
              "Members earn from both real estate yields (staking) and network marketing income.",
              "Immutable blockchain registration ensures 100% transparent property ownership.",
              "Long-term wealth building — real estate + crypto combined for maximum growth.",
            ].map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Join the NFT Real Estate Revolution</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Be part of the future. Own real estate as an NFT. Earn daily. Build generational wealth.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/20 inline-flex items-center gap-2"
          >
            Join Now → www.nftrealestate.us <ArrowRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
