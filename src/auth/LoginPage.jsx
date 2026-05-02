import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Eye, EyeOff, X, User, Lock, Shield, Copy, ArrowLeft, Check } from "lucide-react";
import GradientButton from "../reuseis/GradientButton";
import { useAuth } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import Captcha from "./Captcha";
import Swal from "sweetalert2";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import Button from "../component/wrapper/Button";
import { showErrorToast, showSuccessToast } from "../component/toaster";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const user = location.state?.userdata;
 
  const { fetchData } = useAxios()
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchainput, setCaptchaInput] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(location.state?.fromSignup && location.state?.userdata);
  const [copiedField, setCopiedField] = useState(null);

  const [searchParams] = useSearchParams();
  const userId = searchParams?.get("userId");
  const token = searchParams?.get("token");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  useEffect(() => {
    if (userId || token) {
      setFormData({
        userId: userId,
        password: token
      });
      setCaptchaInput(captcha)
      handleLoginByadmin(userId, token)
    }
  }, [])


  const fetchAlertMessage = async () => {
    try {
      const res = await fetchData({
        url: `/api/v1/admin/user/get-banner`,
      });
      if (res.show) {
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
    fetchAlertMessage();
  }, []);


  const handleLoginByadmin = async (userIdw, tokenw) => {
    try {
      const res = await fetchData({
        url: '/api/v1/user/auth/login',
        method: "POST",
        data: {
          userId: userIdw,
          usertoken: tokenw
        }
      });

      if (res.success) {
        navigate("/dashboard");
        login(res?.data);
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      toast.error("User ID and Password are required");
      return;
    }
    if (captchainput != captcha) {
      toast.error("Captcha does not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData({
        url: '/api/v1/user/auth/login',
        method: "POST",
        data: formData
      });

      if (res.success) {
        navigate("/dashboard");
        login(res?.data);

        showSuccessToast('Login Successfull!')
      } else {
        showErrorToast(res?.message || "Login failed")

      }
    } catch (err) {
      console.log(err);
        showErrorToast(err?.message || "Login failed")
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const closeUserInfoPopup = () => {
    setShowUserInfo(false);
    // Remove the user data from location state to prevent the popup from showing again on refresh
    window.history.replaceState({}, document.title);
  };



  return (
    <>
      {/* User Info Modal */}
      {showUserInfo && user && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          // className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-transparent bg-opacity-50"
         className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeUserInfoPopup}
        >
        
        </motion.div>
      )}

    </>
  );
};

export default LoginPage;