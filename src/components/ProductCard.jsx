import React from "react";
import redCross from "../assets/cross.png";
import updateLogo from "../assets/update.png";
// import sample from "../assets/sample.png";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({
  id,
  image,
  name,
  description,
  price,
  stock,
  updateProducts,
}) {
  async function deleteProduct() {
    const response = await axiosInstance.delete(`/products/${id}`);
    if (response.status === 200) {
      toast.success("Product Deleted Successfully");
      updateProducts();
    }
  }

  return (
    <>
      {/* {console.log(name)} */}
      <div className="relative shadow-lg rounded-lg p-4">
        <span className="absolute top-0 left-0 mt-4 ml-4">
          <Link to={{ pathname: `/update-product/${id}` }}>
            <img className="w-5 h-5" src={updateLogo} />
          </Link>
        </span>
        <span className="absolute top-12 left-0 ml-4"></span>
        <span className="absolute top-0 right-0 mt-5 mr-4">
          <span className=" text-xs font-medium py-1 rounded">
            <img
              src={redCross}
              alt="red cross"
              width={"20px"}
              onClick={deleteProduct}
            />
          </span>
        </span>
        <img
          src={image}
          alt={name}
          width={"500px"}
          className="px-10 pt-10 pb-5"
        />
        <div className="flex-grow mb-5 text-center">
          <Link to={{ pathname: `/product/${id}` }}>
            <h5 className="text-md sm:text-lg leading-5 sm:leading-6 font-medium text-stone-900">
              {name}
            </h5>
            <h6 className="mt-2">{description}</h6>
            <h6 className="text-md mt-2">{"Stock: " + stock + " units"}</h6>
          </Link>
        </div>
        <div className="flex justify-center ">
          <span className="text-2xl font-bold text-stone-900">₹{price}</span>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
