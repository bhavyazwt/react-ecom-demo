import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Handle no token case immediately
  if (!token) {
    toast.error("Login First To Access This Page!");
    return <Navigate to="/login" replace />;
  }

  // Decode and validate token
  let decodedData;
  try {
    decodedData = jwtDecode(token);
  } catch (error) {
    toast.error("Invalid or expired session. Please log in again.");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Handle non-admin users
  if (decodedData.role !== "admin") {
    toast.error("You're not authorized to access this page!");
    return <Navigate to="/" replace />;
  }

  // Only render outlet for admin users
  return <Outlet />;
};

export default ProtectedRouteAdmin;
