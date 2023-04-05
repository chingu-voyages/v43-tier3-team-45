import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authReducer";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setUserFirstName: (state, action) => {
      state.currentUser.firstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.currentUser.lastName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
    });
  },
});

export const { setUser, setUserFirstName, setUserLastName } = userSlice.actions;

export default userSlice.reducer;
