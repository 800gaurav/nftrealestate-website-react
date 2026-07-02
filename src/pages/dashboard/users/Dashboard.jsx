import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiDollarSign, FiUsers, FiTrendingUp, FiUser, FiBriefcase,
  FiClock, FiCreditCard, FiActivity,
  FiAward, FiArrowRight, FiPlus, FiGift,
} from "react-icons/fi";
import { ReferralBonusCard } from "../../ReferralBonusCard";

const Dashboard = () => {
  const [data, setData] = useState({});
  const { fetchData } = useAxios();
  const { setloading, setdashboardData } = useAuth();
  const navigate = useNavigate();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  const userData = async () => {
    try {
      setloading(true);
      const res = await fetchData({ url: `/api/v1/user/profile/user-dashboard/${userId}` });
      setData(res.data || {});
      setdashboardData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };

  const fetchAlertMessage = async () => {
    try {
      const res = await fetchData({ url: `/api/v1/admin/user/get-banner` });
      if (res?.show) {
        Swal.fire({
          title: `<span style="font-size: 16px; font-weight: bold;">${res.message}</span>`,
          background: '#1a202c',
          color: 'white',
          confirmButtonColor: '#02D396'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userData();
    fetchAlertMessage();
  }, []);

  const fmt = (v) => `$${Number(v || 0).toFixed(2)}`;

  const sponsorIncome = data.sponsorIncome || data.proBonusIncome || 0;
  const stakingIncome = data.stakingIncome || data.roiIncome || 0;
  const matchingIncome = data.matchingIncome || 0;
  const rankRewardIncome = data.rankRewardIncome || 0;

  const directActive = data?.directActiveReferrals || 0;
  const targetReferrals = 10;
  const remainingDirect = Math.max(0, targetReferrals - directActive);
  const referralProgress = Math.min((directActive / targetReferrals) * 100, 100);
  const usercreatedAt = "2026-01-12T11:46:28.578Z";

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-200 pt-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1 text-white">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back, {data.username || "User"}! Here's your performance summary</p>
        </div>

        {/* Activation Banner */}
        {data && data.isActivated === false && (
          <div className="mb-6 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-cyan-500/20 p-2 rounded-lg shrink-0">
                <FiActivity className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-bold">Account Not Activated</p>
                <p className="text-cyan-200/70 text-sm mt-0.5">Buy a package to activate your account and start earning staking and binary matching income.</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard/funds/deposit")}
              className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <FiPlus /> Buy Package Now
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Wallet Balance"  value={fmt(data.walletBalance)}       icon={<FiDollarSign className="text-white" />} gradient="from-emerald-500 to-green-400"  sub="Available to withdraw" />
          <StatCard title="Today Income"  value={fmt(data.todayIncome)}        icon={<FiCreditCard className="text-white" />}  gradient="from-blue-500 to-cyan-400"     sub="Package amount" />
          <StatCard title="Fund Wallet"     value={fmt(data.fundBalance)}          icon={<FiGift className="text-white" />}       gradient="from-rose-500 to-pink-400"     sub="Use to buy packages" />
          <StatCard title="Total Earned"    value={fmt(data.totalProfitEarned)}    icon={<FiTrendingUp className="text-white" />}  gradient="from-purple-500 to-indigo-400" sub="Lifetime income" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Wallet Report */}
          <ReportCard title="WALLET REPORT" icon={<FiCreditCard className="text-blue-400" />}>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Total Invest"    value={fmt(data.totalInvested)}       icon={<FiTrendingUp className="text-purple-400" />} isCurrency={false} />
              <InfoItem label="Team Business"   value={fmt(data.totalTeamBusiness)}   icon={<FiBriefcase className="text-orange-400" />}  isCurrency={false} />
              <InfoItem label="Wallet Balance"  value={fmt(data.walletBalance)}        icon={<FiDollarSign className="text-emerald-400" />} isCurrency={false} />
              <InfoItem label="Fund Wallet"     value={fmt(data.fundBalance)}          icon={<FiGift className="text-rose-400" />}         isCurrency={false} />
            </div>
          </ReportCard>

          {/* Team Report */}
          <ReportCard title="TEAM REPORT" icon={<FiUsers className="text-indigo-400" />}>
            <div className="grid grid-cols-2 gap-3">
              <TeamBox side="LEFT" total={data.leftTotal || 0} active={data.leftActive || 0} business={data.leftTeamBusiness || 0} />
              <TeamBox side="RIGHT" total={data.rightTotal || 0} active={data.rightActive || 0} business={data.rightTeamBusiness || 0} />
            </div>
            <button
              onClick={() => navigate("/dashboard/teams/tree")}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
            >
              View Team Tree <FiArrowRight className="ml-2" />
            </button>
          </ReportCard>

          {/* Income Summary */}
          <ReportCard title="INCOME SUMMARY" icon={<FiTrendingUp className="text-emerald-400" />}>
            <div className="space-y-3">
              <IncomeBar label="Staking Income"  value={stakingIncome.toFixed(2)}  color="bg-green-500" />
              <IncomeBar label="Matching Income" value={matchingIncome.toFixed(2)} color="bg-purple-500" />
              {/* <IncomeBar label="Rank Reward"     value={rankRewardIncome.toFixed(2)} color="bg-pink-500" /> */}
            </div>
            <button
              onClick={() => navigate("/dashboard/income/report")}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
            >
              View Full Income Report <FiArrowRight className="ml-2" />
            </button>
          </ReportCard>
        </div>

        {usercreatedAt < data.createdAt && (
          <ReferralBonusCard directActive={directActive} remainingDirect={remainingDirect} progress={referralProgress} />
        )}

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient, sub }) => (
  <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        {sub && <p className="text-gray-500 text-xs mt-0.5">{sub}</p>}
      </div>
      <div className={`p-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}>{icon}</div>
    </div>
    <div className={`h-1 mt-4 bg-gradient-to-r ${gradient} rounded-full`}></div>
  </div>
);

const ReportCard = ({ title, icon, children }) => (
  <div className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700">
    <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-700">
      <h3 className="font-semibold text-white">{title}</h3>
      {icon}
    </div>
    {children}
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 flex items-center gap-3">
    <div className="p-2 bg-gray-600 rounded-full shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-white truncate">{value}</p>
    </div>
  </div>
);

const IncomeBar = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
      <span className="text-gray-300">{label}</span>
    </div>
    <span className="font-semibold text-white">${value}</span>
  </div>
);

const TeamBox = ({ side, total, active, business }) => (
  <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-3 text-center">
    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${side === 'LEFT' ? 'text-blue-400' : 'text-purple-400'}`}>{side}</p>
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Total</span>
        <span className="text-white font-bold text-sm">{total}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Active</span>
        <span className="text-green-400 font-bold text-sm">{active}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Inactive</span>
        <span className="text-red-400 font-bold text-sm">{total - active}</span>
      </div>
      {/* <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Business</span>
        <span className="text-cyan-300 font-bold text-sm">${Number(business || 0).toFixed(2)}</span>
      </div> */}
    </div>
  </div>
);

export default Dashboard;
