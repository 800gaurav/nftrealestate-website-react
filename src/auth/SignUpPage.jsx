import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import GradientButton from "../reuseis/GradientButton";
import axios from "axios";
import { SignupApi } from "../api/SignUp";
import useAxios from "../utils/useAxios";
import SingupSaveModel from "./SingupSaveModel";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Phone, Lock, Key, GitBranch } from "lucide-react";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import { colors } from "../variables/colors";
import Button from "../component/wrapper/Button";


const avatars = [
  "/Images/Img1.avif",
  "/Images/Img2.avif",
  "/Images/Img3.avif",
  "/Images/Img4.avif",
  "/Images/Img5.avif",
  "/Images/Img6.avif",
];

const SignUpPage = () => {
  const countryCodes = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
  ];

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [side, setSide] = useState("left");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [referralCodeParems, setReferralCodeParems] = useState(false);
  const [registerData, setData] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { fetchData } = useAxios()
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const referralID = searchParams.get('referalID');
  const name = searchParams.get('username');

  useEffect(() => {
    if (referralID) {
      setReferralCode(referralID);
      setReferralCodeParems(true);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFieldErrors({ password: "Passwords do not match" });
      return;
    }

    const payload = {
      referrerCode: referralCode || null,
      name: username,
      phone: `${selectedCountry.code}${phone}`,
      email,
      password,
      side,
    };

    try {
      setLoading(true)
      const res = await fetchData({
        url: '/api/v1/user/auth/register',
        method: 'POST',
        data: payload
      });

      setData(res);
      if (res.success) {
        toast.success('Registration successful!');
        navigate("/verify-otp", {
          state: {
            userdata: res.data.email,
            fromSignup: true,
          }
        });
        setLoading(false)
      }
    } catch (err) {
      toast.error(err.message);
      const msg = err.message

      if (msg.includes("Email already in use")) {
        setFieldErrors({ email: msg });
      } else if (msg.includes("Invalid referral code")) {
        setFieldErrors({ referralCode: msg });
      } else if (msg.includes("All fields are required")) {
        setFieldErrors({ allrequired: msg });
      } else {
        setFieldErrors({ general: msg });
      }
      setLoading(false)
    }
  };

  return (
    <AuthWrapper title="Create Account" subtitle="Join us and start your journey today">


      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Referral Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referral Code {name && (
              <span className="font-semibold ml-1" style={{ color: colors.theme1 }}>
                ({name})
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key size={18} className="text-gray-400" />
            </div>
            <input
              disabled={referralCodeParems}
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code (optional)"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all disabled:opacity-60"
              style={{ focusRingColor: colors.theme1 }}
            />
          </div>
          {fieldErrors.referralCode && (
            <p className="text-sm text-red-500 mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {fieldErrors.referralCode}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Placement Side <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setSide(item.value)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                  side === item.value
                    ? "border-transparent text-white shadow-md"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                }`}
                style={side === item.value ? { background: `linear-gradient(to right, ${colors.theme1}, ${colors.theme2})` } : {}}
              >
                <GitBranch size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
              style={{ focusRingColor: colors.theme1 }}
            />
          </div>
        </div>

        {/* Phone Input with Country Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <div className="relative w-1/3">
              <select
                value={selectedCountry.code}
                onChange={(e) => setSelectedCountry(countryCodes.find(c => c.code === e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 appearance-none"
                style={{ focusRingColor: colors.theme1 }}
              >
                {countryCodes.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.flag} {item.code}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
              style={{ focusRingColor: colors.theme1 }}
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
              style={{ focusRingColor: colors.theme1 }}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-sm text-red-500 mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
              style={{ focusRingColor: colors.theme1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 text-gray-900 transition-all"
              style={{ focusRingColor: colors.theme1 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-sm text-red-500 mt-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {fieldErrors.password}
            </p>
          )}
        </div>

        {fieldErrors.allrequired && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-2"></span>
              {fieldErrors.allrequired}
            </p>
          </div>
        )}



        <Button
          disabled={loading}
          title={loading ? "Creating Account..." : "Create Account"}
          type="submit"
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-medium transition-colors"
            style={{ color: colors.theme1 }}
          >
            Login
          </NavLink>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default SignUpPage;
