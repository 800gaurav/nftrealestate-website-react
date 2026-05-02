import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import AboutRoute from "../sectionChild/AboutRoute";
import ContactRoute from "../sectionChild/ContactRoute";
import LoginPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";

import DashboardLayout from "../pages/dashboard/DashboardLayout";

import UserDashboard from "../pages/dashboard/UserDashboard";

import ActivateAccount from "../activation/ActivateAccount";
import ActiveReport from "../activation/ActiveReport";
import Maintofund from "../FundTransfer/maintofund";
import MainToFundTransferReport from "../FundTransfer/MainToFundTransferReport";
import FundToFundTransfer from "../FundTransfer/FundToFundTransfer";
import FundToFundTransferReport from "../FundTransfer/FundToFundTransferReport";
import DepositPage from "../Deposite/DepositPage";
import DepositReportPage from "../Deposite/DepositReportPage";
import WithdrawPage from "../Deposite/WithdrawPage";
import WithdrawHistoryPage from "../Deposite/WithdrawHistoryPage";
import DirectTeamPage from "../Team/DirectTeamPage";
import DownlineTeamPage from "../Team/DownlineTeamPage";
import ProBonusIncomePage from "../Income/ProBonusIncomePage";
import ReturnOnEquitityPage from "../Income/ReturnOnEquitityPage";
import DomesticIncomePage from "../Income/DomesticIncomePage";
import RoyalityIncomePage from "../Income/RoyalityIncomePage";

import LevelMemberDetails from "../Team/LevelMemberDetails";
import ChangePassword from "../pages/other/ChangePassword";
import ChangeTNXpassword from "../pages/other/ChangeTNXpassword";
import UpdateProfile from "../pages/other/UpdateProfile";
import DomesticIncomeusers from "../Income/DomesticIncomeusers";
import ForgotPassword from "../pages/other/ForgotPassword";
import VerifyOtpPage from "../auth/VerifyOtpPage";
import Layout from "../component/Layout";
import Stats from "../sectionChild/plans/Stats";
import { Hero, HeroJupiter } from "../sectionChild/Hero";
import IncomePlans from "../sectionChild/plans/IncomePlans";
import TermsAndConditions from "../sectionChild/plans/TermsAndConditions/TermsAndConditions";
import PrivateRoute from "./PrivateRoute";
import Plans from "../sectionChild/plans";
import Investment from "../sectionChild/investment";
import SingleInvestment from "../sectionChild/investment/SingleInvestment";
import AuthPage from "../auth/AuthPage";
import PublicRoute from "./PublicRoute";
import RankRewadPage from "../Income/RankReward";
import PrivacyPolicy from "../sectionChild/PrivacyPolicy";
import DeleteAccount from "../sectionChild/DeleteAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Layout><Hero /><HeroJupiter /></Layout> },
      { path: "/stats", element: <Layout><Stats /></Layout> },
      { path: "/incomePlans", element: <Layout><IncomePlans /></Layout> },
      { path: "/about", element: <Layout><AboutRoute /></Layout> },
      { path: "/privacy-policy", element: <Layout><PrivacyPolicy /></Layout> },
      { path: "/delete-account", element: <Layout><DeleteAccount /></Layout> },
      { path: "/termsConditions", element: <Layout><TermsAndConditions /></Layout> },
      { path: "/contact", element: <Layout><ContactRoute /></Layout> },
    ],
  },

  // Public pages
  { path: "/login", element: <PublicRoute><AuthPage /></PublicRoute> },
  { path: "/signup", element: <PublicRoute><SignUpPage /></PublicRoute> },
  { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
  { path: "/verify-otp", element: <PublicRoute><VerifyOtpPage /></PublicRoute> },

  // Private dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "home", element: <UserDashboard /> },
  
      { path: "portfolio/portfolio-report", element: <ActiveReport /> },

      // Transfer
      { path: "transfer/main-to-fund-transfer", element: <Maintofund /> },
      { path: "transfer/main-to-fund-transfer-report", element: <MainToFundTransferReport /> },
      { path: "transfer/fund-to-fund-transfer", element: <FundToFundTransfer /> },
      { path: "transfer/fund-to-fund-transfer-report", element: <FundToFundTransferReport /> },

      // Plan / Investment
      { path: "plan", element: <Plans /> },
      { path: "investment", element: <Investment /> },
      { path: "investment/:planId", element: <SingleInvestment /> },

      // Deposit / Withdraw
      { path: "funds/deposit", element: <DepositPage /> },
      { path: "funds/deposit-report", element: <DepositReportPage /> },
      { path: "funds/withdraw", element: <WithdrawPage /> },
      { path: "funds/withdraw-history", element: <WithdrawHistoryPage /> },

      // Teams
      { path: "teams/direct-team", element: <DirectTeamPage /> },
      { path: "teams/downline-team", element: <DownlineTeamPage /> },

      // Incomes
      { path: "incomes/pro-bonus-income", element: <ProBonusIncomePage /> },
      { path: "incomes/return-on-equitity", element: <ReturnOnEquitityPage /> },
      { path: "incomes/level-income", element: <DomesticIncomePage /> },
      { path: "incomes/appraisal-income", element: <RoyalityIncomePage /> },
      { path: "incomes/rank-reward", element: <RankRewadPage /> },

      // Profile / Password
      { path: "profile/update-profile", element: <UpdateProfile /> },
      { path: "password/change-password", element: <ChangePassword /> },
      { path: "password/change-txn-password", element: <ChangeTNXpassword /> },
    ],
  },

  // Other dashboard-level pages (directly accessible if logged-in)
  { path: "/dashboard/level-view/:level", element: <PrivateRoute><LevelMemberDetails /></PrivateRoute> },
  { path: "/dashboard/domestic-level-view/:level", element: <PrivateRoute><DomesticIncomeusers /></PrivateRoute> },
  { path: "dashboard/buy-nft/activation/nft/:price", element: <PrivateRoute><ActivateAccount /></PrivateRoute> },
]);
