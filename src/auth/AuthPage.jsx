import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import { useAuth } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { showErrorToast, showSuccessToast } from "../component/toaster";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { fetchData } = useAxios();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = searchParams?.get("userId");
  const token = searchParams?.get("token");

  const handleLoginByAdmin = async (adminUserId, adminToken) => {
    try {
      const res = await fetchData({
        url: "/api/v1/user/auth/login",
        method: "POST",
        data: { userId: adminUserId, usertoken: adminToken },
      });

      if (res.success) {
        login(res?.data);
        navigate("/dashboard");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (userId && token) {
      setFormData({ userId: userId || "", password: token || "" });
      handleLoginByAdmin(userId, token);
    }
  }, [userId, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.userId || !formData.password) {
      toast.error("User ID and Password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData({
        url: "/api/v1/user/auth/login",
        method: "POST",
        data: {
          userId: formData.userId,
          password: formData.password,
        },
      });

      if (res.success) {
        login(res?.data);
        navigate(location.state?.from || "/dashboard");
        showSuccessToast("Login Successful!");
      } else {
        showErrorToast(res?.message || "Login failed");
      }
    } catch (err) {
      showErrorToast(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sign In" subtitle="Access your account" showBackButton>
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="userId" className="mb-2 block text-sm font-medium text-slate-200">
            User ID
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="userId"
              name="userId"
              type="text"
              value={formData.userId}
              onChange={handleChange}
              disabled={loading}
              required
              placeholder="Enter your user ID"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pl-10 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
            Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pl-10 pr-11 text-white outline-none transition focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-cyan-300 hover:text-cyan-200">
            Forgot Password?
          </Link>
          <Link to="/signup" className="font-semibold text-white hover:text-cyan-200">
            Create Account
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default AuthPage;
