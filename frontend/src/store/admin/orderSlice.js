import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const apiUrl = import.meta.env.VITE_API_URL;



const initialState = {
  isLoading: false,
  orderList: [],
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = await axios.get(
      `${apiUrl}/api/admin/order/list/`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ orderId,status }) => {
    const response = await axios.put(
      `${apiUrl}/api/admin/order/update`,
      {orderId,status}
    );
    
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});


export default adminOrderSlice.reducer;
