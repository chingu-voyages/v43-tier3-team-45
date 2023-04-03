import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    token: null,
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
  };

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      addUserId: (state, action) => {
        state.userId = action.payload;
      },
      addEmail: (state, action) => {
        state.email = action.payload;
      },
      addFirstName: (state, action) => {
        state.firstName = action.payload;
      },
      addLastName: (state, action) => {
        state.lastName = action.payload;
      },
      addRole: (state, action) => {
        state.role = action.payload;
      },
      addPassword: (state, action) => {
        state.password = action.payload;
      },
      logoutToken: (state) => {
        state.token = null;
      },
      resetState: () => initialState,
    },
  });
  
export const { addUserId, addEmail, addFirstName, addLastName, addRole, addPassword, resetState, setToken, logoutToken } = userReducer.actions;
  
export const selectUser = (state) => state.user;
export const selectToken = (state) => state.user.token;

export default userReducer.reducer;
