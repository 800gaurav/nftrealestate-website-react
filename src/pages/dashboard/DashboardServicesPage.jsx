import {
  Building2, TrendingUp, Layers, Network, Zap,
  ShoppingBag, Plane, Landmark, BookOpen, Shield,
  Briefcase, Users, RefreshCw, BarChart3, Leaf,
  HeartPulse, Mail, ArrowRight,
} from "lucide-react";

const SERVICES = [
  { icon: TrendingUp,  title: "Staking Partner",       desc: "Earn daily staking income. 40% of your package auto-staked for 0.5%–1% daily ROI.",      color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5"  },
  { icon: Layers,      title: "Staking Benefit",        desc: "Compounding staking returns on your principal. Benefits increase with higher packages.",    color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-500/5"     },
  { icon: Network,     title: "Real Network Services",  desc: "Leverage our global network for real estate connections, leads, and referral growth.",      color: "text-blue-400",    border: "border-blue-500/30",    bg: "bg-blue-500/5"     },
  { icon: ShoppingBag, title: "E-Commerce Service",     desc: "Access our integrated marketplace for lifestyle, digital, and NFT-backed products.",        color: "text-pink-400",    border: "border-pink-500/30",    bg: "bg-pink-500/5"     },
  { icon: Plane,       title: "Tour & Travel Service",  desc: "Premium travel packages and concierge services exclusively for NFT RealEstate members.",    color: "text-sky-400",     border: "border-sky-500/30",     bg: "bg-sky-500/5"      },
  { icon: Landmark,    title: "Banking Service",        desc: "DeFi tools, cross-border payment support, and wealth management for members.",               color: "text-indigo-400",  border: "border-indigo-500/30",  bg: "bg-indigo-500/5"   },
  { icon: BookOpen,    title: "Education Service",      desc: "Courses and masterclasses on blockchain, real estate investing, and Web3 finance.",          color: "text-orange-400",  border: "border-orange-500/30",  bg: "bg-orange-500/5"   },
  { icon: Zap,         title: "Digital Service",        desc: "Digital asset management, tokenization services, and blockchain-based utilities.",           color: "text-yellow-400",  border: "border-yellow-500/30",  bg: "bg-yellow-500/5"   },
  { icon: Shield,      title: "Insurance Service",      desc: "Coverage plans for your physical and digital asset investments and NFT holdings.",           color: "text-red-400",     border: "border-red-500/30",     bg: "bg-red-500/5"      },
  { icon: Briefcase,   title: "Job Service",            desc: "Career opportunities in Web3, NFT, real estate, and blockchain ecosystem companies.",        color: "text-teal-400",    border: "border-teal-500/30",    bg: "bg-teal-500/5"     },
  { icon: Users,       title: "Matrimonial Website",    desc: "Premium professional matchmaking platform for NFT RealEstate community members.",            color: "text-rose-400",    border: "border-rose-500/30",    bg: "bg-rose-500/5"     },
  { icon: RefreshCw,   title: "Recharge Portal",        desc: "Mobile recharge, DTH, utility bill payments and more — all in one portal for members.",    color: "text-lime-400",    border: "border-lime-500/30",    bg: "bg-lime-500/5"     },
  { icon: BarChart3,   title: "Trading Service",        desc: "Advanced crypto and asset trading tools, signals, and market analytics for members.",        color: "text-violet-400",  border: "border-violet-500/30",  bg: "bg-violet-500/5"   },
  { icon: Leaf,        title: "Agricultural Service",   desc: "Agri-tech investment solutions, land tokenization, and sustainable farming initiatives.",    color: "text-green-400",   border: "border-green-500/30",   bg: "bg-green-500/5"    },
  { icon: HeartPulse,  title: "Health Service",         desc: "Integrated wellness plans, health benefits, and medical assistance for all members.",        color: "text-fuchsia-400", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/5"  },
  { icon: TrendingUp,  title: "Income Service",         desc: "Structured income programs including staking, referral, matching, and rank reward streams.", color: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-500/5"    },
];

const COMPANY_EMAIL = "support@nftrealestate.us";

const handleEnquire = (serviceTitle) => {
  const subject = encodeURIComponent(`Service Enquiry: ${serviceTitle}`);
  const body = encodeURIComponent(
    `Hello NFT RealEstate U.S. Team,\n\nI am interested in the "${serviceTitle}" service and would like more details.\n\nPlease get back to me at the earliest.\n\nThank you.`
  );
  window.open(`mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`, "_blank");
};

export default function DashboardServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 text-yellow-400 text-xs font-bold tracking-widest uppercase">
            N.F.T RealEstate U.S.
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            10+ <span className="text-yellow-400">Services</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            All services are available to active package holders.
            Click <strong className="text-white">Enquire</strong> on any service to mail us — our team will respond within 24 hours.
          </p>
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            <Mail size={14} /> {COMPANY_EMAIL}
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border ${s.border} ${s.bg} p-5 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-200`}
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 shrink-0">
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-snug">{s.title}</p>
                    <span className="text-slate-500 text-[10px] font-medium">Service #{i + 1}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed flex-1">{s.desc}</p>

                {/* Enquire Button */}
                <button
                  onClick={() => handleEnquire(s.title)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border ${s.border} bg-white/5 hover:bg-white/10 transition-colors ${s.color}`}
                >
                  <Mail size={12} /> Enquire via Email
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="text-xl font-extrabold text-white mb-1">Need a specific service?</h2>
            <p className="text-slate-400 text-sm">
              Mail us the service name + your User ID. We'll activate it on your account within 24 hours.
            </p>
          </div>
          <a
            href={`mailto:${COMPANY_EMAIL}?subject=Service%20Request&body=Hello%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20service.%0A%0AMy%20User%20ID%3A%20%0AService%20Name%3A%20%0A%0AThank%20you.`}
            className="shrink-0 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-extrabold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            <Mail size={16} /> Contact Us <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}
