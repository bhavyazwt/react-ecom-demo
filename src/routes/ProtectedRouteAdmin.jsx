import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRouteAdmin = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    toast.error("Login First To Access This Page!");
    return <Navigate to="/" />;
  }

  let decodedData;
  try {
    decodedData = jwtDecode(token);
  } catch (error) {
    toast.error("Invalid or expired session. Please log in again.");
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (decodedData.role !== "admin") {
      toast.error("You're not authorized to access this page!");
      navigate(-1);
    }
  }, [navigate, decodedData.role]);

  if (decodedData.role === "admin") {
    return <Outlet />;
  }

  return null; // Prevents further rendering in case of unauthorized access
};

export default ProtectedRouteAdmin;
