import {
  Building2, ShoppingBag, Briefcase, Landmark, Plane,
  Globe, Megaphone, BookOpen, Smartphone, Shield,
  BarChart3, Sprout, HeartPulse, Leaf, Rocket,
  PiggyBank, Scale, FileText, Calendar, Sparkles,
  Mail, ArrowRight,
} from "lucide-react";

const SERVICES = [
  { icon: Building2,     title: "Real Estate",            desc: "Best Property Solutions - brokerage and high-value asset acquisition across premium locations.", color: "text-yellow-400",  border: "border-yellow-500/30",  bg: "bg-yellow-500/5"  },
  { icon: ShoppingBag,   title: "E-Commerce",             desc: "Smart Shopping Best Deals - integrated marketplace for luxury lifestyle and digital goods.", color: "text-pink-400",    border: "border-pink-500/30",    bg: "bg-pink-500/5"    },
  { icon: Briefcase,     title: "Job Service",            desc: "Jobs for All Opportunities - global career options in Web3, real estate, and blockchain.", color: "text-teal-400",    border: "border-teal-500/30",    bg: "bg-teal-500/5"    },
  { icon: Landmark,      title: "Banking Service",        desc: "Banking Solutions Made Easy - decentralized finance tools and cross-border transactions.", color: "text-indigo-400",  border: "border-indigo-500/30",  bg: "bg-indigo-500/5"   },
  { icon: Plane,         title: "Travel Service",         desc: "Travel More Worry Less - premium travel packages and global flight/hotel bookings.", color: "text-sky-400",     border: "border-sky-500/30",     bg: "bg-sky-500/5"      },
  { icon: Globe,         title: "Tour Service",           desc: "Explore India Explore World - custom tour packages and local tour guides for members.", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5"  },
  { icon: Megaphone,     title: "Digital Marketing",      desc: "Grow Your Brand Online - social media campaigns, SEO, and global advertising support.", color: "text-rose-400",    border: "border-rose-500/30",    bg: "bg-rose-500/5"     },
  { icon: BookOpen,      title: "Education Service",      desc: "Learn & Grow Everyday - blockchain, Web3 finance, and real estate investment masterclasses.", color: "text-orange-400",  border: "border-orange-500/30",  bg: "bg-orange-500/5"   },
  { icon: Smartphone,    title: "Recharge Service",       desc: "All Recharges at Best Price - mobile recharge, DTH payments, and utility bill portal.", color: "text-lime-400",    border: "border-lime-500/30",    bg: "bg-lime-500/5"     },
  { icon: Shield,        title: "Insurance Service",      desc: "Secure Your Life Secure Future - comprehensive risk coverage for physical and digital assets.", color: "text-red-400",     border: "border-red-500/30",     bg: "bg-red-500/5"      },
  { icon: BarChart3,     title: "Trading Service",        desc: "Trade Smart Earn Smart - advanced crypto trading signals, analytics, and market tools.", color: "text-violet-400",  border: "border-violet-500/30",  bg: "bg-violet-500/5"   },
  { icon: Sprout,        title: "Ayurvedic Service",      desc: "Natural Care Healthy Life - premium organic wellness products and natural health consulting.", color: "text-green-400",   border: "border-green-500/30",   bg: "bg-green-500/5"    },
  { icon: HeartPulse,    title: "Health Service",         desc: "Better Health Better Life - wellness programs and integrated medical support benefits.", color: "text-fuchsia-400", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/5"  },
  { icon: Leaf,          title: "Agriculture Service",    desc: "Support Farmers Strong India - sustainable land investments and agri-tech solutions.", color: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-500/5"    },
  { icon: Rocket,        title: "NFT & Digital Assets",   desc: "Future of Digital Ownership - fractional property ownership via blockchain-powered NFTs.", color: "text-cyan-400",    border: "border-cyan-500/30",    bg: "bg-cyan-500/5"     },
  { icon: PiggyBank,     title: "Mutual Fund Service",    desc: "Invest Smart Grow Wealth - wealth management, mutual funds, and customized portfolios.", color: "text-blue-400",    border: "border-blue-500/30",    bg: "bg-blue-500/5"     },
  { icon: Scale,         title: "Legal Service",          desc: "Legal Support Always Here - expert corporate and personal legal counseling services.", color: "text-yellow-500",  border: "border-yellow-500/30",  bg: "bg-yellow-500/5"   },
  { icon: FileText,      title: "Document Service",       desc: "All Documents One Place - digital notary, cloud document storage, and official verification.", color: "text-sky-500",     border: "border-sky-500/30",     bg: "bg-sky-500/5"      },
  { icon: Calendar,      title: "Event Management",       desc: "Your Event Our Responsibility - luxury business event and personal party coordination.", color: "text-purple-400",  border: "border-purple-500/30",  bg: "bg-purple-500/5"   },
  { icon: Sparkles,      title: "20+ And More Services",  desc: "New Services Adding Soon - constantly expanding our portfolio to offer endless options.", color: "text-yellow-400",  border: "border-yellow-500/35 border-dashed", bg: "bg-yellow-500/5" },
];

const COMPANY_EMAIL = "supportnftrealestate@gmail.com";

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
            20+ <span className="text-yellow-400">Services</span>
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
