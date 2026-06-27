import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import {
  TrendingUp, Users, Repeat, Award,
  RefreshCw, ChevronDown, ChevronUp, Wallet, Clock,
} from "lucide-react";

const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export default function IncomeReportPage() {
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  const [summary, setSummary] = useState({});
  const [sponsorHistory, setSponsorHistory] = useState([]);
  const [openSection, setOpenSection] = useState("stakingIncome");

  const fetchAll = async () => {
    try {
      setloading(true);
      const [dashRes, sponsorRes] = await Promise.all([
        fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` }),
        fetchData({ url: `/api/v1/user/profile/sponsor-income-history/${userId}` }),
      ]);
      setSummary(dashRes?.data || {});
      setSponsorHistory(sponsorRes?.data || []);
    } catch (_) {}
    finally { setloading(false); }
  };

  useEffect(() => { if (userId) fetchAll(); }, []);

  // Correct key mapping from dashboard API
  const stakingIncome    = summary.stakingIncome    || summary.roiIncome       || 0;
  const sponsorIncome    = summary.sponsorIncome    || summary.proBonusIncome  || 0;
  const matchingIncome   = summary.matchingIncome   || 0;
  const rankRewardIncome = summary.rankRewardIncome || 0;
  const totalEarned      = stakingIncome + sponsorIncome + matchingIncome + rankRewardIncome;

  const CARDS = [
    { id: "stakingIncome",    label: "Staking Income",   icon: TrendingUp, color: "text-emerald-400", border: "border-emerald-400/25", bg: "bg-emerald-400/8",  value: stakingIncome,    desc: "0.5–1% daily on staking principal" },
    { id: "sponsorIncome",    label: "Sponsor Income",   icon: Users,      color: "text-blue-400",    border: "border-blue-400/25",    bg: "bg-blue-400/8",     value: sponsorIncome,    desc: "10% on direct referral package"   },
    { id: "matchingIncome",   label: "Matching Income",  icon: Repeat,     color: "text-orange-400",  border: "border-orange-400/25",  bg: "bg-orange-400/8",   value: matchingIncome,   desc: "Binary 2:1 → 1:1, cap $50/$100"  },
    { id: "rankRewardIncome", label: "Rank Reward",      icon: Award,      color: "text-yellow-400",  border: "border-yellow-400/25",  bg: "bg-yellow-400/8",   value: rankRewardIncome, desc: "Bronze → Ambassador rewards"      },
  ];

  const toggle = (k) => setOpenSection(o => o === k ? null : k);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Income Report</h1>
            <p className="text-slate-500 text-sm mt-0.5">All your earnings at a glance</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/25 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-slate-400 text-sm">Total Income Earned (Lifetime)</p>
              <p className="text-4xl font-extrabold text-white mt-1">{fmt(totalEarned)}</p>
              <p className="text-slate-500 text-xs mt-1">Staking + Sponsor + Matching + Rank combined</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[260px]">
              {[
                { label: "Wallet Balance",   value: fmt(summary.walletBalance),   color: "text-emerald-400", icon: <Wallet size={12} /> },
                { label: "Today's Income",   value: fmt(summary.todayIncome),     color: "text-yellow-400",  icon: <Clock size={12} />  },
                { label: "Total Invested",   value: fmt(summary.totalInvested),   color: "text-blue-400",    icon: null },
                { label: "Staking Principal",value: fmt(summary.stakingPrincipal),color: "text-purple-400",  icon: null },
              ].map(item => (
                <div key={item.label} className="bg-slate-900/70 rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-[10px] flex items-center justify-center gap-1">
                    {item.icon}{item.label}
                  </p>
                  <p className={`text-base font-bold ${item.color} mt-0.5`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Income Stream Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CARDS.map(card => {
            const Icon = card.icon;
            const pct = totalEarned > 0 ? ((card.value / totalEarned) * 100).toFixed(1) : "0.0";
            return (
              <button
                key={card.id}
                onClick={() => toggle(card.id)}
                className={`rounded-2xl border ${card.border} ${card.bg} p-4 text-left hover:opacity-90 transition-all cursor-pointer w-full ${openSection === card.id ? "ring-1 ring-white/20" : ""}`}
              >
                <Icon className={`h-5 w-5 ${card.color} mb-2.5`} />
                <p className="text-slate-400 text-xs">{card.label}</p>
                <p className={`text-xl font-extrabold ${card.color} mt-0.5`}>{fmt(card.value)}</p>
                <p className="text-slate-600 text-[10px] mt-1">{pct}% of total</p>
                <p className="text-slate-500 text-[10px] mt-0.5">{card.desc}</p>
              </button>
            );
          })}
        </div>

        {/* ── Staking Income Section ── */}
        <Section
          id="stakingIncome" open={openSection} toggle={toggle}
          title="Staking Income History"
          icon={<TrendingUp size={15} className="text-emerald-400" />}
          border="border-emerald-400/20"
        >
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 text-xs text-slate-500 px-3 pb-2 border-b border-slate-800">
              <span>Date</span>
              <span className="text-center">Daily ROI</span>
              <span className="text-right">Amount</span>
            </div>
            {summary.roiIncomeHistory?.length > 0 ? (
              [...(summary.roiIncomeHistory)].reverse().slice(0, 50).map((h, i) => (
                <div key={i} className="grid grid-cols-3 text-sm px-3 py-2.5 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400 text-xs">{fmtDate(h.date)}</span>
                  <span className="text-emerald-400 text-center text-xs font-medium">0.5–1%</span>
                  <span className="text-white font-semibold text-right text-xs">{fmt(h.amount)}</span>
                </div>
              ))
            ) : (
              <EmptyState text="No staking history yet. Buy a package to start earning daily ROI." />
            )}
          </div>
        </Section>

        {/* ── Sponsor Income Section ── */}
        <Section
          id="sponsorIncome" open={openSection} toggle={toggle}
          title="Sponsor / Referral Income History"
          icon={<Users size={15} className="text-blue-400" />}
          border="border-blue-400/20"
        >
          <div className="space-y-1.5">
            <div className="grid grid-cols-4 text-xs text-slate-500 px-3 pb-2 border-b border-slate-800">
              <span>From User</span>
              <span className="text-center">Base Pkg</span>
              <span className="text-center">Rate</span>
              <span className="text-right">Earned</span>
            </div>
            {sponsorHistory.length > 0 ? (
              [...sponsorHistory].reverse().map((h, i) => (
                <div key={i} className="grid grid-cols-4 text-sm px-3 py-2.5 bg-slate-800/40 rounded-lg items-center">
                  <span className="text-blue-300 font-mono text-xs truncate">{h.fromUser || "—"}</span>
                  <span className="text-slate-300 text-center text-xs">{fmt(h.baseAmount)}</span>
                  <span className="text-blue-400 text-center text-xs font-medium">10%</span>
                  <span className="text-white font-semibold text-right text-xs">{fmt(h.amount)}</span>
                </div>
              ))
            ) : (
              <EmptyState text="No referral income yet. Share your referral link to start earning." />
            )}
          </div>
        </Section>

        {/* ── Matching Income Section ── */}
        <Section
          id="matchingIncome" open={openSection} toggle={toggle}
          title="Matching Income Details"
          icon={<Repeat size={15} className="text-orange-400" />}
          border="border-orange-400/20"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                <Repeat size={13} className="text-orange-400" /> Matching Income
              </p>
              <p className="text-3xl font-extrabold text-orange-400">{fmt(matchingIncome)}</p>
              <p className="text-slate-500 text-xs">Binary 2:1 first, then 1:1 ratio</p>
              <div className="grid grid-cols-2 gap-2">
                <MiniCard label="Left Team"   value={fmt(summary.leftTeamBusiness)}  />
                <MiniCard label="Right Team"  value={fmt(summary.rightTeamBusiness)} />
                <MiniCard label="Daily Cap"   value="$50 / $100" />
                <MiniCard label="Rate"        value="10%" />
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                <Award size={13} className="text-yellow-400" /> Rank Reward Income
              </p>
              <p className="text-3xl font-extrabold text-yellow-400">{fmt(rankRewardIncome)}</p>
              <p className="text-slate-500 text-xs">Bronze $1K → Ambassador $5L</p>
              <div className="grid grid-cols-2 gap-2">
                <MiniCard label="Working"  value={fmt((sponsorIncome + matchingIncome + rankRewardIncome))} />
                <MiniCard label="Passive"  value={fmt(stakingIncome)} />
                <MiniCard label="Total"    value={fmt(totalEarned)} />
                <MiniCard label="Today"    value={fmt(summary.todayIncome)} />
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const Section = ({ id, open, toggle, title, icon, border, children }) => {
  const isOpen = open === id;
  return (
    <div className={`rounded-2xl border ${border} bg-slate-900/50`}>
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        {isOpen
          ? <ChevronUp size={15} className="text-slate-400" />
          : <ChevronDown size={15} className="text-slate-400" />}
      </button>
      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
};

const EmptyState = ({ text }) => (
  <p className="text-slate-500 text-center py-8 text-sm">{text}</p>
);

const MiniCard = ({ label, value }) => (
  <div className="bg-slate-900/60 rounded-lg p-2.5">
    <p className="text-slate-500 text-[10px]">{label}</p>
    <p className="text-white font-semibold text-xs mt-0.5">{value}</p>
  </div>
);
