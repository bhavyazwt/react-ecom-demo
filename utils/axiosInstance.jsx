import axios from "axios";
import { toast } from "react-toastify";

// Base API URL
const API_BASE_URL = "http://localhost:5050/api";

// Get stored token function (Modify as per your auth setup)
const getAuthToken = () => localStorage.getItem("token");

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Handle file uploads (set proper headers)
    if (
      config?.data?.image &&
      (config.method === "post" ||
        config.method === "put" ||
        config.method === "patch")
    ) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if successful
  async (error) => {
    const originalRequest = error.config;

    // Retry on 500 or network errors (up to 3 times)
    if (error.response?.status >= 500 && originalRequest._retryCount < 3) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      toast.error("Something Went Wrong");
      return axiosInstance(originalRequest);
    }

    // Handle Unauthorized (401) - Refresh token if needed
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Remove invalid token
      window.location.href = "/login"; // Redirect to login
    }

    if (error.response?.status === 403) {
      toast.error("You're not authorised to do this action");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
