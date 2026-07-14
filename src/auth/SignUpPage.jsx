import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, Lock, Key, GitBranch, ArrowLeft, Shield, Zap, Building2 } from "lucide-react";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import Button from "../component/wrapper/Button";

const countryCodes = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
];

const InputField = ({ label, required, icon: Icon, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
      {label} {required && <span className="text-yellow-400">*</span>}
    </label>
    <div className="relative">{children}</div>
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-yellow-500/60 focus:bg-slate-900 transition-all";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [side, setSide] = useState("left");
  const [placementParentId, setPlacementParentId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referralLocked, setReferralLocked] = useState(false);
  const [sideLocked, setSideLocked] = useState(false);
  const [referralUserName, setReferralUserName] = useState("");
  const [placementUserName, setPlacementUserName] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const [searchParams] = useSearchParams();
  const referralID = searchParams.get('referalID');
  const name = searchParams.get('username');
  const linkSide = searchParams.get('side');
  const linkPlacementParentId = searchParams.get('placementParentId');

  useEffect(() => {
    if (referralID) {
      setReferralCode(referralID);
      setReferralLocked(true);
    }
    if (linkSide === "right" || linkSide === "left") {
      setSide(linkSide);
      setSideLocked(true);
    }
    if (linkPlacementParentId) {
      setPlacementParentId(linkPlacementParentId);
    }
  }, [referralID, linkSide, linkPlacementParentId]);

  useEffect(() => {
    const trimmedReferral = referralCode.trim();

    if (referralLocked && (name || referralUserName)) {
      setReferralUserName(name || referralUserName);
      return;
    }

    if (!trimmedReferral) {
      setReferralUserName("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetchData({
          url: '/api/v1/user/auth/resolve-user-reference',
          method: 'POST',
          data: { referralCode: trimmedReferral },
        });

        setReferralUserName(res?.data?.referral?.name || "");
      } catch {
        setReferralUserName("");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [referralCode, referralLocked, name, referralUserName, fetchData]);

  useEffect(() => {
    const trimmedPlacementId = placementParentId.trim();

    if (!trimmedPlacementId) {
      setPlacementUserName("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetchData({
          url: '/api/v1/user/auth/resolve-user-reference',
          method: 'POST',
          data: { placementParentId: trimmedPlacementId },
        });

        setPlacementUserName(res?.data?.placement?.name || "");
      } catch {
        setPlacementUserName("");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [placementParentId, fetchData]);

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
      placementParentId: placementParentId.trim() || null,
    };
    try {
      setLoading(true);
      const res = await fetchData({ url: '/api/v1/user/auth/register', method: 'POST', data: payload });
      if (res.success) {
        toast.success('Otp sent successfully on email!');
        navigate("/verify-otp", { state: { userdata: res.data.email, fromSignup: true } });
      }
    } catch (err) {
      toast.error(err.message);
      const msg = err.message;
      if (msg.includes("Email already in use")) setFieldErrors({ email: msg });
      else if (msg.includes("Invalid referral code")) setFieldErrors({ referralCode: msg });
      else if (msg.toLowerCase().includes("placement")) setFieldErrors({ placementParentId: msg });
      else if (msg.includes("All fields are required")) setFieldErrors({ allrequired: msg });
      else setFieldErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">
      {/* Dark overlay for readability over video */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 w-full max-w-lg">
       

        {/* Card */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">

          {/* Card Header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg">
                <Building2 size={18} className="text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Create Account</h1>
                <p className="text-xs text-slate-400">Join NFT RealEstate and start earning</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">

            {/* Referral Code */}
            <InputField label="Referral Code" error={fieldErrors.referralCode}>
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                disabled={referralLocked}
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder={name ? `Referred by: ${name}` : "Enter referral code"}
                className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {(referralLocked && (name || referralUserName)) ? (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-0.5 rounded-full">
                  {referralUserName || name}
                </span>
              ) : null}
              {!referralLocked && referralUserName && (
                <p className="text-[11px] text-emerald-400 mt-2">Referral user: {referralUserName}</p>
              )}
            </InputField>

            {/* Placement ID */}
            <InputField label="Placement ID (Optional)" error={fieldErrors.placementParentId}>
              <GitBranch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                disabled={Boolean(linkPlacementParentId)}
                type="text"
                value={placementParentId}
                onChange={(e) => setPlacementParentId(e.target.value)}
                placeholder="Optional placement user ID"
                className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {linkPlacementParentId && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-300 font-semibold bg-cyan-400/10 px-2 py-0.5 rounded-full">
                  Tree Slot
                </span>
              )}
              {placementUserName && (
                <p className="text-[11px] text-cyan-300 mt-2">Placement user: {placementUserName}</p>
              )}
            </InputField>

            {/* Placement Side */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Placement Side <span className="text-yellow-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={sideLocked}
                  onClick={() => setSide("left")}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    side === "left"
                      ? "bg-yellow-500/15 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/5"
                      : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-900"
                  } ${sideLocked ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <GitBranch size={14} />
                  Left
                </button>
                <button
                  type="button"
                  disabled={sideLocked}
                  onClick={() => setSide("right")}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    side === "right"
                      ? "bg-yellow-500/15 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/5"
                      : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-900"
                  } ${sideLocked ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <GitBranch size={14} />
                  Right
                </button>
              </div>
              {placementParentId && (
                <p className="text-[11px] text-cyan-300 mt-2">
                  New user will be placed under this Placement ID on selected side.
                </p>
              )}
            </div>

            {/* Username */}
            <InputField label="Username" required>
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                className={inputClass}
              />
            </InputField>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Phone Number <span className="text-yellow-400">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative w-28 flex-shrink-0">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => setSelectedCountry(countryCodes.find(c => c.code === e.target.value))}
                    className="w-full pl-8 pr-2 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-yellow-500/60 transition-all appearance-none cursor-pointer"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code} className="bg-slate-900">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-yellow-500/60 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <InputField label="Email" required error={fieldErrors.email}>
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className={inputClass}
              />
            </InputField>

            {/* Password row - side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Password" required error={fieldErrors.password}>
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </InputField>

              <InputField label="Confirm Password" required>
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </InputField>
            </div>

            {/* General error */}
            {(fieldErrors.allrequired || fieldErrors.general) && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                  {fieldErrors.allrequired || fieldErrors.general}
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-1">
              <Button
                disabled={loading}
                loading={loading}
                title={loading ? "Creating Account..." : "Create Account"}
                type="submit"
              />
            </div>

            {/* Trust badges */}
         

            {/* Login link */}
            <p className="text-center text-sm text-slate-400 pb-2">
              Already have an account?{" "}
              <NavLink to="/login" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
                Login
              </NavLink>
            </p>
          </form>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-600 mt-4">
          © 2025 NFT RealEstate Corp. · www.nftrealestate.us
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
