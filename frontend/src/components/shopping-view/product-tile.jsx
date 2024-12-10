import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/shop/reviewSlice";
import { fetchAllItems } from "../../store/shop/cartSlice";

const added = {
  yes: { label: "Added Successfully", color: "text-green-600" },
  no: { label: "Add to Cart", color: "text-black" },
};

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  const { image, title, price, salePrice, averageReview } = product;
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addStatus, setAddStatus] = useState(
    cartItems &&
      cartItems?.length > 0 &&
      cartItems?.map((item) => item.productId).includes(product?._id)
      ? added.yes
      : added.no
  );

  useEffect(() => {
    dispatch(fetchAllItems(user?.id));
    setAddStatus(
      cartItems &&
        cartItems?.length > 0 &&
        cartItems?.map((item) => item.productId).includes(product?._id)
        ? added.yes
        : added.no
    );
  }, [user?.id, dispatch]);

  return (
    <div
      className="border relative rounded-lg  overflow-hidden cursor-pointer transition-transform ease-in-out hover:shadow-2xl "
      onClick={() => {
        dispatch(getReviews(product?._id)).then((data) => console.log(data));
        handleGetProductDetails(product?._id);
      }}
    >
      <div className="p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-80 rounded-xl object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold">
            {salePrice ? (
              <span className="line-through text-gray-500">
                ${price.toFixed(2)}
              </span>
            ) : null}
            {salePrice ? (
              <span className="text-red-600">${salePrice.toFixed(2)}</span>
            ) : (
              <span>${price.toFixed(2)}</span>
            )}
          </span>
        </div>
        <div className="mt-2">
          <span className="text-yellow-500">
            {Array.from({ length: Math.round(averageReview) }).map(
              (_, index) => (
                <span key={index}>★</span>
              )
            )}
            {Array.from({ length: 5 - Math.round(averageReview) }).map(
              (_, index) => (
                <span key={index}>☆</span>
              )
            )}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            {averageReview} / 5
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAddStatus(added.yes);

            handleAddToCart(product._id);
          }}
          className={`absolute underline bottom-3 right-3 font-semibold ${addStatus.color}`}
        >
          {addStatus.label}
        </button>
      </div>
    </div>
  );
};

export default ShoppingProductTile;
