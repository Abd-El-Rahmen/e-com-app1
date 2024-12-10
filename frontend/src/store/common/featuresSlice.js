import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: null,
};

export const setToast = (message) => ({
  type: 'features/setToast',
  payload: message,
});

const features = createSlice({
  name: "features",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { setToast: setToastAction } = features.actions;

export default features.reducer;
