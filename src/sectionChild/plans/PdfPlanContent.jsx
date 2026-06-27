import { useState } from "react";
import {
  TrendingUp, Users, GitBranch, Repeat, Award,
  CheckCircle, ArrowRight, Wallet, Shield, Star,
  ChevronDown, ChevronUp, Zap, DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    code: "S1", rank: "Starter", price: 12,
    badge: null, badgeColor: "",
    color: "from-slate-700 to-slate-800",
    borderColor: "border-slate-600",
    accentColor: "text-slate-300",
    features: ["Staking Income 0.5%–1% daily", "10% Referral Income", "Team Growth Bonus 1%", "Basic Dashboard Access"],
  },
  {
    code: "S2", rank: "Silver", price: 25,
    badge: null, badgeColor: "",
    color: "from-gray-600 to-gray-700",
    borderColor: "border-gray-500",
    accentColor: "text-gray-200",
    features: ["All Starter Benefits", "Higher Staking Rate", "Team Growth Bonus 2%", "Priority Support 24/7"],
  },
  {
    code: "S3", rank: "Gold", price: 50,
    badge: "MOST POPULAR", badgeColor: "bg-yellow-500 text-black",
    color: "from-yellow-700 to-yellow-800",
    borderColor: "border-yellow-500",
    accentColor: "text-yellow-300",
    features: ["All Silver Benefits", "10% Matching Income", "Full Rank Eligibility", "Dedicated Account Manager"],
  },
  {
    code: "S4", rank: "Platinum", price: 100,
    badge: "BEST VALUE", badgeColor: "bg-cyan-500 text-black",
    color: "from-cyan-800 to-cyan-900",
    borderColor: "border-cyan-400",
    accentColor: "text-cyan-300",
    features: ["All Benefits Unlocked", "3% Max Team Bonus", "All 4 Income Streams", "VIP Investor Benefits"],
  },
];

const incomeStreams = [
  {
    icon: TrendingUp,
    title: "Staking Income",
    value: "0.5% – 1% Daily",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    desc: "40% of your package amount is auto-staked. Earn 0.5%–1% daily ROI on your staking principal. Compounds automatically.",
  },
  {
    icon: Users,
    title: "Sponsor / Referral",
    value: "10% Direct",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
    desc: "Earn 10% instant commission on every member you directly introduce. Unlimited referrals — unlimited income.",
  },
  {
    icon: GitBranch,
    title: "Team Growth Bonus",
    value: "1% – 3% Team",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
    desc: "Earn 1%–3% on your entire team's business volume. Requires minimum 10 direct referrals. $100 package unlocks max 3%.",
  },
  {
    icon: Repeat,
    title: "Matching Income",
    value: "10% Matching",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
    desc: "Earn 10% matching income on your binary team. Starts at 2:1 ratio then converts to 1:1. Daily earning caps apply per plan.",
  },
];

const ranks = [
  { rank: "Bronze",     icon: "🥉", business: "$1,000",    reward: "Welcome Kit",       color: "text-amber-600"  },
  { rank: "Silver",     icon: "🥈", business: "$5,000",    reward: "Android Mobile",    color: "text-slate-300"  },
  { rank: "Gold",       icon: "🥇", business: "$20,000",   reward: "Bangkok Tour",      color: "text-yellow-400" },
  { rank: "Diamond",    icon: "💎", business: "$50,000",   reward: "Car Down Payment",  color: "text-cyan-300"   },
  { rank: "Crown",      icon: "👑", business: "$1,00,000", reward: "Fortuner Car",      color: "text-purple-400" },
  { rank: "Ambassador", icon: "🌟", business: "$5,00,000", reward: "2% Royalty Income", color: "text-pink-400"   },
];

const PdfPlanContent = () => {
  const [openIncome, setOpenIncome] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">

        {/* ── HERO ── */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 text-sm font-medium mb-2">
            NFT RealEstate Corp. · Est. 2013
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Investment <span className="text-cyan-400">Packages</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Start your journey with a minimum investment of <span className="text-white font-semibold">$12</span>.
            Earn through 4 powerful income streams working 24/7 for you.
          </p>
        </div>

        {/* ── PACKAGES ── */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <DollarSign className="text-cyan-400 h-6 w-6" /> Choose Your Package
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.code}
                className={`relative rounded-2xl border ${pkg.borderColor} bg-gradient-to-b ${pkg.color} p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300`}
              >
                {pkg.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${pkg.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <p className="text-slate-400 text-sm font-medium">{pkg.rank}</p>
                  <p className={`text-4xl font-extrabold ${pkg.accentColor} mt-1`}>${pkg.price}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── INCOME STREAMS ── */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
            <Zap className="text-yellow-400 h-6 w-6" /> 4 Powerful Income Streams
          </h2>
          <p className="text-center text-slate-400 mb-8">Working 24/7 for you</p>
          <div className="grid gap-4 md:grid-cols-2">
            {incomeStreams.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openIncome === i;
              return (
                <div
                  key={item.title}
                  className={`rounded-xl border ${item.bg} p-5 cursor-pointer transition-all`}
                  onClick={() => setOpenIncome(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white/5`}>
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-sm text-slate-300 border-t border-white/10 pt-3">
                      {item.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── HOW STAKING WORKS ── */}
        <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-400 h-6 w-6" /> How Staking Income Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-slate-900/60 rounded-xl p-5 text-center">
              <p className="text-4xl font-extrabold text-emerald-400">40%</p>
              <p className="text-slate-300 mt-2 text-sm">Of your package amount is auto-staked</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 text-center">
              <p className="text-4xl font-extrabold text-emerald-400">0.5%–1%</p>
              <p className="text-slate-300 mt-2 text-sm">Daily ROI on staking principal</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 text-center">
              <p className="text-4xl font-extrabold text-emerald-400">Daily</p>
              <p className="text-slate-300 mt-2 text-sm">Compounding, 5 days/week (Mon–Fri)</p>
            </div>
          </div>
          <div className="mt-6 bg-slate-900/40 rounded-xl p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Example (Gold $50 Package):</p>
            <p>Staking Principal = $50 × 40% = <span className="text-emerald-400 font-bold">$20</span></p>
            <p>Daily ROI @ 0.5% = <span className="text-emerald-400 font-bold">$0.10/day</span> &nbsp;|&nbsp; @ 1% = <span className="text-emerald-400 font-bold">$0.20/day</span></p>
          </div>
        </section>

        {/* ── MATCHING INCOME DETAIL ── */}
        <section className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Repeat className="text-orange-400 h-6 w-6" /> Matching Income — Binary System
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-slate-900/60 rounded-xl p-5 space-y-3">
              <p className="font-semibold text-orange-300">Phase 1 — First Match</p>
              <p className="text-slate-300 text-sm">Binary ratio <span className="font-bold text-white">2:1</span>. Left leg must have 2x the business of right (or vice versa) to unlock first matching.</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 space-y-3">
              <p className="font-semibold text-orange-300">Phase 2 — After First Match</p>
              <p className="text-slate-300 text-sm">Converts to <span className="font-bold text-white">1:1</span> ratio. Earn 10% matching on balanced pairs daily.</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 space-y-3">
              <p className="font-semibold text-orange-300">Daily Cap — Standard</p>
              <p className="text-4xl font-extrabold text-orange-400">$50 <span className="text-base text-slate-400 font-normal">/ day</span></p>
              <p className="text-slate-400 text-xs">For packages under $100</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 space-y-3">
              <p className="font-semibold text-orange-300">Daily Cap — Platinum $100</p>
              <p className="text-4xl font-extrabold text-orange-400">$100 <span className="text-base text-slate-400 font-normal">/ day</span></p>
              <p className="text-slate-400 text-xs">Exclusive for $100 package holders</p>
            </div>
          </div>
        </section>

        {/* ── RANK & REWARDS ── */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
            <Award className="text-amber-400 h-6 w-6" /> Rank &amp; Rewards
          </h2>
          <p className="text-center text-slate-400 mb-8">Rise through the ranks — earn lifestyle-changing rewards</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ranks.map((r) => (
              <div key={r.rank} className="rounded-xl border border-slate-700 bg-slate-900 p-5 flex items-center gap-4 hover:border-slate-500 transition-colors">
                <span className="text-4xl">{r.icon}</span>
                <div>
                  <p className={`font-bold text-lg ${r.color}`}>{r.rank}</p>
                  <p className="text-slate-400 text-sm">Business: <span className="text-white font-semibold">{r.business}</span></p>
                  <p className="text-slate-400 text-sm">Reward: <span className="text-emerald-400 font-semibold">{r.reward}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WITHDRAWAL RULES ── */}
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Wallet className="text-blue-400 h-6 w-6" /> Withdrawal System
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-blue-400">$5</p>
              <p className="text-slate-300 mt-2 font-medium">Minimum Withdrawal</p>
              <p className="text-slate-500 text-sm mt-1">Accessible entry point for all investors</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-red-400">10%</p>
              <p className="text-slate-300 mt-2 font-medium">Admin Processing Fee</p>
              <p className="text-slate-500 text-sm mt-1">Deducted from withdrawal amount</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-yellow-400">1</p>
              <p className="text-slate-300 mt-2 font-medium">Request at a Time</p>
              <p className="text-slate-500 text-sm mt-1">New request only after current is processed</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["⚡ Instant Processing Available", "🔒 Multi-Layer Security Protocols", "🌍 Global Payout Support"].map((t) => (
              <div key={t} className="bg-slate-800 rounded-lg px-4 py-3 text-sm text-slate-300 text-center">{t}</div>
            ))}
          </div>
        </section>

        {/* ── HOW TO START ── */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Shield className="text-cyan-400 h-6 w-6" /> How to Get Started
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Register", desc: "Create your account using a referral link. Complete KYC and set up your wallet." },
              { step: "02", title: "Choose Package", desc: "Select your preferred package — unlock different income levels and benefits." },
              { step: "03", title: "Start Earning", desc: "Your staking income begins from day one. Compounding works for you 24/7." },
              { step: "04", title: "Build & Scale", desc: "Refer, unlock higher levels, and grow your income streams over time." },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-slate-700 bg-slate-900 p-6 hover:border-cyan-500/50 transition-colors">
                <p className="text-4xl font-extrabold text-cyan-400/30 mb-3">{s.step}</p>
                <p className="font-bold text-white mb-2">{s.title}</p>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="text-center space-y-4 pb-8">
          <h2 className="text-3xl font-bold">Ready to Start Investing?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Join thousands of investors earning daily from NFT Real Estate. Start with just $12.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              Register Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border border-slate-600 hover:border-slate-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Login
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            NFT RealEstate Corp. · Est. 2013 · New York, USA · www.nftrealestate.us
          </p>
        </div>

      </div>
    </div>
  );
};

export default PdfPlanContent;
