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
  const { currentUser, logloading } = useAuth();

  if (logloading) return null;

  // अगर already login है तो dashboard पर redirect
  if (currentUser) return <Navigate to="/dashboard" replace />;

  return children;
}

