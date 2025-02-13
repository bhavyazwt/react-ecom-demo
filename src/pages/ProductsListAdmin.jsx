import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

function ProductsListAdmin() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await axiosInstance.get("/products");
    setProducts(response.data.data);
  }

  return (
    <div className="bg-white dark:bg-gray-700">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
        Products List
      </h1>
      <Link to={{ pathname: "/add-new-product" }}>
        <button className="flex ml-auto mr-10 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
          Add Product
        </button>
      </Link>
      {!products.length && (
        <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
          <div className="container flex flex-col items-center">
            <div className="flex flex-col gap-6 max-w-md text-center">
              <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
                <span className="sr-only">Error</span>
              </h2>
              <p className="text-2xl md:text-3xl dark:text-gray-300">
                Sorry, No Products Found.
              </p>
              <Link
                to={{ pathname: "/" }}
                className="px-8 py-4 text-xl font-semibold rounded bg-purple-600
              text-gray-50 hover:text-gray-200"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      )}
      <div className="grid gap-5 p-5 grid-cols-2 sm:grid-cols-2 lg:gap-r lg:grid-cols-3">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image_url}
              description={product.description}
              price={product.price}
              stock={product.stock}
              updateProducts={getProducts}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductsListAdmin;
