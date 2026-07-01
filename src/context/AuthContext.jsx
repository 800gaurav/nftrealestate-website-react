import { createContext, useContext, useEffect, useState, useRef } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();
const cookies = new Cookies();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true); 
  const [Loading, setloading] = useState(false); 
  // ✅ initially true
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setdashboardData] = useState()
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigateRef = useRef(null);

  const setNavigateRef = (nav) => {
    navigateRef.current = nav;
  };

  // Login
  function login(data) {
    if (!data?.token) return console.error("Token is missing in login data");

    const userData = { ...data };
    delete userData.token;

    // universal-cookie handles objects automatically
    cookies.set("USER", userData, { path: "/" });
    cookies.set("TOKEN", data.token, { path: "/" });
    cookies.set("isLoggedIn", true, { path: "/" });

    setdashboardData(null);
    setCurrentUser(userData);
    setToken(data.token);
    setIsLoggedIn(true);

    if (navigateRef.current) {
      navigateRef.current("/dashboard");
    }
  }

  // Logout
  function logout() {
    cookies.remove("USER", { path: "/" });
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("isLoggedIn", { path: "/" });

    setdashboardData(null);
    setCurrentUser(null);
    setToken(null);
    setIsLoggedIn(false);

    if (navigateRef.current) {
      navigateRef.current("/login");
    }
  }

  // Load from cookies on first render
  useEffect(() => {
    const userFromCookie = cookies.get("USER"); // already object
    const tokenFromCookie = cookies.get("TOKEN");
    const isLoggedInCookie = cookies.get("isLoggedIn");

    if (userFromCookie && tokenFromCookie) {
      setCurrentUser(userFromCookie);
      setToken(tokenFromCookie);
    }

    if (isLoggedInCookie) {
      setIsLoggedIn(true);
    }

    setLoading(false); // ✅ cookies loaded
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        login,
        logout,
        setNavigateRef,
        loading,
        Loading,
        setloading,
        isLoggedIn,
        setIsLoggedIn,
        dashboardData,
        setdashboardData

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
