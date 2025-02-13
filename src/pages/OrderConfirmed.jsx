import React, { useState } from "react";
import greentick from "../assets/greentick.png";
import shoppingCart from "../assets/shopping-cart.png";
import { Link, useLocation } from "react-router-dom";
function OrderConfirmed() {
  const location = useLocation();
  const orderDetails = location.state;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center py-8 border-b border-gray-200">
        {/* <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" /> */}
        <img
          src={greentick}
          alt=""
          className="mx-auto h-16 w-16 text-green-500"
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Order Number
            </h2>
            <div className="mt-1 flex items-center space-x-2">
              <code className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                {orderDetails?.[0].order_id}
              </code>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {orderDetails.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item["Product"]?.image_url}
                  alt={item["Product"]?.name}
                  className="h-16 w-16 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item["Product"]?.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                ₹{orderDetails[0]["Order"].total_price}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link to={{ pathname: "/" }}>
            <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <img
                src={shoppingCart}
                alt="shopping-cart"
                className="mr-2"
                width={"20px"}
              />
              {/* <FaShoppingCart className="mr-2" />  */}
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Need help? Contact our support team at bhavya@zealousweb.com
        </p>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default OrderConfirmed;
