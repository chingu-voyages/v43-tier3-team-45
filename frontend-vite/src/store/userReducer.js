import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authReducer";

const initialState = {
  user: null,
};

//   use asyncthunk to fetch from backend and populate
//   then use Selector in profile etc to proevide email and id

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { setUser } = userSlice.actions;
// use dispatch to set and selector to get

export default userSlice.reducer;
