import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Card({
  id,
  content,
  imageUrl,
  type,
  imgHeight,
  imgWidth,
  name,
  productPrice,
}) {
  function transformCloudinaryUrl(url) {
    return url?.replace(
      "/upload/",
      `/upload/c_fill,g_north_west,h_${imgHeight},w_${imgWidth},f_auto,q_auto/`
    );
  }
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link
        to={{
          pathname: `${
            type == "product" ? `/product/${id}` : `/category/${name}/${id}`
          }`,
        }}
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img
            alt={content}
            className="object-cover object-center w-full h-full block"
            src={transformCloudinaryUrl(imageUrl)}
          />
          <div className="py-4 px-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {content}
            </h2>
            {type == "product" && (
              <p className="mt-2 text-xl font-semibold text-gray-600 text-center">
                ₹{productPrice}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
