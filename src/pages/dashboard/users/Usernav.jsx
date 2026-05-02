import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  User,
  Copy,
  Check,
  Home,
  LogOut,
  Key,
  Award,
  Sparkles,
  Crown,
  Wallet,
  Gift,
  UserRoundPen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
import Cookies from "js-cookie";

const Usernav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
   const { fetchData } = useAxios();
  const { logout, currentUser } = useAuth();
  const [data, setData] = useState({});
  const { loading, setloading, dashboardData } = useAuth();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;



  const referralLink = `${window.location.origin}/login?referalID=${currentUser.referralCode}&username=${encodeURIComponent(currentUser.name)}`;

  const copyReferralLink = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo + Brand */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div >
            <img
              src="/Images/logo1.png"
              alt="Logo"
              className="h-25 w-30 rounded-xl  border-white/20"
            />

          </div>

        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium backdrop-blur-sm ${isActive
                ? "bg-white/20 text-white shadow-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>



          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <User size={18} />
              <span className="font-medium">Profile</span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl z-20 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Crown size={24} className="text-yellow-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {dashboardData?.username || "User Name"}
                        </p>
                        <p className="text-sm text-blue-100">
                          {dashboardData?.email || "Email id"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Stats */}
                  <div className="p-4 border-b border-white/10">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-xs text-blue-200">User ID</p>
                        <p className="text-sm font-medium text-white">
                          {currentUser?.userId?.substring(0, 10) || "N/A"}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-xs text-blue-200">Status</p>
                        <p className="text-sm font-medium text-green-400">Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Referral Section */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Gift size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium text-white">Referral Code</span>
                      </div>
                      <Award size={16} className="text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                      <code className="text-sm font-mono text-white flex-1 truncate">
                        {currentUser?.referralCode || "N/A"}
                      </code>
                      <button
                        onClick={copyReferralLink}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                      >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-blue-400" />}
                      </button>
                    </div>
                    <p className="text-xs text-blue-300 mt-2 text-center">
                      Earn rewards by sharing your code
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <NavLink
                      to="/dashboard/password/change-password"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:bg-white/5 rounded-xl transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Key size={18} className="text-blue-400" />
                      Change Password
                    </NavLink>
                    <NavLink
                      to="/dashboard/profile/update-profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:bg-white/5 rounded-xl transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserRoundPen size={18} className="text-blue-400" />
                      Update Profile
                    </NavLink>

                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut size={18} className="text-red-400" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-purple-900 to-blue-900 border-t border-white/10 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Home Link */}
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Home size={20} />
                Home
              </NavLink>

              {/* User Info Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {currentUser?.name || "User Name"}
                    </p>
                    <p className="text-sm text-blue-200">
                      {currentUser?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-blue-300">User ID</p>
                    <p className="text-sm font-medium text-white truncate">
                      {currentUser?.userId?.substring(0, 10) || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-blue-300">Referral Code</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        {currentUser?.referralCode || "N/A"}
                      </p>
                      <button
                        onClick={copyReferralLink}
                        className="text-blue-300 hover:text-white"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <NavLink
                to="/dashboard/password/change-password"
                className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Key size={20} className="text-blue-400" />
                Change Password
              </NavLink>
              <NavLink
                to="/dashboard/profile/update-profile"
                className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <UserRoundPen size={20} className="text-blue-400" />
                Update Profile
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <LogOut size={20} className="text-red-400" />
                Logout
              </button>

              {/* Referral Button */}
              <button
                onClick={copyReferralLink}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mt-4 shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                {copied ? "Copied!" : "Copy Referral Link"}
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Usernav;