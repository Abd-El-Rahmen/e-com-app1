import React from "react";

const ProductTile = ({
  product,
  onDelete,
  setCurrentItemId,
  setFormData,
  setOpenCreateProductsDialog,
}) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = product;

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 w-60 m-4 transition-transform duration-200 hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="w-48 h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          Sale Price:{" "}
          <span className="text-red-600 font-bold">
            ${salePrice ? salePrice.toFixed(2) : "N/A"}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Price:{" "}
          <span className="text-black font-bold">${price.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">In Stock: {totalStock}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => {
            setCurrentItemId(product?._id);
            setOpenCreateProductsDialog(true);

            setFormData({
              image,
              title,
              description,
              category,
              brand,
              price,
              salePrice,
              totalStock,
              averageReview,
            });
          }}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(product._id);
          }}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductTile;
