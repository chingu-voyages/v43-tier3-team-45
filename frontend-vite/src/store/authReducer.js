import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080/"
// Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com/api

const initialState = {
    token: null,
}

const formData = {
    email: 'testuser',
    password: 'testpassword',
  };

  export const loginUser = createAsyncThunk(
    "auth/login",
    async () => {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const res_1 = await res.json();
      return res_1; // Return the response data directly
    }
  );

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logoutToken: (state) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
        });
    },
});

export const { setToken, logoutToken } = authReducer.actions;

export const selectToken = (state) => state.auth;

export default authReducer.reducer;