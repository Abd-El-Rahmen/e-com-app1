import React from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const product = useSelector((state) => state.shoppingProduct.productDetails);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mt-2 text-gray-700">{product.description}</p>
            <div className="flex items-center mt-4">
              <span className="text-xl font-semibold text-green-600">
                ${product.salePrice}
              </span>
              <span className="ml-4 text-gray-500 line-through">
                ${product.price}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">
                Total Stock: {product.totalStock}
              </span>
              <span className="ml-4 text-gray-600">
                Average Review: {product.averageReview} ⭐
              </span>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
