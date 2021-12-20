import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authenticationSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;