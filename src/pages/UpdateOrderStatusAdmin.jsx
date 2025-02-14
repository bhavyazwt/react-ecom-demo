import React, { useState, useEffect } from "react";
import { FaBox, FaTruck, FaCheck, FaTimes } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useSpin } from "../providers/SpinnerProvider";
const UpdateOrderStatusAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const { setLoading } = useSpin();
  useEffect(() => {
    fetchOrders();
  }, []);

  async function handlePageClick({ selected }) {
    setLoading(true);
    const response = await axiosInstance.get(
      `/order/order/allOrders?page=${selected + 1}`
    );
    setLoading(false);
    setOrders(response.data.data.rows);
    setCount(response.data.data.count);
  }
  async function fetchOrders() {
    setLoading(true);
    const response = await axiosInstance.get("/order/order/allOrders");
    setLoading(false);
    setOrders(response.data.data.rows);
    setCount(response.data.data.count);
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
      case "canceled":
        return <FaTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axiosInstance.put(`/order/${orderId}/status`, {
        status,
      });
      if (response.status === 200) {
        toast.success("Order Status Updated Successfully");
        fetchOrders();
      }
    } catch (error) {
      toast.error("Error Updating Status");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Orders</h1>

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
                    <span className="text-lg font-medium text-gray-900">
                      ₹{order.total_price}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Cancelled</option>
                    </select>
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
          {orders.length !== 0 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(count / 10)}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              className="flex justify-center gap-2 text-gray-500"
            >
              <span className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">
                Previous
              </span>
              <span className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">
                Next
              </span>
            </ReactPaginate>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderStatusAdmin;
