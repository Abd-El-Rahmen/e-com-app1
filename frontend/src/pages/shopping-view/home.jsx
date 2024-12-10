import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductDetails,
} from "../../store/shop/productSlice";
import { useNavigate } from "react-router-dom";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { addToCart, fetchAllItems } from "../../store/shop/cartSlice";
import ProductDetails from "../../components/shopping-view/productDetails";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Airplay },
  { id: "adidas", label: "Adidas", icon: Heater },
  { id: "puma", label: "Puma", icon: Images },
  { id: "levi", label: "Levi's", icon: Shirt },
  { id: "zara", label: "Zara", icon: ShoppingBasket },
  { id: "h&m", label: "H&M", icon: WashingMachine },
];

const ShooppingViewHome = () => {
  
  const featureImageList = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProduct
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openProductDetails, setOpenProductDetails] = useState(false);
  useEffect(() => {
    if (productDetails) setOpenProductDetails(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      getAllProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  const handleAddToCart = (currentProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: currentProductId,
        quantity: 1,
      })
    );
    dispatch(fetchAllItems(user?.id));
  };

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails({ id }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[250px]  md:h-[400px] lg:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-auto object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesWithIcon.map((categoryItem) => (
            <Card
              onClick={() =>
                handleNavigateToListingPage(categoryItem, "category")
              }
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((product) => (
                  <ShoppingProductTile
                  car
                    key={product.id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={() => handleAddToCart(product?._id)}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
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

export default ShooppingViewHome;
