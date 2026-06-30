import { useState, useEffect } from "react";
import {
  TrendingUp, Users, GitBranch, Repeat, Award,
  CheckCircle, ArrowRight, Wallet, Shield,
  ChevronDown, ChevronUp, Zap, DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";

const incomeIcons = [TrendingUp, Users, GitBranch, Repeat];
const incomeColors = [
  { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20" },
  { color: "text-purple-400",  bg: "bg-purple-400/10 border-purple-400/20" },
  { color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20" },
];
const pkgStyles = [
  { color: "from-slate-700 to-slate-800",  border: "border-slate-600",  accent: "text-slate-300"  },
  { color: "from-gray-600 to-gray-700",    border: "border-gray-500",   accent: "text-gray-200"   },
  { color: "from-yellow-700 to-yellow-800",border: "border-yellow-500", accent: "text-yellow-300" },
  { color: "from-cyan-800 to-cyan-900",    border: "border-cyan-400",   accent: "text-cyan-300"   },
];
const badgeColors = ["", "", "bg-yellow-500 text-black", "bg-cyan-500 text-black"];

const ranks = [
  { rank: "Bronze", icon: "1st", business: "$1,000", reward: "Welcome Kit", color: "text-amber-600" },
  { rank: "Silver", icon: "2nd", business: "$5,000", reward: "Android Mobile", color: "text-slate-300" },
  { rank: "Gold", icon: "3rd", business: "$20,000", reward: "Bangkok Tour", color: "text-yellow-400" },
  { rank: "Diamond", icon: "4th", business: "$50,000", reward: "Thailand 3N/4 Day + Car + Foreign D/P", color: "text-cyan-300" },
  { rank: "Crown", icon: "5th", business: "$100,000", reward: "Fortuner", color: "text-purple-400" },
  { rank: "Ambassador", icon: "6th", business: "$500,000", reward: "2% Royalty T/C", color: "text-pink-400" },
];

const PdfPlanContent = () => {
  const [openIncome, setOpenIncome] = useState(null);
  const [packages, setPackages]     = useState([]);
  const [incomePlan, setIncomePlan] = useState({});
  const navigate = useNavigate();
  const { fetchData } = useAxios();

  useEffect(() => {
    fetchData({ url: '/api/v1/admin/user/get-plans' })
      .then(res => {
        if (res?.data?.plans)    setPackages(res.data.plans);
        if (res?.data?.incomePlan) setIncomePlan(res.data.incomePlan);
      })
      .catch(() => {});
  }, []);

  const stakingPct  = incomePlan.joining?.percentOfJoiningAmount || 40;
  const sponsorPct  = incomePlan.sponsor?.percent     || 0;
  const matchingPct = incomePlan.matching?.percent    || 10;
  const dailyCap    = incomePlan.matching?.dailyCap   || 50;
  const cap100      = incomePlan.matching?.hundredDollarIdDailyCap || 100;
  const minWithdraw = incomePlan.withdrawal?.minAmount   || 5;
  const adminCharge = incomePlan.withdrawal?.adminCharge || 10;

  const dailyPercents = packages.map((pkg) => Number(pkg.dailyPercent || 0)).filter((value) => value > 0);
  const stakingRange = dailyPercents.length
    ? `${Math.min(...dailyPercents)}%${Math.min(...dailyPercents) !== Math.max(...dailyPercents) ? ` - ${Math.max(...dailyPercents)}%` : ''}`
    : 'Plan wise';

  const incomeStreams = [
    { title: "Staking Income",       value: `${stakingRange} Daily`,                desc: `${stakingPct}% of your package amount is auto-staked. Daily staking income is based on your selected package percentage.` },
    { title: "Sponsor / Referral",   value: `${sponsorPct}% Direct`,               desc: "Signup and package sponsor bonus is disabled." },
    { title: "Rank Reward",          value: "Team Business",                       desc: "Rank rewards are based on total team business and do not credit wallet income." },
    { title: "Matching Income",       value: `${matchingPct}% Matching`,             desc: `Earn ${matchingPct}% matching income on your binary team. Daily cap $${dailyCap}/$${cap100}.` },
  ];

  return (
    <div className="min-h-screen text-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">

        <div className="text-center space-y-4">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 text-sm font-medium mb-2">NFT RealEstate Corp. Â· Est. 2013</div>
          <h1 className="text-4xl sm:text-5xl font-bold">Investment <span className="text-cyan-400">Packages</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Start with as little as <span className="text-white font-semibold">${packages[0]?.price || 12}</span>. Earn through staking, binary matching, and rank rewards.
          </p>
        </div>

        {/* Packages */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <DollarSign className="text-cyan-400 h-6 w-6" /> Choose Your Package
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => {
              const s = pkgStyles[i] || pkgStyles[0];
              const badgeColor = pkg.badge ? (badgeColors[i] || "bg-white text-black") : "";
              return (
                <div key={pkg.code} className={`relative rounded-2xl border ${s.border} bg-gradient-to-b ${s.color} p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300`}>
                  {pkg.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>{pkg.badge}</span>
                  )}
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{pkg.rank || pkg.title}</p>
                    <p className={`text-4xl font-extrabold ${s.accent} mt-1`}>${pkg.price}</p>
                    <p className="text-xs text-slate-400 mt-2">Staking Income: <span className="text-emerald-400 font-semibold">{pkg.dailyPercent || 0}% Daily</span></p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {(pkg.features || []).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate("/login")} className="mt-2 w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Income Streams */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2"><Zap className="text-yellow-400 h-6 w-6" /> Income Streams</h2>
          <p className="text-center text-slate-400 mb-8">Working 24/7 for you</p>
          <div className="grid gap-4 md:grid-cols-2">
            {incomeStreams.map((item, i) => {
              const Icon = incomeIcons[i];
              const s    = incomeColors[i];
              const isOpen = openIncome === i;
              return (
                <div key={item.title} className={`rounded-xl border ${s.bg} p-5 cursor-pointer transition-all`} onClick={() => setOpenIncome(isOpen ? null : i)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5"><Icon className={`h-5 w-5 ${s.color}`} /></div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className={`text-lg font-bold ${s.color}`}>{item.value}</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </div>
                  {isOpen && <p className="mt-3 text-sm text-slate-300 border-t border-white/10 pt-3">{item.desc}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Staking How it works */}
        <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-emerald-400 h-6 w-6" /> How Staking Income Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-slate-900/60 rounded-xl p-5 text-center"><p className="text-4xl font-extrabold text-emerald-400">{stakingPct}%</p><p className="text-slate-300 mt-2 text-sm">Of your package is auto-staked</p></div>
            <div className="bg-slate-900/60 rounded-xl p-5 text-center"><p className="text-4xl font-extrabold text-emerald-400">{stakingRange}</p><p className="text-slate-300 mt-2 text-sm">Daily staking income by package</p></div>
            <div className="bg-slate-900/60 rounded-xl p-5 text-center"><p className="text-4xl font-extrabold text-emerald-400">Daily</p><p className="text-slate-300 mt-2 text-sm">Compounding, 5 days/week (Monâ€“Fri)</p></div>
          </div>
        </section>

        {/* Ranks */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2"><Award className="text-amber-400 h-6 w-6" /> Rank &amp; Rewards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ranks.map(r => (
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

        {/* Withdrawal */}
        <section className="rounded-2xl border border-slate-700 bg-slate-900/40 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Wallet className="text-blue-400 h-6 w-6" /> Withdrawal System</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center"><p className="text-5xl font-extrabold text-blue-400">${minWithdraw}</p><p className="text-slate-300 mt-2 font-medium">Minimum Withdrawal</p></div>
            <div className="text-center"><p className="text-5xl font-extrabold text-red-400">{adminCharge}%</p><p className="text-slate-300 mt-2 font-medium">Admin Processing Fee</p></div>
            <div className="text-center"><p className="text-5xl font-extrabold text-yellow-400">1</p><p className="text-slate-300 mt-2 font-medium">Request at a Time</p></div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center space-y-4 pb-8">
          <h2 className="text-3xl font-bold">Ready to Start Investing?</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("/signup")} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
              Register Now <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate("/login")} className="border border-slate-600 hover:border-slate-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors">Login</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PdfPlanContent;

