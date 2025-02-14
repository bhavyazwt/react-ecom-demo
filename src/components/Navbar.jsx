import React, { useEffect, useState } from "react";
import flipkartLogo from "../assets/flipkartLogo.svg";
import userAvatar from "../assets/user.png";
import shoppingCart from "../assets/shopping-cart.png";

import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";

function Navbar() {
  const { auth, user, setAuth } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const handleSignOut = () => {
    toast.success("Signout Success");
    localStorage.removeItem("token");
    setAuth(false);
    window.location.href = "/login";
  };

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <header className="text-gray-600 body-font z-10">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to={{ pathname: "/" }}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src={flipkartLogo} alt="" />
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <SearchBar />
          </nav>
          <div className="relative">
            <button
              className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              onClick={handleToggle}
            >
              <img src={userAvatar} width="20px" className="mr-2" alt="" />
              <Link
                to={{
                  ...(!auth && { pathname: "/signup" }),
                }}
              >
                {auth ? `Hi, ${user.first_name}!` : "Sign Up"}
              </Link>
            </button>
            {showOptions && (
              <div className="absolute right-0 w-40 z-40 bg-white shadow-lg">
                {auth && (
                  <>
                    {user?.role === "customer" && (
                      <>
                        <Link to={{ pathname: "/profile" }}>
                          <button className="block w-full py-1 px-3 border-0 bg-white text-gray-700 rounded hover:bg-gray-100">
                            Profile
                          </button>
                        </Link>
                        <Link to={{ pathname: "/order-history" }}>
                          <button className="block w-full py-1 px-3 border-0 bg-white text-gray-700 rounded hover:bg-gray-100">
                            Order History
                          </button>
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleSignOut}
                      className={`block w-full py-1 px-3 border-0 bg-white text-gray-700 rounded hover:bg-gray-100`}
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          {user?.role === "admin" && (
            <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 ml-2 md:mt-0">
              {/* <img src={} width="20px" className="mr-2" alt="" /> */}
              <Link
                to={{
                  pathname: "/dashboard",
                }}
              >
                Dashboard
              </Link>
            </button>
          )}
          {user?.role === "customer" && (
            <Link
              to={{
                pathname: "/cart",
              }}
            >
              <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 ml-2 md:mt-0">
                <img src={shoppingCart} width="20px" className="mr-2" alt="" />
                Cart
              </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
