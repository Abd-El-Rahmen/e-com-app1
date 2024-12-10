import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductSlice from "./admin/productSlice";
import shoppingProductSlice from "./shop/productSlice";
import shooppingCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shoppingOrderSlice from './shop/orderSlice'
import features from "./common/featuresSlice";
import adminOrderSlice from './admin/orderSlice'
import reviewSlice from "./shop/reviewSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shoppingProduct: shoppingProductSlice,
    shoppingCart: shooppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shoppingOrderSlice,
    adminOrder: adminOrderSlice,
    features: features,
    reviews: reviewSlice
  },
});

export default store;
