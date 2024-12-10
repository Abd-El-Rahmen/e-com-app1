import React from "react";
import { useDispatch } from "react-redux";
import { fetchAllItems } from "../../store/shop/cartSlice";

const CheckoutItem = ({ item, handleDeleteItem, userId }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.productId} className="flex justify-between items-center border-b py-4">
      {/* Product Image */}
      <div className="w-1/4">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="w-1/2 px-4">
        <h2 className="text-lg font-medium">{item.title}</h2>
        <p className="text-gray-500">Size: {item.size || "N/A"}</p>
        <p className="text-md font-semibold">Quantity: {item.quantity}</p>
      </div>

      {/* Price and Delete Button */}
      <div className="w-1/4 flex flex-col items-end">
        <span className="text-lg font-medium">${(item.salePrice * item.quantity).toFixed(2)}</span>
        <button
          onClick={() => {
            handleDeleteItem(item.productId);
          }}
          className="text-red-500 hover:underline text-sm mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
