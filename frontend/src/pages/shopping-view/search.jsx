import React, { useEffect, useState } from "react";
import ShoppingListing from "./listing";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { getProductDetails } from "../../store/shop/productSlice";
import { addToCart, fetchAllItems } from "../../store/shop/cartSlice";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const productList = useSelector((state) => state.shoppingProduct.productList);

  const fetchSearchResults = (query) => {
    setSearchResults(productList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails({ id }));
  };

  const handleAddToCart = (currentProductId) => {
    dispatch(
      addToCart({
        userId: currentUser.id,
        productId: currentProductId,
        quantity: 1,
      })
    );
    dispatch(fetchAllItems(currentUser.id));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [location.search, productList]);
  return (
    <div className="p-5">
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults?.map((product) => (
            <ShoppingProductTile
              key={product.id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h2 className="font-bold text-3xl text-center translate-y-3 ">
            There is no product cold '{searchQuery}'
          </h2>
        </div>
      )}
    </div>
  );
};

export default Search;
