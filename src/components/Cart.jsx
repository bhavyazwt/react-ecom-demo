import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import postData from "../hooks/postData";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);
  async function getCart() {
    const response = await axiosInstance.get("/cart");
    // console.log(response.data.data);
    setCart(response.data.data);
  }
  async function deleteProductFromCart(id) {
    const response = await axiosInstance.delete(`/cart/${id}`);
    if (response.status === 200) {
      toast.success("Product Deleted From Cart Successfully");
      getCart();
    }
  }

  async function placeOrder() {
    const response = await postData("/order");
    if (response.status === 200) {
      navigate("/order-confirmed", { state: response.data.data });
    }
  }

  async function updateQuantity(id, type) {
    const response = await postData("/cart/updateQuantity", {
      id,
      type,
    });
    if (response.status === 200) {
      getCart();
      toast.success("Quantity Updated Successfully");
    } else {
      toast.error("Error Updating Product Quantity");
    }
  }

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="sm:flex shadow-md my-10">
          <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cart?.products?.length} Items
              </h2>
            </div>
            {cart?.products?.map((product) => (
              <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <img
                    src={product["Product"].image_url}
                    alt="Black Leather Purse"
                    className="h-full object-center object-cover md:block hidden"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">
                      {product["Product"].name}
                    </p>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 py-2 px-4 focus:outline-none"
                        onClick={() => updateQuantity(product.id, "decrease")}
                      >
                        -
                      </button>
                      <p className="text-base font-black leading-none text-gray-800 mx-4">
                        {product.quantity}
                      </p>
                      <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 py-2 px-4 focus:outline-none"
                        onClick={() => updateQuantity(product.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="w-96 text-s leading-3 text-gray-600">
                    ₹{product["Product"].price}
                  </p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex itemms-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to Wishlist
                      </p>
                      <p
                        className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                        onClick={() => deleteProductFromCart(product.id)}
                      >
                        Remove
                      </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800"></p>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to={{ pathname: "/" }}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id="summary"
            className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>

            <div className="mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{cart?.total_price?.toFixed(2)}</span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
