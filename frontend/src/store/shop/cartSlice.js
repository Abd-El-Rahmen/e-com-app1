import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const fetchAllItems = createAsyncThunk(
  "/cart/allItems",
  async (userId) => {
    const response = await axios.get(
      `${apiUrl}/api/shop/cart/all/${userId}`
    );
    return response?.data?.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${apiUrl}/api/shop/cart/add`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${apiUrl}/api/shop/cart/update`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const deleteCartItems = createAsyncThunk(
  "/cart/deleteCartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${apiUrl}/api/shop/cart/delete/${userId}/${productId}`
    );
    return response.data;
  }
);

const shooppingCartSlice = createSlice({
  name: "shooppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items;
      })
      .addCase(fetchAllItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shooppingCartSlice.reducer;
