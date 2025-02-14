import React, { useState } from "react";
import { FiUsers, FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className={`min-h-screen ${"bg-gray-100"}`}>
      <div className="flex">
        {/* Main Content */}
        <div className=" flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Management Card */}
            <div
              className={`p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all ${"bg-white text-gray-800"}`}
            >
              <Link to={{ pathname: "/users" }}>
                <div className="flex justify-center  items-center">
                  <div className="flex flex-col justify-center items-center flex-wrap">
                    <FiUsers className="text-blue-500" size={24} />
                    <h2 className="text-xl font-semibold mt-4">
                      User Management
                    </h2>
                  </div>
                </div>
              </Link>
            </div>

            {/* Product Management Card */}

            <Link to={{ pathname: "/products-list" }}>
              <div
                className={`p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all ${"bg-white text-gray-800"}`}
              >
                <div className="flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center flex-wrap">
                    <FiPackage className="text-green-500" size={24} />
                    <h2 className="text-xl font-semibold mt-4">
                      Product Management
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
            {/* Order Status Card */}
            <Link to={{ pathname: "/orders" }}>
              <div
                className={`p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all ${"bg-white text-gray-800"}`}
              >
                <div className="flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center flex-wrap">
                    <FiShoppingBag className="text-purple-500" size={24} />
                    <h2 className="text-xl font-semibold mt-4">
                      Update Order Status
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
