import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  loading: false,
  productList: [],
  productDetails: null,
};

export const getAllProducts = createAsyncThunk(
  "/products/getallproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `${apiUrl}/api/shop/products/all?${query}`
    );

    return response.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/details",
  async ({ id }) => {
    const response = await axios.get(
      `${apiUrl}/api/shop/products/${id}`
    );

    return response.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
