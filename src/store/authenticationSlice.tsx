import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    authToken: null,
  },
  reducers: {
    Login(state, action) {
      state.isLoggedIn = true;
      state.authToken = action.payload.authToken;
    },
  },
});

export default authenticationSlice;
