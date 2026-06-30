import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutRoute from "../sectionChild/AboutRoute";
import ContactRoute from "../sectionChild/ContactRoute";
import SignUpPage from "../auth/SignUpPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/users/Dashboard";
import ActivateAccount from "../activation/ActivateAccount";
import DepositPage from "../Deposite/DepositPage";
import WithdrawPage from "../Deposite/WithdrawPage";
import WithdrawHistoryPage from "../Deposite/WithdrawHistoryPage";
import DirectTeamPage from "../Team/DirectTeamPage";
import BinaryTreePage from "../Team/BinaryTreePage";
import ChangePassword from "../pages/other/ChangePassword";
import ChangeTNXpassword from "../pages/other/ChangeTNXpassword";
import UpdateProfile from "../pages/other/UpdateProfile";
import ForgotPassword from "../pages/other/ForgotPassword";
import VerifyOtpPage from "../auth/VerifyOtpPage";
import Layout from "../component/Layout";
import NftRealEstateLanding from "../sectionChild/NftRealEstateLanding";
import IncomePlans from "../sectionChild/plans/IncomePlans";
import TermsAndConditions from "../sectionChild/plans/TermsAndConditions/TermsAndConditions";
import PrivateRoute from "./PrivateRoute";
import AuthPage from "../auth/AuthPage";
import PublicRoute from "./PublicRoute";
import PrivacyPolicy from "../sectionChild/PrivacyPolicy";
import DeleteAccount from "../sectionChild/DeleteAccount";
import IncomeReportPage from "../Income/IncomeReportPage";
import RankRewardPage from "../Income/RankRewardPage";
import ServicesPage from "../sectionChild/ServicesPage";
import DashboardServicesPage from "../pages/dashboard/DashboardServicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",               element: <Layout><NftRealEstateLanding /></Layout> },
      { path: "/incomePlans",    element: <Layout><IncomePlans /></Layout> },
      { path: "/about",          element: <Layout><AboutRoute /></Layout> },
      { path: "/privacy-policy", element: <Layout><PrivacyPolicy /></Layout> },
      { path: "/delete-account", element: <Layout><DeleteAccount /></Layout> },
      { path: "/termsConditions",element: <Layout><TermsAndConditions /></Layout> },
      { path: "/contact",        element: <Layout><ContactRoute /></Layout> },
      { path: "/services",       element: <Layout><ServicesPage /></Layout> },
    ],
  },

  { path: "/login",          element: <PublicRoute><AuthPage /></PublicRoute> },
  { path: "/signup",         element: <PublicRoute><SignUpPage /></PublicRoute> },
  { path: "/forgot-password",element: <PublicRoute><ForgotPassword /></PublicRoute> },
  { path: "/verify-otp",     element: <PublicRoute><VerifyOtpPage /></PublicRoute> },

  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true,                              element: <Dashboard /> },
      { path: "home",                             element: <Dashboard /> },
      { path: "funds/deposit",                    element: <DepositPage /> },
      { path: "funds/withdraw",                   element: <WithdrawPage /> },
      { path: "funds/withdraw-history",           element: <WithdrawHistoryPage /> },
      { path: "income/report",                    element: <IncomeReportPage /> },
      { path: "income/rank-reward",               element: <RankRewardPage /> },
      { path: "teams/direct-team",                element: <DirectTeamPage /> },
      { path: "teams/tree",                       element: <BinaryTreePage /> },
      { path: "profile/update-profile",           element: <UpdateProfile /> },
      { path: "password/change-password",         element: <ChangePassword /> },
      { path: "password/change-txn-password",     element: <ChangeTNXpassword /> },
      { path: "services",                         element: <DashboardServicesPage /> },
    ],
  },

  { path: "dashboard/buy-nft/activation/nft/:price", element: <PrivateRoute><ActivateAccount /></PrivateRoute> },
]);
