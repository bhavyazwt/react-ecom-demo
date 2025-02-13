import React, { useState, useEffect } from "react";
import { FaBox, FaTruck, FaCheck, FaTimes } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const response = await axiosInstance.get("/order");
    setOrders(response.data.data);
  }
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FaCheck className="text-green-500" />;
      case "pending":
        return <FaBox className="text-yellow-500" />;
      case "shipped":
        return <FaTruck className="text-blue-500" />;
      case "cancelled":
        return <FaTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        ORD-{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.createdAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      ₹{order.total_price}
                    </span>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-4">
                    {order["OrderItems"].map((item) => (
                      <div className="flex items-center space-x-4">
                        <img
                          src={item["Product"].image_url}
                          alt={item["Product"].name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item["Product"].name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
