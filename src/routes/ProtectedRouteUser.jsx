import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRouteUser = () => {
  const token = localStorage.getItem("token");

  // Handle no token case
  if (!token) {
    toast.error("Login Or Register To Check Cart Items");
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

  // Handle different user roles
  switch (decodedData.role) {
    case "customer":
      return <Outlet />;
    case "admin":
      toast.error("Please Login From Customer Account.");
      return <Navigate to="/" replace />;
    default:
      toast.error("You do not have permission to access this page.");
      return <Navigate to="/" replace />;
  }
};

export default ProtectedRouteUser;
