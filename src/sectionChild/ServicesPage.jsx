import { useState } from "react";
import {
  Building2, TrendingUp, Layers, Rocket, DollarSign,
  ShoppingBag, Plane, Landmark, BookOpen, Shield,
  Briefcase, BarChart3, Leaf, HeartPulse, Users, Zap,
  Mail, ArrowRight, CheckCircle, X
} from "lucide-react";

const SERVICES = [
  { icon: Building2,  title: "Real Estate Services",    desc: "Global brokerage and high-value asset acquisition across premium locations worldwide.", color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: TrendingUp, title: "Staking Partner",         desc: "Earn daily staking income on your invested amount. 40% auto-staked from package.", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { icon: Layers,     title: "Staking Benefit",         desc: "0.5% to 1% daily ROI on your staking principal. Compounds automatically.", color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20" },
  { icon: Rocket,     title: "NFT Real Estate",         desc: "Fractional ownership of physical properties through blockchain-powered NFTs.", color: "text-purple-400",  bg: "bg-purple-400/10 border-purple-400/20" },
  { icon: DollarSign, title: "Digital Asset Services",  desc: "Secure custody and trading of tokenized digital assets globally.", color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20" },
  { icon: ShoppingBag,title: "E-Commerce Service",      desc: "Integrated marketplace for luxury lifestyle goods and digital products.", color: "text-pink-400",    bg: "bg-pink-400/10 border-pink-400/20" },
  { icon: Plane,      title: "Tour & Travel Service",   desc: "Premium concierge travel experiences and global tour packages for members.", color: "text-sky-400",     bg: "bg-sky-400/10 border-sky-400/20" },
  { icon: Landmark,   title: "Banking Service",         desc: "Decentralized finance tools, wealth management and cross-border transactions.", color: "text-indigo-400",  bg: "bg-indigo-400/10 border-indigo-400/20" },
  { icon: BookOpen,   title: "Education Service",       desc: "Blockchain and real estate investment masterclasses for all members.", color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20" },
  { icon: Shield,     title: "Insurance Service",       desc: "Comprehensive risk coverage for physical and digital assets.", color: "text-red-400",     bg: "bg-red-400/10 border-red-400/20" },
  { icon: Briefcase,  title: "Job Service",             desc: "Global career opportunities in Web3, real estate, and blockchain ecosystem.", color: "text-teal-400",    bg: "bg-teal-400/10 border-teal-400/20" },
  { icon: Users,      title: "Matrimonial Website",     desc: "Premium matrimonial platform connecting professionals across the globe.", color: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/20" },
  { icon: Zap,        title: "Recharge Portal",         desc: "Mobile, DTH, and utility bill recharge portal for all members.", color: "text-lime-400",    bg: "bg-lime-400/10 border-lime-400/20" },
  { icon: BarChart3,  title: "Trading Service",         desc: "Advanced tools and signals for real-time crypto and asset exchange.", color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20" },
  { icon: Leaf,       title: "Agriculture Service",     desc: "Sustainable land investment and agri-tech solutions for members.", color: "text-green-400",   bg: "bg-green-400/10 border-green-400/20" },
  { icon: HeartPulse, title: "Health Service",          desc: "Integrated wellness and healthcare access benefits for all members.", color: "text-fuchsia-400", bg: "bg-fuchsia-400/10 border-fuchsia-400/20" },
];

const PACKAGES = [
  { rank: "1st", price: "$12",  label: "Starter",  color: "border-slate-500",  badge: null },
  { rank: "2nd", price: "$25",  label: "Silver",   color: "border-blue-500",   badge: null },
  { rank: "3rd", price: "$50",  label: "Gold",     color: "border-yellow-500", badge: "POPULAR" },
  { rank: "4th", price: "$100", label: "Platinum", color: "border-cyan-500",   badge: "BEST" },
];

export default function ServicesPage() {
  const [modalService, setModalService] = useState(null);

  const handleContact = (service) => {
    const subject = encodeURIComponent(`Service Enquiry: ${service.title}`);
    const body = encodeURIComponent(`Hello NFT RealEstate Corp. Team,\n\nI am interested in learning more about the "${service.title}" service.\n\nPlease provide details.\n\nThank you.`);
    window.open(`mailto:support@nftrealestate.us?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 text-yellow-400 text-sm font-bold tracking-wider uppercase mb-2">
            N.F.T RealEstate U.S.
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            10+ <span className="text-yellow-400">Services</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            All services are accessible by purchasing any of the 4 packages below.
            Contact us to avail any specific service.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PACKAGES.map(pkg => (
            <div key={pkg.rank} className={`relative rounded-2xl border-2 ${pkg.color} bg-slate-900/60 p-5 text-center hover:bg-slate-900 transition-colors`}>
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {pkg.badge}
                </span>
              )}
              <p className="text-slate-400 text-xs font-medium">{pkg.rank} Package</p>
              <p className="text-3xl font-extrabold text-white mt-1">{pkg.price}</p>
              <p className="text-slate-400 text-xs mt-1">{pkg.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 -mt-10">* Terms & Conditions Apply</p>

        {/* Services grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`rounded-2xl border ${s.bg} p-5 flex flex-col gap-3 hover:scale-[1.02] transition-transform`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl bg-white/5`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm leading-tight">{s.title}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed flex-1">{s.desc}</p>
                <button
                  onClick={() => handleContact(s)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors ${s.color}`}
                >
                  <Mail size={13} /> Enquire Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Income Plan summary */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Income Plan</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", title: "Staking Income",    val: "0.5% – 1% Daily",   note: "40% of joining amount staked", color: "text-emerald-400" },
              { n: "2", title: "Sponsor Income",    val: "10%",                note: "On direct referral package",  color: "text-blue-400" },
              { n: "3", title: "Team Growth Bonus", val: "1% – 3%",            note: "10 directs needed, $100 for 3%", color: "text-purple-400" },
              { n: "4", title: "Matching Income",   val: "10%",                note: "2:1 then 1:1, daily cap $50/$100", color: "text-orange-400" },
            ].map(item => (
              <div key={item.n} className="bg-slate-800/60 rounded-xl p-5">
                <p className="text-slate-500 text-xs font-bold mb-2">0{item.n}.</p>
                <p className="font-bold text-white">{item.title}</p>
                <p className={`text-xl font-extrabold ${item.color} mt-1`}>{item.val}</p>
                <p className="text-slate-400 text-xs mt-2">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ranks */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Rank & Rewards</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs">
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">Business</th>
                  <th className="py-3 px-4 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: "🥉", rank: "Bronze",     biz: "₹1,000",    reward: "Welcome Kit",                   color: "text-amber-600" },
                  { icon: "🥈", rank: "Silver",     biz: "₹5,000",    reward: "Android Mobile",                color: "text-slate-300" },
                  { icon: "🥇", rank: "Gold",       biz: "₹20,000",   reward: "Bangkok Tour",                  color: "text-yellow-400" },
                  { icon: "💎", rank: "Diamond",    biz: "₹50,000",   reward: "Thailand 3N/4D + Car + Foreign D/P", color: "text-cyan-300" },
                  { icon: "👑", rank: "Crown",      biz: "₹1,00,000", reward: "Fortuner Car",                  color: "text-purple-400" },
                  { icon: "🌟", rank: "Ambassador", biz: "₹5,00,000", reward: "2% Royalty Income (T/C)",       color: "text-pink-400" },
                ].map(r => (
                  <tr key={r.rank} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-xl mr-2">{r.icon}</span>
                      <span className={`font-bold ${r.color}`}>{r.rank}</span>
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">{r.biz}</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">{r.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Want to avail any service?</h2>
          <p className="text-slate-800 mb-6">Purchase a package and mail us the service you need. Our team will get back to you within 24 hours.</p>
          <a href="mailto:support@nftrealestate.us"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            <Mail size={18} /> support@nftrealestate.us <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
}
