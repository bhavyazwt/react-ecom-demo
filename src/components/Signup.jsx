import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postData from "../hooks/postData";
import { toast } from "react-toastify";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return re.test(password);
  };

  useEffect(() => {
    const validateFields = () => {
      let isValid = true;

      if (firstName.trim() === "") {
        setFirstNameError("First Name is required");
        isValid = false;
      } else {
        setFirstNameError("");
      }

      if (lastName.trim() === "") {
        setLastNameError("Last Name is required");
        isValid = false;
      } else {
        setLastNameError("");
      }

      if (email.trim() === "") {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        isValid = false;
      } else {
        setEmailError("");
      }

      if (password.trim() === "") {
        setPasswordError("Password is required");
        isValid = false;
      } else if (!validatePassword(password)) {
        setPasswordError(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        );
        isValid = false;
      } else {
        setPasswordError("");
      }

      if (confirmPassword.trim() === "") {
        setConfirmPasswordError("Confirm Password is required");
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError("Password and Confirm Password do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }

      setIsValid(isValid);
    };

    if (showErrors) {
      validateFields();
    }
  }, [firstName, lastName, email, password, confirmPassword, showErrors]);

  async function registerUser() {
    setShowErrors(true);
    if (isValid) {
      try {
        const response = await postData("/auth/register", {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role: "customer",
        });
        if (response.status === 201) {
          toast.success("User Registered Successfully");
          localStorage.setItem("token", response.accessToken);
          navigate("/login");
        }
      } catch (err) {
        toast.error(err);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-2"></div>

          <form>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                    firstNameError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                {showErrors && firstNameError && (
                  <p className="text-red-500 text-xs mt-1">{firstNameError}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                    lastNameError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                {showErrors && lastNameError && (
                  <p className="text-red-500 text-xs mt-1">{lastNameError}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="text"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {showErrors && emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {showErrors && passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                {showErrors && confirmPasswordError && (
                  <p className="text-red-500 text-xs mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                onClick={() => registerUser()}
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link to={{ pathname: "/login" }}>Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
