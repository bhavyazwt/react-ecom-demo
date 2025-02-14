import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import postData from "../hooks/postData";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../providers/AuthProvider";
import { useSpin } from "../providers/SpinnerProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { setLoading } = useSpin();
  const navigate = useNavigate();
  const { setAuth, setUser } = useAuth();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  async function loginUser() {
    try {
      let emailError = "";
      if (!email) {
        emailError = "Email is required";
      } else if (!validateEmail(email)) {
        emailError = "Invalid email format";
      }

      if (!email || !password) {
        setErrors({
          email: emailError,
          password: !password ? "Password is required" : "",
        });
        return;
      }
      setLoading(true);
      const response = await postData("/auth/login", { email, password });
      if (response.status === 200) {
        toast.success("User Logged In Successfully");
        setLoading(false);
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        const decodedData = jwtDecode(token);
        setUser(decodedData);
        setAuth(
          decodedData.role === "customer" || decodedData.role === "admin"
        );
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message || "Login failed");
    }
  }

  return (
    <div>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center ">
          <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Sign in
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="text"
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter password"
                    onChange={handleInputChange(setPassword)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="!mt-8">
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                    onClick={loginUser}
                  >
                    Sign in
                  </button>
                </div>

                <p className="text-gray-800 text-sm !mt-8 text-center">
                  Don't have an account? <Link to="/signup">Register here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
