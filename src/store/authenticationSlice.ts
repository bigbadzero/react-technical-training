import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    authToken: localStorage.getItem("authToken"),
  },
  reducers: {
    Login(state, action) {
      localStorage.setItem("isLoggedIn", "true");
      state.isLoggedIn = localStorage.getItem("isLoggedIn");
      localStorage.setItem("authToken", action.payload.authToken);
      state.authToken = action.payload.authToken;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
