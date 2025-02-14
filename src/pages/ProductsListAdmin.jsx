import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function ProductsListAdmin() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState("price");
  const [sortType, setSortType] = useState("ASC");
  async function handlePageClick({ selected }) {
    const response = await axiosInstance.get(
      `/products?page=${selected + 1}&sort=${sortBy}&sortType=${sortType}`
    );
    setProducts(response.data.data.rows);
    setCount(response.data.data.count);
  }

  useEffect(() => {
    getProducts();
  }, [sortBy, sortType]);

  function handleSortChange(event) {
    const sort = event.target.value;
    const sortType = sort.split(".")[1];
    setSortBy(sort.split(".")[0]);
    setSortType(sortType);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await axiosInstance.get(
      `/products?page=1&sort=${sortBy}&sortType=${sortType}`
    );
    setProducts(response.data.data.rows);
    setCount(response.data.data.count);
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
      <div className="flex justify-end mb-5">
        <select
          className="bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="price.ASC">Price (Low to High)</option>
          <option value="price.DESC">Price (High to Low)</option>
        </select>
      </div>
      {console.log(products)}
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
    </div>
  );
}

export default ProductsListAdmin;
