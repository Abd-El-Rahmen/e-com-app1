import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../components/shopping-view/filter";
import { sortOptions } from "../../config";
import { ArrowUpDown, Settings, X } from "lucide-react";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductDetails,
} from "../../store/shop/productSlice";
import ProductDetails from "../../components/shopping-view/productDetails";
import { addToCart, fetchAllItems } from "../../store/shop/cartSlice";

const createSearchParamsHelper = (filterParams) => {
  return Object.entries(filterParams)
    .map(([key, value]) => {
      const paramValue = Array.isArray(value) ? value.join(",") : value;
      return `${key}=${encodeURIComponent(paramValue)}`;
    })
    .join("&");
};

const ShoppingListing = () => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [filter, setFilter] = useState({});
  const productList = useSelector((state) => state.shoppingProduct.productList);
  const productDetails = useSelector(
    (state) => state.shoppingProduct.productDetails
  );
  const [openFilterList, setOpenFilterList] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const categorySearchParam = searchParams.get("category");

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
    if (productDetails) setOpenProductDetails(true);
  }, [productDetails]);

  useEffect(() => {
    if (filter && selectedSort) {
      dispatch(
        getAllProducts({ filterParams: filter, sortParams: selectedSort })
      );
    }
  }, [dispatch, filter, selectedSort]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, setSearchParams]);

  const handleFilter = (getSectionId, getCurrentOption) => {
    const copyFilter = { ...filter };
    if (!copyFilter[getSectionId]) {
      copyFilter[getSectionId] = [getCurrentOption];
    } else {
      const sectionOptions = copyFilter[getSectionId];
      const optionIndex = sectionOptions.indexOf(getCurrentOption);
      if (optionIndex === -1) {
        sectionOptions.push(getCurrentOption);
      } else {
        sectionOptions.splice(optionIndex, 1);
        if (sectionOptions.length === 0) {
          delete copyFilter[getSectionId];
        }
      }
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  };

  const handleSortChange = (sortId) => {
    setSelectedSort(sortId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedSort(sortOptions[0].id);
    const storedFilter = sessionStorage.getItem("filter");
    setFilter(storedFilter ? JSON.parse(storedFilter) : {});
  }, [categorySearchParam]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <div className="hidden md:block">
        <ProductFilter filter={filter} handleFilter={handleFilter} />
      </div>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center gap-2  justify-between">
          <h2 className="hidden md:block text-lg font-semibold">
            All Products
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="md:hidden mx-3"
              onClick={() => setOpenFilterList(true)}
            >
              <Settings />
            </button>

            {openFilterList && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20 md:hidden">
                <div className="bg-white w-2/3 relative flex flex-col md:flex-row overflow-y-auto max-h-[600px] md:max-h-full items-start rounded-lg shadow-lg justify-between z-30">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setOpenFilterList(false)}
                  >
                    <X size={30} />
                  </button>
                  <ProductFilter filter={filter} handleFilter={handleFilter} />
                </div>
              </div>
            )}

            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 m-2 bg-gray-50 rounded-lg p-2 "
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort by</span>
              </button>
              {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <li
                      key={option.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSortChange(option.id)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          { productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile
                key={product.id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      {openProductDetails && (
        <ProductDetails
          product={productDetails}
          open={openProductDetails}
          setOpen={setOpenProductDetails}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ShoppingListing;
