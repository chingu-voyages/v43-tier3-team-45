import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import axiosInstance from "../util/AxiosInstance";
// import { addEmail, addPassword } from "./userReducer";

// const BASE_URL = "http://localhost:8080/api/"
// Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com/api

const initialState = {
    token: null,
}

// const formData = {
//     email: 'testuser',
//     password: 'testpassword',
//   };

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
});

export const { setToken, logoutToken } = authReducer.actions;

// export const loginUser = createAsyncThunk('auth/loginUser', async (formData, {dispatch}) => {
//   try {
//       const response = await axiosInstance.post(`/auth/login`, formData);
//       dispatch(setToken(response.data.token));
//       // dispatch() // would need action from userSlice to set user information. if this is the case why even used thunk to define async function within the slice
//   } catch (error) { 
//   }
// })

export const selectToken = (state) => state.auth;

export default authReducer.reducer;