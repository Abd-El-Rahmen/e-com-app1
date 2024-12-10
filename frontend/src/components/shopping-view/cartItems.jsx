import React from "react";

import { Minus, Plus, X } from "lucide-react";

const CartItemsContent = ({
  item,
  handleDeleteItem,
  handleUpdateQuantity,
  userId,
}) => {



  return (
    <div key={item.productId} className="flex items-center gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-1/5 h-16 rounded-xl"
      />
      <div className="flex flex-col gap-y-3 w-3/5">
        <p className="text-md font-bold">{item.title}</p>
        <div className="flex items-center gap-2">
          <button
            className={`text-lg px-2 rounded-full cursor-pointer ${
              item.quantity - 1 <= 0 ? "bg-gray-400" : "bg-black text-white "
            }`}
            onClick={() => {
              handleUpdateQuantity(item.productId, item.quantity - 1);
            }}
            disabled={item.quantity - 1 < 0}
          >
            <Minus className="w-4" />
          </button>
          <span className="text-md font-semibold max-w-10">
            {item.quantity}
          </span>
          <button
            className={`text-lg px-2 rounded-full cursor-pointer ${
              item.quantity + 1 >= 10 ? "bg-gray-400" : "bg-black text-white "
            }`}
            disabled={item.quantity + 1 > 10}
            onClick={() => {
              handleUpdateQuantity(item.productId, item.quantity + 1);
            }}
          >
            <Plus className="w-4 rounded-full" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 items-center">
        <button
          onClick={() => {
            handleDeleteItem(item.productId);
          }}
        >
          <X />
        </button>
        <p className="text-lg self-start font-bold text-black">
          {item.salePrice * item.quantity}$
        </p>
      </div>
    </div>
  );
};

export default CartItemsContent;
