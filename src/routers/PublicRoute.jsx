// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function PublicRoute({ children }) {
//   const { currentUser, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   // Already logged-in → redirect to dashboard
//   if (currentUser) return <Navigate to="/dashboard" replace />;

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  const searchParams = new URLSearchParams(window.location.search);
  const hasAdminParams = searchParams.get("userId") && searchParams.get("token");

  if (loading) return null;

  // अगर already login है तो dashboard पर redirect (केवल तब जब एडमिन ऑटो-लॉगिन पैरामीटर न हों)
  if (currentUser && !hasAdminParams) return <Navigate to="/dashboard" replace />;

  return children;
}

