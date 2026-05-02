import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
    const {isLoggedIn}= useAuth()
    console.log({isLoggedIn})
    return (!isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />
    );
}
