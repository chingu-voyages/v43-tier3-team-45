import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
