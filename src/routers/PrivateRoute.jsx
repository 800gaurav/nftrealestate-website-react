import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // 1️⃣ अगर अभी loading चल रहा है तो कोई redirect नहीं
  if (loading) return null; // या loader दिखा सकते हो <div>Loading...</div>

  // 2️⃣ अगर user नहीं है तो login page
  if (!currentUser) return <Navigate to="/login" replace />;

  // 3️⃣ सब ठीक है
  return children;
}
