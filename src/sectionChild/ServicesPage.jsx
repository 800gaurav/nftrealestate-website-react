import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import {
  Building2, ShoppingBag, Briefcase, Landmark, Plane,
  Globe, Megaphone, BookOpen, Smartphone, Shield,
  BarChart3, Sprout, HeartPulse, Leaf, Rocket,
  PiggyBank, Scale, FileText, Calendar, Sparkles,
  Mail, ArrowRight, CheckCircle, X
} from "lucide-react";

const SERVICES = [
  { icon: Building2,     title: "Real Estate",            desc: "Best Property Solutions - brokerage and high-value asset acquisition across premium locations.", color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: ShoppingBag,   title: "E-Commerce",             desc: "Smart Shopping Best Deals - integrated marketplace for luxury lifestyle and digital goods.", color: "text-pink-400",    bg: "bg-pink-400/10 border-pink-400/20" },
  { icon: Briefcase,     title: "Job Service",            desc: "Jobs for All Opportunities - global career options in Web3, real estate, and blockchain.", color: "text-teal-400",    bg: "bg-teal-400/10 border-teal-400/20" },
  { icon: Landmark,      title: "Banking Service",        desc: "Banking Solutions Made Easy - decentralized finance tools and cross-border transactions.", color: "text-indigo-400",  bg: "bg-indigo-400/10 border-indigo-400/20" },
  { icon: Plane,         title: "Travel Service",         desc: "Travel More Worry Less - premium travel packages and global flight/hotel bookings.", color: "text-sky-400",     bg: "bg-sky-400/10 border-sky-400/20" },
  { icon: Globe,         title: "Tour Service",           desc: "Explore India Explore World - custom tour packages and local tour guides for members.", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { icon: Megaphone,     title: "Digital Marketing",      desc: "Grow Your Brand Online - social media campaigns, SEO, and global advertising support.", color: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/20" },
  { icon: BookOpen,      title: "Education Service",      desc: "Learn & Grow Everyday - blockchain, Web3 finance, and real estate investment masterclasses.", color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20" },
  { icon: Smartphone,    title: "Recharge Service",       desc: "All Recharges at Best Price - mobile recharge, DTH payments, and utility bill portal.", color: "text-lime-400",    bg: "bg-lime-400/10 border-lime-400/20" },
  { icon: Shield,        title: "Insurance Service",      desc: "Secure Your Life Secure Future - comprehensive risk coverage for physical and digital assets.", color: "text-red-400",     bg: "bg-red-400/10 border-red-400/20" },
  { icon: BarChart3,     title: "Trading Service",        desc: "Trade Smart Earn Smart - advanced crypto trading signals, analytics, and market tools.", color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20" },
  { icon: Sprout,        title: "Ayurvedic Service",      desc: "Natural Care Healthy Life - premium organic wellness products and natural health consulting.", color: "text-green-400",   bg: "bg-green-400/10 border-green-400/20" },
  { icon: HeartPulse,    title: "Health Service",         desc: "Better Health Better Life - wellness programs and integrated medical support benefits.", color: "text-fuchsia-400", bg: "bg-fuchsia-400/10 border-fuchsia-400/20" },
  { icon: Leaf,          title: "Agriculture Service",    desc: "Support Farmers Strong India - sustainable land investments and agri-tech solutions.", color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20" },
  { icon: Rocket,        title: "NFT & Digital Assets",   desc: "Future of Digital Ownership - fractional property ownership via blockchain-powered NFTs.", color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20" },
  { icon: PiggyBank,     title: "Mutual Fund Service",    desc: "Invest Smart Grow Wealth - wealth management, mutual funds, and customized portfolios.", color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20" },
  { icon: Scale,         title: "Legal Service",          desc: "Legal Support Always Here - expert corporate and personal legal counseling services.", color: "text-yellow-500",  bg: "bg-yellow-500/10 border-yellow-500/20" },
  { icon: FileText,      title: "Document Service",       desc: "All Documents One Place - digital notary, cloud document storage, and official verification.", color: "text-sky-500",     bg: "bg-sky-500/10 border-sky-500/20" },
  { icon: Calendar,      title: "Event Management",       desc: "Your Event Our Responsibility - luxury business event and personal party coordination.", color: "text-purple-400",  bg: "bg-purple-400/10 border-purple-400/20" },
  { icon: Sparkles,      title: "20+ And More Services",  desc: "New Services Adding Soon - constantly expanding our portfolio to offer endless options.", color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-500/25 border-dashed" },
];

const INITIAL_PACKAGES = [
  { rank: "1st", price: "$12",  label: "Starter",  color: "border-slate-500",  badge: null },
  { rank: "2nd", price: "$25",  label: "Silver",   color: "border-blue-500",   badge: null },
  { rank: "3rd", price: "$50",  label: "Gold",     color: "border-yellow-500", badge: "POPULAR" },
  { rank: "4th", price: "$100", label: "Platinum", color: "border-cyan-500",   badge: "BEST" },
];

const PKG_COLORS = {
  S1: "border-slate-500",
  S2: "border-blue-500",
  S3: "border-yellow-500",
  S4: "border-cyan-500",
};

export default function ServicesPage() {
  const [modalService, setModalService] = useState(null);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const { fetchData } = useAxios();

  useEffect(() => {
    fetchData({ url: "/api/v1/admin/user/get-plans" })
      .then((res) => {
        if (res?.data?.plans) {
          const styled = res.data.plans.map((pkg, idx) => ({
            rank: `${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'}`,
            price: `$${pkg.price}`,
            label: pkg.rank || pkg.title,
            color: PKG_COLORS[pkg.code] || PKG_COLORS.S1,
            badge: pkg.badge ? (pkg.badge === "MOST POPULAR" ? "POPULAR" : pkg.badge === "BEST VALUE" ? "BEST" : pkg.badge) : null,
          }));
          setPackages(styled);
        }
      })
      .catch(() => {});
  }, []);

  const handleContact = (service) => {
    const subject = encodeURIComponent(`Service Enquiry: ${service.title}`);
    const body = encodeURIComponent(`Hello NFT RealEstate Corp. Team,\n\nI am interested in learning more about the "${service.title}" service.\n\nPlease provide details.\n\nThank you.`);
    window.open(`mailto:supportnftrealestate@gmail.com?subject=${subject}&body=${body}`, "_blank");
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
            20+ <span className="text-yellow-400">Services</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            All services are accessible by purchasing any of the 4 packages below.
            Contact us to avail any specific service.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {packages.map(pkg => (
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
              { n: "1", title: "Staking Income",    val: "0.5%  1% Daily",   note: "40% of joining amount staked", color: "text-emerald-400" },
              { n: "2", title: "Sponsor Income",    val: "10%",                note: "On direct referral package",  color: "text-blue-400" },
              { n: "3", title: "Team Growth Bonus", val: "1% 3%",            note: "10 directs needed, $100 for 3%", color: "text-purple-400" },
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
                  { icon: "ðŸ¥‰", rank: "Bronze",     biz: "â‚¹1,000",    reward: "Welcome Kit",                   color: "text-amber-600" },
                  { icon: "ðŸ¥ˆ", rank: "Silver",     biz: "â‚¹5,000",    reward: "Android Mobile",                color: "text-slate-300" },
                  { icon: "ðŸ¥‡", rank: "Gold",       biz: "â‚¹20,000",   reward: "Bangkok Tour",                  color: "text-yellow-400" },
                  { icon: "ðŸ’Ž", rank: "Diamond",    biz: "â‚¹50,000",   reward: "Thailand 3N/4D + Car + Foreign D/P", color: "text-cyan-300" },
                  { icon: "ðŸ‘‘", rank: "Crown",      biz: "â‚¹1,00,000", reward: "Fortuner",                  color: "text-purple-400" },
                  { icon: "ðŸŒŸ", rank: "Ambassador", biz: "â‚¹5,00,000", reward: "2% Royalty T/C",       color: "text-pink-400" },
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
          <a href="mailto:supportnftrealestate@gmail.com"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            <Mail size={18} /> supportnftrealestate@gmail.com <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
}

