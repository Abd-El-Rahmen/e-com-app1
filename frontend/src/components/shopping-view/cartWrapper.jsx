import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCartItems,
  fetchAllItems,
  updateCart,
} from "../../store/shop/cartSlice";
import CartItemsContent from "./cartItems";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, userId, setOpenCartSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const handleDeleteItem = (productId) => {
    dispatch(deleteCartItems({ userId, productId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllItems(userId));
      }
    });
  };

  const handleCheckout = () => {
    navigate("/shop/checkout");
    setOpenCartSidebar(false);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1 || quantity >= 10) return;
    dispatch(updateCart({ userId, productId, quantity })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllItems(userId));
      }
    });
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const priceToUse = item.salePrice || item.price;
      return total + priceToUse * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllItems(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="font-bold text-2xl text-green-700">
          {calculateTotalPrice(cartItems)}.00$
        </p>
      </div>
      <button
        className="w-full mb-2 text-white py-2 rounded  transition duration-200 cursor-pointer bg-black hover:bg-gray-700 "
        onClick={() => handleCheckout()}
      >
        Checkout
      </button>
      {cartItems.map((item) => (
        <CartItemsContent
          item={item}
          handleDeleteItem={handleDeleteItem}
          handleUpdateQuantity={handleUpdateQuantity}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default CartWrapper;
