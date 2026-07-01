import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import Button from "../component/wrapper/Button";
import { showErrorToast, showSuccessToast } from "../component/toaster";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchData } = useAxios();
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const userId = searchParams?.get("userId");
  const token = searchParams?.get("token");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (userId && token) {
      handleLoginByadmin(userId, token);
    }
  }, []);

  const handleLoginByadmin = async (userIdw, tokenw) => {
    try {
      const res = await fetchData({
        url: "/api/v1/user/auth/login",
        method: "POST",
        data: { userId: userIdw, usertoken: tokenw },
      });

      if (res.success) {
        login(res?.data);
        navigate("/dashboard");
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
    setLoading(true);
    try {
      const res = await fetchData({
        url: "/api/v1/user/auth/login",
        method: "POST",
        data: formData,
      });

      if (res.success) {
        login(res?.data);
        navigate("/dashboard");
        showSuccessToast("Login Successfull!");
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

  return (
    <AuthWrapper title="Welcome Back" subtitle="Sign in to your account">
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Button type="submit" disabled={loading} title="Login" loading={loading} />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-green-500 hover:underline font-medium">Register</NavLink>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default LoginPage;
