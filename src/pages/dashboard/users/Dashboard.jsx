import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiUser,
  FiBriefcase,
  FiClock,
  FiPieChart,
  FiCreditCard,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiCalendar,
  FiAward,
  FiStar,
  FiLayers,
  FiBarChart2,
  FiDownload,
  FiArrowRight,
  FiPlus,
  FiMinus
} from "react-icons/fi";
import { ReferralBonusCard } from "../../ReferralBonusCard";

const Dashboard = () => {
  const [data, setData] = useState({});
  const { fetchData } = useAxios();
  const { loading, setloading, setdashboardData } = useAuth();
  const navigate = useNavigate();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  // Growth data (mock data for demonstration)
  const [growthData, setGrowthData] = useState({
    balanceGrowth: 12.5,
    incomeGrowth: 8.3,
    teamGrowth: 25.0,
    todayGrowth: -2.1
  });

  const userData = async () => {
    try {
      setloading(true);
      const res = await fetchData({
        url: `/api/v1/user/profile/user-dashboard/${userId}`,
      });
      setData(res.data || {});
      setdashboardData(res.data)
      setloading(false);
    } catch (error) {
      console.error("Error fetching  data:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  // Format currency in Indian Rupees
const formatCurrency = (amount, currency = "$") => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0.00`;
  }
  return `${currency}${Number(amount).toFixed(2)}`;
};

  // Calculate total income from all sources
  const totalIncome = (data.proBonusIncome || 0) + (data.roiIncome || 0) +
    (data.royaltyIncome || 0) + (data.domesticIncome || 0);

  // Calculate working vs non-working income percentages
  const workingIncome = (data.proBonusIncome || 0) + (data.royaltyIncome || 0);
  const nonWorkingIncome = data.roiIncome || 0;
  const workingPercentage = totalIncome > 0 ? (workingIncome / totalIncome) * 100 : 0;
  const nonWorkingPercentage = totalIncome > 0 ? (nonWorkingIncome / totalIncome) * 100 : 0;

  // Navigation handlers
  const handleTeamReport = () => {
    navigate('/dashboard/teams/direct-team');
  };

  const handleIncomeReport = () => {
    navigate('/dashboard/incomes/pro-bonus-income');
  };

  const handleDeposit = () => {
    navigate('/dashboard/funds/deposit');
  };
  const handletransfer = () => {
    navigate('/dashboard/transfer/main-to-fund-transfer');
  };

  const handleWithdraw = () => {
    navigate('/dashboard/funds/withdraw');
  };

  const targetReferrals = 10;
 const usercreatedAt = "2026-01-12T11:46:28.578Z" 
const directActive = data?.directActiveReferrals || 0;
const remainingDirect = Math.max(0, targetReferrals - directActive);
const referralProgress = Math.min((directActive / targetReferrals) * 100, 100);

  return (
    <div className="mt-[80px] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-200">
      {/* Header with Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 ">

      <div className="mb-8 ">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-2 text-white">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back, {data.username || 'User'}! Here's your performance summary</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <ActionButton 
              icon={<FiUsers className="mr-2" />}
              text="Team Report"
              onClick={handleTeamReport}
              variant="primary"
            />
            <ActionButton 
              icon={<FiBarChart2 className="mr-2" />}
              text="Income Report"
              onClick={handleIncomeReport}
              variant="secondary"
            />
            <ActionButton 
              text="Fund Transfer"
              onClick={handletransfer}
              variant="success"
            />
            <ActionButton 
              icon={<FiMinus className="mr-2" />}
              text="Withdraw"
              onClick={handleWithdraw}
              variant="warning"
            />
            <ActionButton 
              icon={<FiPlus className="mr-2" />}
              text="Deposit"
              onClick={handleDeposit}
              variant="success"
            />
          </div>
        </div>

       
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Fund Balance"
          value={formatCurrency(data.fundBalance)}
          icon={<FiCreditCard className="text-white" />}
          gradient="from-blue-500 to-cyan-400"
          // growth={growthData.balanceGrowth}
        />
        <StatCard
          title="Main Balance"
          value={formatCurrency(data.walletBalance)}
          icon={<FiDollarSign className="text-white" />}
          gradient="from-emerald-500 to-green-400"
          // growth={growthData.incomeGrowth}
        />
        <StatCard
          title="Team Members"
          value={data?.totalTeamMembers || 0}
          icon={<FiUsers className="text-white" />}
          gradient="from-purple-500 to-indigo-400"
          // growth={growthData.teamGrowth}
          isCurrency={false}
        />
        <StatCard
          title="Today's Income"
          value={formatCurrency(data.todayIncome)}
          icon={<FiActivity className="text-white" />}
          gradient="from-amber-500 to-yellow-400"
          // growth={growthData.todayGrowth}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        <ReportCard
          title="WALLET REPORT"
          icon={<FiCreditCard className="text-blue-400" />}
        >
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Total Invest"
              value={formatCurrency(data.totalInvested)}
              icon={<FiTrendingUp className="text-purple-400" />}
            />
            <InfoItem
              label="Team Business"
              value={formatCurrency(data?.totalTeamBusiness)}
              icon={<FiBriefcase className="text-orange-400" />}
              isCurrency={true}
            />
            <InfoItem
              label="Today's Income"
              value={formatCurrency(data.todayIncome)}
              icon={<FiDollarSign className="text-amber-400" />}
              isCurrency={true}
            />
            <InfoItem
              label="Total Income"
              value={formatCurrency(data.totalProfitEarned)}
              icon={<FiDollarSign className="text-amber-400" />}
              isCurrency={true}
            />
          </div>
        </ReportCard>

        {/* Team Report */}
        <ReportCard
          title="TEAM REPORT"
          icon={<FiUsers className="text-indigo-400" />}
        >
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Total Team"
              value={data?.totalTeamMembers || 0}
              icon={<FiUsers className="text-indigo-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Direct Team"
              value={data.directReferrals || 0}
              icon={<FiUser className="text-blue-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Active Total"
              value={data.totalActiveTeamMembers || 0}
              icon={<FiActivity className="text-green-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Active Direct"
              value={data.directActiveReferrals || 0}
              icon={<FiAward className="text-teal-400" />}
              isCurrency={false}
            />
          </div>
          <button 
            onClick={handleTeamReport}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            View Detailed Report <FiArrowRight className="ml-2" />
          </button>
        </ReportCard>

        {/* Income Summary */}
        <ReportCard
          title="INCOME SUMMARY"
          icon={<FiTrendingUp className="text-emerald-400" />}
        >
          <div className="space-y-4">
            <IncomeBar
              label="Referral Bonus"
              value={Number(data.proBonusIncome || 0).toFixed(2)}
            //  ercentage={data.proBonusIncome ? (data.proBonusIncome / totalIncome) * 100 : 0}
              color="from-blue-400 to-cyan-400"
            />
            <IncomeBar
              label="ROI Income"
              value={Number(data.roiIncome || 0).toFixed(2)}
              // percentage={data.roiIncome ? (data.roiIncome / totalIncome) * 100 : 0}
              color="from-green-400 to-emerald-400"
            />
            <IncomeBar
              label="Level Income"
              value={Number(data.lavelIncome || 0).toFixed(2)}
              // percentage={data.lavelIncome ? (data.lavelIncome / totalIncome) * 100 : 0}
              color="from-purple-400 to-indigo-400"
            />
            <IncomeBar
              label="Appraisal Income"
              value={Number(data.royaltyIncome || 0).toFixed(2)}
              // percentage={data.royaltyIncome ? (data.royaltyIncome / totalIncome) * 100 : 0}
              color="from-amber-400 to-yellow-400"
            />
            <IncomeBar
              label="Rank Reward"
              value={Number(data.rankRewardIncome || 0).toFixed(2)}
              // percentage={data.rankreward ? (data.rankreward / totalIncome) * 100 : 0}
              color="from-red-400 to-pink-400"
            />
          </div>
          <button 
            onClick={handleIncomeReport}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            View Income Report <FiArrowRight className="ml-2" />
          </button>
        </ReportCard>
      </div>
{/* DIRECT REFERRAL BONUS OFFER */}
{usercreatedAt < data.createdAt && (
<ReferralBonusCard
  directActive={directActive}
  remainingDirect={remainingDirect}
  progress={referralProgress}
/>
)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <ReportCard
          title="PROFILE INFORMATION"
          icon={<FiUser className="text-blue-400" />}
          fullHeight
        >
          <div className="space-y-4">
            <InfoItem
              label="User ID"
              value={userId || "N/A"}
              icon={<FiUser className="text-gray-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Username"
              value={data.username || "N/A"}
              icon={<FiStar className="text-amber-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Join Date"
              value={data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
              icon={<FiCalendar className="text-gray-400" />}
              isCurrency={false}
            />
            <InfoItem
              label="Status"
              value={data.isActivated ? "Active" : "Inactive"}
              status={data.isActivated}
              icon={data.isActivated ? <FiAward className="text-green-400" /> : <FiClock className="text-gray-400" />}
              isCurrency={false}
            />
          </div>
        </ReportCard>

        {/* Income Breakdown */}
        <ReportCard
          title="INCOME BREAKDOWN"
          icon={<FiPieChart className="text-emerald-400" />}
          fullHeight
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IncomeType
                title="Working Income"
                subtitle="Active Earnings"
                value={(workingIncome || 0).toFixed(2)}
                icon={<FiBriefcase className="text-white" />}
                percentage={workingPercentage}
              />
              <IncomeType
                title="Passive Income"
                subtitle="Automatic Earnings"
                value={(nonWorkingIncome || 0).toFixed(2)}
                icon={<FiClock className="text-white" />}
                percentage={nonWorkingPercentage}
              />
            </div>

            {/* Income Distribution Chart */}
           

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleDeposit}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
              >
                <FiPlus className="mr-1" /> Deposit
              </button>
              <button 
                onClick={handleWithdraw}
                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
              >
                <FiMinus className="mr-1" /> Withdraw
              </button>
            </div>
          </div>
        </ReportCard>
      </div>
    </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({ icon, text, onClick, variant = "primary" }) => {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 border-blue-500",
    secondary: "bg-purple-600 hover:bg-purple-700 border-purple-500",
    success: "bg-emerald-600 hover:bg-emerald-700 border-emerald-500",
    warning: "bg-amber-600 hover:bg-amber-700 border-amber-500"
  };

  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105 border`}
    >
      {icon}
      {text}
    </button>
  );
};




// Stat Card Component with Growth Indicator
const StatCard = ({ title, value, icon, gradient, growth, isCurrency = true }) => {
  const isPositive = growth >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>

         
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className={`h-1 mt-4 bg-gradient-to-r ${gradient} rounded-full`}></div>
    </div>
  );
};

// Report Card Component
const ReportCard = ({ title, icon, children, fullHeight = false }) => (
  <div className={`bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 ${fullHeight ? "h-full" : ""}`}>
    <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-700">
      <h3 className="font-semibold text-white">{title}</h3>
      {icon}
    </div>
    {children}
  </div>
);

// Info Item Component with Icon
const InfoItem = ({ label, value, status = null, icon, isCurrency = true }) => (
  <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border border-gray-600 flex items-center">
    <div className="mr-3 p-2 bg-gray-600 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`font-medium ${status !== null ? (status ? "text-emerald-400" : "text-red-400") : "text-white"}`}>
        {isCurrency ? `$${value.replace('$', '')}` : value}
      </p>
    </div>
  </div>
);

// Income Bar Component
const IncomeBar = ({ label, value, percentage, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{label}</span>
      <span className="font-medium text-white">${value}</span>
    </div>
    {/* <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div> */}
    {/* <div className="text-xs text-gray-400 mt-1">{(percentage || 0).toFixed(1)}% of total income</div> */}
  </div>
);

// Income Type Component
const IncomeType = ({ title, subtitle, value, icon, percentage }) => (
  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl text-center text-white relative overflow-hidden border border-gray-700">
    <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-5 rounded-bl-full"></div>
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-10 mb-3">
      {icon}
    </div>
    <h4 className="font-medium">{title}</h4>
    <p className="text-sm text-gray-300 mb-2">{subtitle}</p>
    <p className="text-xl font-bold">${value}</p>
    <div className="mt-2 text-sm text-gray-300">{(percentage || 0).toFixed(1)}% of total</div>
  </div>
);

export default Dashboard;