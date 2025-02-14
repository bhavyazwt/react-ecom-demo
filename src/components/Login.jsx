import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import postData from "../hooks/postData";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../providers/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth, setUser } = useAuth();

  async function loginUser() {
    try {
      const response = await postData("/auth/login", { email, password });
      if (response.status === 200) {
        toast.success("User Logged In Successfully");

        // Save token to localStorage
        const token = response.data.accessToken;
        localStorage.setItem("token", token);

        // Decode token & update context state
        const decodedData = jwtDecode(token);
        setUser(decodedData);
        setAuth(
          decodedData.role === "customer" || decodedData.role === "admin"
        );

        navigate("/");
      }
    } catch (err) {
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
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="!mt-8">
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
