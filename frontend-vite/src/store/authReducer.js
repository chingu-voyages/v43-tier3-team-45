import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import axios from "axios"
import axiosInstance from "../util/AxiosInstance";

const BASE_URL = "http://localhost:8080/api/"
// Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com/api

const initialState = {
    token: null,
}

const formData = {
    email: 'testuser',
    password: 'testpassword',
  };

export const loginUser = createAsyncThunk(
    "auth/login/",
    async () => {
      const res = await axios.post(BASE_URL, axiosInstance, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
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