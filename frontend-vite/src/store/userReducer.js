import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

//   use asyncthunk to fetch from backend and populate
//   then use Selector in profile etc to proevide email and id

export const userSlice = createSlice({
  name: "user",
  initialState,
  setUser: (state, action) => {
    state.user = action.payload;
  },
});

export const { setUser } = userSlice.actions;
// use dispatch to set and selector to get

export default userSlice.reducer;
