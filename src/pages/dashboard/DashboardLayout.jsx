import { Outlet } from "react-router-dom";
import Usernav from "./users/Usernav";

// DashboardLayout.jsx
export default function DashboardLayout() {
  return (
    <div>
       <Usernav />
      {/* <header>Dashboard Header</header> */}
      <main><Outlet /></main>
    </div>
  );
}
