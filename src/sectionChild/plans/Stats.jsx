import {
  TrendingUp, Users, Globe, Shield, Zap, BarChart3,
  Building2, Cpu, Lock, Smartphone, Plane, BookOpen,
  ShoppingBag, HeartPulse, Briefcase, Wheat, Landmark,
  AreaChart, Wallet
} from 'lucide-react';

const services = [
  { icon: Building2, title: "Real Estate Services", desc: "Global brokerage and high-value asset acquisition." },
  { icon: TrendingUp, title: "Property Investment", desc: "Strategic capital allocation in prime global markets." },
  { icon: Shield, title: "Property Management", desc: "End-to-end maintenance and tenant lifecycle management." },
  { icon: Wallet, title: "NFT Real Estate", desc: "Fractional ownership powered by blockchain technology." },
  { icon: Lock, title: "Digital Asset Services", desc: "Secure custody and trading of tokenized assets." },
  { icon: ShoppingBag, title: "E-Commerce", desc: "Integrated marketplace for luxury lifestyle goods." },
  { icon: Plane, title: "Tour & Travel", desc: "Premium concierge and global travel experiences." },
  { icon: Landmark, title: "Banking Services", desc: "Decentralized finance and wealth management tools." },
  { icon: BookOpen, title: "Education Services", desc: "Blockchain and real estate investment masterclasses." },
  { icon: Shield, title: "Insurance Services", desc: "Comprehensive risk coverage for physical/digital assets." },
  { icon: Briefcase, title: "Job Services", desc: "Global career opportunities in the Web3 ecosystem." },
  { icon: AreaChart, title: "Trading Services", desc: "Advanced tools for real-time asset exchange." },
  { icon: Wheat, title: "Agriculture Services", desc: "Sustainable land investment and agri-tech solutions." },
  { icon: HeartPulse, title: "Health Services", desc: "Integrated wellness and healthcare access for members." },
  { icon: Smartphone, title: "Business Consulting", desc: "Strategic advisory for enterprise digital transformation." },
];

const techStack = [
  { icon: Cpu, title: "Blockchain Layer", desc: "Immutable distributed ledger for property registration and NFT minting.", color: "text-cyan-400" },
  { icon: Zap, title: "Smart Contracts", desc: "Automated execution of property yields, transfers, and ownership logic.", color: "text-yellow-400" },
  { icon: Lock, title: "Security Layer", desc: "Enterprise-grade encryption, KYC/AML verification, and asset protection.", color: "text-emerald-400" },
  { icon: Globe, title: "Global Access", desc: "Cross-platform accessibility via web, mobile, and API integrations.", color: "text-blue-400" },
];

const Stats = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-400 text-sm font-medium">
            <Building2 className="h-4 w-4" /> Services Ecosystem
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Comprehensive <span className="text-cyan-400">Solutions</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            NFT RealEstate Corp. offers 15+ digital & physical asset solutions across real estate, finance, lifestyle, and technology.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "10+", label: "Years in Market", icon: BarChart3, color: "text-cyan-400" },
            { value: "$2B+", label: "Assets Managed", icon: TrendingUp, color: "text-emerald-400" },
            { value: "50k+", label: "Properties Listed", icon: Building2, color: "text-blue-400" },
            { value: "120+", label: "Countries Present", icon: Globe, color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:border-slate-500 transition-colors">
              <s.icon className={`h-8 w-8 ${s.color} mx-auto mb-3`} />
              <p className={`text-4xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-slate-400 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Briefcase className="h-6 w-6 text-purple-400" /> 15+ Service Verticals
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 flex items-start gap-4 hover:border-slate-500 transition-colors">
                <div className="bg-cyan-500/10 p-2.5 rounded-lg shrink-0">
                  <s.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Network Architecture */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-orange-400" /> Global Network Architecture
          </h2>
          <p className="text-center text-slate-400 mb-8 text-sm">Scalable 4-Level Ecosystem Framework</p>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-cyan-500/20 border border-cyan-500/40 rounded-xl px-8 py-3 text-center">
              <p className="font-bold text-cyan-300 text-lg">Global Platform</p>
            </div>
            <div className="flex gap-8">
              <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl px-6 py-3 text-center">
                <p className="font-semibold text-blue-300">Left Division</p>
              </div>
              <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl px-6 py-3 text-center">
                <p className="font-semibold text-blue-300">Right Division</p>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {["Regional A", "Regional B", "Regional C", "Regional D"].map((r) => (
                <div key={r} className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-300">{r}</div>
              ))}
            </div>
            <p className="text-slate-500 text-sm text-center">Unlimited depth supporting millions of global stakeholders</p>
          </div>
        </section>

        {/* Technology Infrastructure */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Cpu className="h-6 w-6 text-cyan-400" /> Technology Infrastructure
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((t) => (
              <div key={t.title} className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-500 transition-colors">
                <t.icon className={`h-8 w-8 ${t.color} mb-4`} />
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NFT Ecosystem Flow */}
        <section className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">NFT-Powered Real Estate Ecosystem</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {[
              "Physical Property",
              "Asset Verification",
              "Blockchain Registration",
              "Digital Ownership",
              "NFT Representation",
              "Global Access",
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-2 text-slate-300">
                  {step}
                </div>
                {i < arr.length - 1 && <span className="text-cyan-400">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
          <p className="font-semibold text-slate-400 mb-1">NFT REALESTATE CORP.</p>
          <p>www.nftrealestate.us · support@nftrealestate.us</p>
          <p>1250 Broadway, NY 10001 · © 2025 All Rights Reserved · Est. 2013</p>
        </div>

      </div>
    </div>
  );
};

export default Stats;
