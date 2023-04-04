import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authReducer";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
