import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSucess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { signUserStart, signUserSucess, signUserFailure } =
  authSlice.actions;
export default authSlice.reducer;
