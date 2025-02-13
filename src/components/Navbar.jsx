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
  const [showSignOut, setShowSignOut] = useState(user ? true : false);
  const [showOptions, setShowOptions] = useState(false);
  const handleSignOut = () => {
    toast.success("Signout Success");
    localStorage.removeItem("token");
    setAuth(false);
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
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
              onClick={() => setShowSignOut(!showSignOut)}
              className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
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
            {auth && showSignOut && (
              <>
                <Link to={{ pathname: "/profile" }}>
                  <button className="absolute right-0 mt-10 py-1 px-3 border-0 bg-white text-gray-700 rounded shadow-lg hover:bg-gray-100">
                    Profile
                  </button>
                </Link>
                <Link to={{ pathname: "/order-history" }}>
                  <button className="absolute right-0 mt-20 py-1 px-3 border-0 bg-white text-gray-700 rounded shadow-lg hover:bg-gray-100">
                    Order History
                  </button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="absolute right-0 mt-30 py-1 px-3 border-0 bg-white text-gray-700 rounded shadow-lg hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
          {
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
          }
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
        </div>
      </header>
    </div>
  );
}

export default Navbar;
