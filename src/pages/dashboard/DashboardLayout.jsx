import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, Menu, X, ChevronDown, ChevronRight,
  Sparkles, Home, Users, Network,
  TrendingUp, History, Award,
  Wallet, ArrowUpFromLine, ClockArrowDown,
  Key, UserRoundPen, LogOut, Copy, Check,
  ShieldCheck, Gift, ChevronLeft,
  User, BadgeCheck, CalendarDays, Hash,
  Layers,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Cookies from "js-cookie";
import { baseUrl } from "../../utils/axiosInstance";

const DEFAULT_WHATSAPP_NUMBER = "919617766804";

const MENU = [
  { label: "Dashboard",     icon: Home,          to: "/dashboard", end: true },
  { label: "Buy Package",   icon: Sparkles,      to: "/dashboard/funds/deposit", highlight: true },
  { label: "Income Report", icon: TrendingUp,    to: "/dashboard/income/report" },
  { label: "Rank Reward",   icon: Award,         to: "/dashboard/income/rank-reward" },
  {
    label: "Team", icon: Users,
    children: [
      { label: "Direct Team", icon: Users,   to: "/dashboard/teams/direct-team" },
      { label: "My Tree",     icon: Network, to: "/dashboard/teams/tree" },
    ],
  },
  {
    label: "Withdraw", icon: ArrowUpFromLine,
    children: [
      { label: "Withdraw Funds",   icon: Wallet,         to: "/dashboard/funds/withdraw" },
      { label: "Withdraw History", icon: ClockArrowDown, to: "/dashboard/funds/withdraw-history" },
    ],
  },

  {
    label: "Account", icon: UserRoundPen,
    children: [
      { label: "Update Profile",  icon: UserRoundPen, to: "/dashboard/profile/update-profile" },
      { label: "Change Password", icon: Key,          to: "/dashboard/password/change-password" },
      { label: "Change TXN Pass", icon: Key,          to: "/dashboard/password/change-txn-password" },
    ],
  },
  { label: "Services", icon: Layers, to: "/dashboard/services" },
];

// ── SIDEBAR ITEM ──────────────────────────────────────────────────────────────
const SidebarItem = ({ item, collapsed, closeMobile }) => {
  const location = useLocation();
  const [open, setOpen] = useState(() =>
    item.children?.some(c => location.pathname.startsWith(c.to))
  );

  useEffect(() => {
    if (item.children?.some(c => location.pathname.startsWith(c.to))) setOpen(true);
  }, [location.pathname]);

  const Icon = item.icon;

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        end={item.end}
        onClick={closeMobile}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[15px] font-semibold group relative
          ${item.highlight
            ? isActive
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
              : "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-white hover:from-cyan-500/30 hover:to-blue-600/30"
            : isActive
              ? "bg-white/15 text-white border-l-2 border-cyan-400"
              : "text-white hover:bg-white/10"
          }`
        }
      >
        <Icon size={17} className="shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {collapsed && (
          <span className="absolute left-full ml-3 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
            {item.label}
          </span>
        )}
      </NavLink>
    );
  }

  const hasActiveChild = item.children.some(c => location.pathname.startsWith(c.to));

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[15px] font-semibold group relative
          ${hasActiveChild ? "bg-white/10 text-white" : "text-white hover:bg-white/10"}`}
      >
        <Icon size={17} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </>
        )}
        {collapsed && (
          <span className="absolute left-full ml-3 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
            {item.label}
          </span>
        )}
      </button>

      {!collapsed && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="ml-3 mt-1 pl-3 border-l border-white/10 space-y-0.5">
                {item.children.map(child => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                      ${isActive ? "bg-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400" : "text-white hover:bg-white/10"}`
                    }
                  >
                    <child.icon size={13} className="shrink-0" />
                    <span className="truncate">{child.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const closeMobile = () => setMobileOpen(false);

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 h-16 border-b border-white/8 shrink-0`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { navigate("/dashboard"); closeMobile(); }}>
            <img src="/Images/logo1.png" alt="Logo" className="h-35 w-auto object-contain" />
          </div>
        )}
        {collapsed && (
          <div className="cursor-pointer" onClick={() => { navigate("/dashboard"); closeMobile(); }}>
            <img src="/Images/logo1.png" alt="Logo" className="h-7 w-7 object-contain" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white transition-all shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
        {MENU.map(item => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} closeMobile={closeMobile} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2.5 py-3 border-t border-white/8 shrink-0">
        <button
          onClick={() => { logout(); closeMobile(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-semibold text-white hover:bg-red-500/10 hover:text-red-300 transition-all group relative"
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <span className="absolute left-full ml-3 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className={`hidden lg:flex flex-col fixed top-0 left-0 h-full z-40 bg-[#0d1525] border-r border-white/8 transition-all duration-300 ${collapsed ? "w-[60px]" : "w-[220px]"}`}>
        {content}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="lg:hidden fixed top-0 left-0 h-full w-[260px] z-50 bg-[#0d1525] border-r border-white/8 shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white z-10"
              >
                <X size={16} />
              </button>
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ── TOP HEADER ────────────────────────────────────────────────────────────────
const TopHeader = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const { logout, currentUser, dashboardData } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const dropRef = useRef(null);
  const navigate = useNavigate();

  const userFromCookie = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const displayName = dashboardData?.username || currentUser?.name || userFromCookie?.name || "User";
  const displayEmail = currentUser?.email || userFromCookie?.email || "";
  const displayUserId = currentUser?.userId || userFromCookie?.userId || "N/A";
  const referralCode = currentUser?.referralCode || userFromCookie?.referralCode || "";
  const isActivated = dashboardData?.isActivated ?? true;

  const getReferralLink = (side) =>
    `${window.location.origin}/signup?referalID=${referralCode}&username=${encodeURIComponent(displayName)}&side=${side}`;

  const copyRef = (side) => {
    navigator.clipboard.writeText(getReferralLink(side));
    setCopied(side);
    setTimeout(() => setCopied(""), 2000);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={`fixed top-0 right-0 z-30 h-16 bg-[#0d1525]/95 backdrop-blur-md border-b border-white/8 flex items-center justify-between px-3 sm:px-5 transition-all duration-300 left-0 ${collapsed ? "lg:left-[60px]" : "lg:left-[220px]"}`}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 text-white transition-all active:scale-95"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div className="flex items-center gap-2">
          <LayoutDashboard size={16} className="text-cyan-400" />
          <span className="text-white font-semibold text-sm">NFT RealEstate</span>
        </div>
      </div>

      {/* Right — profile only, no buy button */}
      <div className="flex items-center gap-2" ref={dropRef}>
        <button
          onClick={() => setProfileOpen(o => !o)}
          className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/10 px-3 py-2 rounded-xl transition-colors"
        >
          {/* Avatar circle with initials */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-white text-xs font-semibold max-w-[90px] truncate">{displayName}</span>
            <span className="text-slate-500 text-[10px] mt-0.5">{displayUserId}</span>
          </div>
          <ChevronDown size={13} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.13 }}
              className="absolute right-3 top-[68px] w-80 bg-[#0d1525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-cyan-700 to-blue-800 p-5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white text-2xl font-extrabold border-2 border-white/30">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white truncate text-base">{displayName}</p>
                  <p className="text-cyan-200 text-xs truncate mt-0.5">{displayEmail}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActivated ? "bg-emerald-400/20 text-emerald-300" : "bg-yellow-400/20 text-yellow-300"}`}>
                      {isActivated ? "✓ Active" : "⏳ Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info rows */}
              <div className="px-4 py-3 space-y-2.5 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <Hash size={13} className="text-slate-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500">User ID</p>
                    <p className="text-sm text-white font-mono font-semibold">{displayUserId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Gift size={13} className="text-yellow-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-500">Referral Code</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <code className="text-sm text-cyan-300 font-mono font-semibold flex-1 truncate">{referralCode || "N/A"}</code>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["left", "right"].map((side) => (
                        <button
                          key={side}
                          type="button"
                          disabled={!referralCode}
                          onClick={() => copyRef(side)}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2 py-1.5 text-[11px] font-bold text-cyan-200 transition-colors hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {copied === side ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          Copy {side === "left" ? "Left" : "Right"} Link
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={13} className="text-slate-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500">Wallet Balance</p>
                    <p className="text-sm text-emerald-400 font-bold">${Number(dashboardData?.walletBalance || 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-2">
                <NavLink to="/dashboard/profile/update-profile" onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors">
                  <UserRoundPen size={15} className="text-blue-400" /> Update Profile
                </NavLink>
                <NavLink to="/dashboard/password/change-password" onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors">
                  <Key size={15} className="text-blue-400" /> Change Password
                </NavLink>
                <NavLink to="/dashboard/password/change-txn-password" onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors">
                  <Key size={15} className="text-purple-400" /> Change TXN Password
                </NavLink>
                <div className="my-1 border-t border-white/8" />
                <button onClick={() => { logout(); setProfileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors">
                  <LogOut size={15} className="text-red-400" /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// ── LAYOUT ────────────────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    let mounted = true;
    fetch(`${baseUrl}/api/v1/admin/user/public-settings`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) setWhatsappNumber(res?.data?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I need support for NFT RealEstate.")}`
    : "";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <TopHeader collapsed={collapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={`transition-all duration-300 pt-16 min-h-screen ${collapsed ? "lg:pl-[60px]" : "lg:pl-[220px]"}`}>
        <Outlet />
      </main>
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-950/50 ring-4 ring-white/10 transition-transform hover:scale-105 hover:bg-[#1ebe5d]"
        >
          <FaWhatsapp size={31} />
        </a>
      )}
    </div>
  );
}
