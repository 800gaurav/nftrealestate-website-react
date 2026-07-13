import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
// import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavigatorSetter from "./routers/NavigatorSetter";

import CursorWaterDrop from "./component/ClickRipple";
import Loader from "./utils/Loader";
import { baseUrl } from "./utils/axiosInstance";

const DEFAULT_WHATSAPP_NUMBER = "919617766804";

function App() {
  const { isLoggedIn } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);

  useEffect(() => {
    let mounted = true;
    fetch(`${baseUrl}/api/v1/admin/user/public-settings`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setWhatsappNumber(res?.data?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I need support for NFT RealEstate.")}`
    : "";

  return isLoggedIn ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <CursorWaterDrop />
      <Navbar />
      <Outlet />
      <Footer />

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
    </>
  );
}

export default App;
