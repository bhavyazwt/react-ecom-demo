import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import useAxios from "../hooks/api";

function Homepage() {
  const { data, loading, error } = useAxios("/categories");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <p className="text-3xl mb-2.5 font-bold">Categories</p>
        <div className="flex flex-wrap -m-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {categories.map((category) => (
            <Card
              key={category.id}
              id={category.id}
              content={category.name}
              name={category.name}
              imageUrl={category.image_url}
              imgHeight={260}
              imgWidth={420}
              type={"category"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Homepage;
