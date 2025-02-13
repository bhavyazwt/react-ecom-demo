import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRouteUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    toast.error("Login Or Register To Check Cart Items");
    return <Navigate to="/login" />;
  }

  let decodedData;
  try {
    decodedData = jwtDecode(token);
  } catch (error) {
    toast.error("Invalid or expired session. Please log in again.");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (decodedData.role === "customer") {
    return <Outlet />;
  } else if (decodedData.role === "admin") {
    toast.error("Please Login From Customer Account.");
    return navigate(-1);
  }

  toast.error("You do not have permission to access this page.");
  navigate(-1);
  return null;
};

export default ProtectedRouteUser;
