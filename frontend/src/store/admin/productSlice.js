import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/addproduct",
  async (formData) => {
    const response = await axios.post(
      `${apiUrl}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);

export const fetchAllProducts = createAsyncThunk("/products/all", async () => {
  const response = await axios.get(
    `${apiUrl}/api/admin/products/all`
  );

  return response?.data;
});

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${apiUrl}/api/admin/products/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async ({ id }) => {
    const response = await axios.delete(
      `${apiUrl}/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default adminProductSlice.reducer;
