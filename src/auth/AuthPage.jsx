import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, User, Lock, Mail, Phone, Key, Shield,
  X, Copy, Check, ArrowLeft
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import Captcha from "./Captcha";
import Swal from "sweetalert2";
import { showErrorToast, showSuccessToast } from "../component/toaster";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    username: "",
    phone: "",
    referralCode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchainput, setCaptchaInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: '+91', name: 'India', flag: '🇮🇳' });
  const [fieldErrors, setFieldErrors] = useState({});

  const user = location.state?.userdata;
  const [showUserInfo, setShowUserInfo] = useState(location.state?.fromSignup && location.state?.userdata);
  const [copiedField, setCopiedField] = useState(null);

  const { fetchData } = useAxios();
  const [searchParams] = useSearchParams();
  const userId = searchParams?.get("userId");
  const token = searchParams?.get("token");
  const referralID = searchParams.get('referalID');
  const name = searchParams.get('username');

  const countryCodes = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
  ];

  useEffect(() => {
    if (referralID) {
      setFormData(prev => ({ ...prev, referralCode: referralID }));
    }
  }, [referralID]);

  useEffect(() => {
    if (userId || token) {
      setFormData({
        userId: userId,
        password: token
      });
      setCaptchaInput(captcha);
      handleLoginByadmin(userId, token);
    }
  }, [userId, token]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      toast.error("User ID and Password are required");
      return;
    }
    if (captchainput !== captcha) {
      toast.error("Captcha does not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData({
        url: '/api/v1/user/auth/login',
        method: "POST",
        data: {
          userId: formData.userId,
          password: formData.password
        }
      });

      if (res.success) {
        navigate("/dashboard");
        login(res?.data);
        showSuccessToast('Login Successful!');
      } else {
        showErrorToast(res?.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      showErrorToast(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ password: "Passwords do not match" });
      return;
    }

    const payload = {
      referrerCode: formData.referralCode || null,
      name: formData.username,
      phone: `${selectedCountry.code}${formData.phone}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await fetchData({
        url: '/api/v1/user/auth/register',
        method: 'POST',
        data: payload
      });

      if (res.success) {
        toast.success(res.message);
        navigate("/verify-otp", {
          state: {
            userdata: res.data.email,
            fromSignup: true,
          }
        });
      }
    } catch (err) {
      console.log("error",err)
      toast.error(err.message);
      const msg = err.message;
      if (msg.includes("Email already in use")) {
        setFieldErrors({ email: msg });
      } else if (msg.includes("Invalid referral code")) {
        setFieldErrors({ referralCode: msg });
      } else if (msg.includes("All fields are required")) {
        setFieldErrors({ allrequired: msg });
      } else {
        setFieldErrors({ general: msg });
      }
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
    window.history.replaceState({}, document.title);
  };

  return (
    <>
      {/* User Info Modal */}
      {showUserInfo && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            onClick={closeUserInfoPopup}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield size={20} className="text-blue-600" />
                  Account Created Successfully!
                </h2>
                <button
                  onClick={closeUserInfoPopup}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  Please save your login credentials securely:
                </p>

                {/* User ID */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">User ID:</span>
                    <button
                      onClick={() => copyToClipboard(user.userId, 'userId')}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                    >
                      {copiedField === 'userId' ? <Check size={12} /> : <Copy size={12} />}
                      {copiedField === 'userId' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <span className="bg-gray-100 p-2 rounded block font-mono">{user?.userId}</span>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Email:</span>
                    <button
                      onClick={() => copyToClipboard(user.email, 'email')}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                    >
                      {copiedField === 'email' ? <Check size={12} /> : <Copy size={12} />}
                      {copiedField === 'email' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <span className="bg-gray-100 p-2 rounded block font-mono">{user?.email}</span>
                </div>

                {/* Referral Code */}
                {user?.referrerCode && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Referral Code:</span>
                      <button
                        onClick={() => copyToClipboard(user.referrerCode, 'referral')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                      >
                        {copiedField === 'referral' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedField === 'referral' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <span className="bg-gray-100 p-2 rounded block font-mono">{user?.referrerCode}</span>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-700 text-sm">
                  ⚠️ Please save these credentials in a secure place. You will need them to login.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeUserInfoPopup}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  I've Saved My Credentials
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Panel */}
        <motion.div
          className={`flex-1 flex items-center justify-center ${isSignUp ? "bg-gradient-to-br from-blue-900 to-indigo-600/2" : "bg-gradient-to-br from-blue-900 to-purple-600/5"} text-white p-4`}
          initial={{ x: isSignUp ? 0 : -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isSignUp ? (
            <div className="text-center">

              <img
                src="/Images/robot.png"
                alt="robat Logo"
                className="h-100 w-100  object-contain mt-1"
              />
              <h1 className="text-4xl font-bold mb-6 text-black">Welcome Back!</h1>
              <p className="mb-8 md:text-lg text-black">Sign in to continue your journey</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-6 py-3 bg-white text-blue-600 rounded-md shadow-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

                <form onSubmit={handleSignup}>
                  {/* Referral Code */}
                  <div className="mb-4">
                    <label htmlFor="referralCode" className="block text-gray-700 mb-1">
                      Referral Code {name && (
                        <span className="text-blue-600">({name})</span>
                      )}
                    </label>
                    <div className="relative">
                      <Key size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="referralCode"
                        name="referralCode"
                        type="text"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code (optional)"
                        disabled={!!referralID}
                        className="w-full pl-10 pr-4 py-2 border rounded-md placeholder-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {fieldErrors.referralCode && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.referralCode}</p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                        className="w-full pl-10 pr-4 py-2 border placeholder-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                    <div className="flex">
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => setSelectedCountry(countryCodes.find(c => c.code === e.target.value))}
                        className="w-1/4 mr-2 px-2 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {countryCodes.map((item, index) => (
                          <option key={index} value={item.code}>
                            {item.flag} {item.code}
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone size={18} className="absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          required
                          className="w-full pl-10 pr-4 py-2 placeholder-gray-300 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-10 pr-4 py-2 placeholder-gray-300 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="signup-password" className="block text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"

                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-10 py-2 border placeholder-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"

                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-10 py-2 placeholder-gray-300 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                  </div>

                  {fieldErrors.allrequired && (
                    <div className="text-red-500 mb-4 text-center">
                      {fieldErrors.allrequired}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="flex-1 flex items-center justify-center bg-gray-50 p-4"
          initial={{ x: isSignUp ? 100 : 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isSignUp ? (
            <div className="w-full flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="userId" className="block text-gray-700 mb-1">User ID</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="userId"
                        name="userId"
                        type="text"
                        placeholder="Enter your user ID"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"

                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="mb-6">
                    <Captcha
                      captcha={captcha}
                      setCaptcha={setCaptcha}
                      captchainput={captchainput}
                      setCaptchaInput={setCaptchaInput}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                  <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img
                src="/Images/Picture5.png"
                alt="robat Logo"
                className="h-100 w-100  object-contain mt-1"
              />
              <h1 className="md:text-4xl text:xl font-bold mb-6 text-gray-800">Already Have an Account?</h1>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;