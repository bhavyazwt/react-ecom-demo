import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import axiosInstance from "../../utils/axiosInstance";
import ReactPaginate from "react-paginate";

function Products() {
  const { name, id } = useParams();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("ASC");

  async function handlePageClick({ selected }) {
    const response = await axiosInstance.get(
      `/products/categories/${id}?page=${
        selected + 1
      }&sort=${sortBy}&sortType=${sortType}`
    );
    setProducts(response.data.rows);
    setCount(response.data.count);
  }

  useEffect(() => {
    getProductsFromCategoryID();
  }, [sortBy, sortType]);

  async function getProductsFromCategoryID() {
    const response = await axiosInstance.get(
      `/products/categories/${id}?sort=${sortBy}&sortType=${sortType}`
    );
    setProducts(response.data.rows);
    setCount(response.data.count);
  }

  function handleSortChange(event) {
    const sort = event.target.value;
    const sortType = sort.split(".")[1];
    setSortBy(sort.split(".")[0]);
    setSortType(sortType);
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-5">
            {name}
          </h1>
          <div className="flex justify-end mb-5">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              onChange={handleSortChange}
            >
              <option value="">Sort By</option>
              <option value="price.asc">Price (Low to High)</option>
              <option value="price.desc">Price (High to Low)</option>
              <option value="name.asc">Name (A-Z)</option>
              <option value="name.desc">Name (Z-A)</option>
            </select>
          </div>
          <div className="flex flex-wrap -m-4">
            {products.length ? (
              products.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  content={product.name}
                  imageUrl={product.image_url}
                  imgHeight={260}
                  imgWidth={420}
                  type={"product"}
                  productPrice={product.price}
                />
              ))
            ) : (
              <h1>No Products Found</h1>
            )}
          </div>
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
      </section>
    </div>
  );
}

export default Products;
