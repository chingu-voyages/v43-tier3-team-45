import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from "./userReducer";

const BASE_URL = "http://localhost:8080"

const initialState = {
    token: null,
}

const formData = {
    username: 'testuser',
    password: 'testpassword'
  };

export const loginUser = createAsyncThunk(
    "/api/auth/login", async () => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
        const res_1 = await res.json();
        console.log("res", res_1)
        return setToken(res_1);
    }
  )


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logoutToken: (state) => {
            state.token = null;
        },
    }
});

export const { setToken, logoutToken, logIn } = authSlice.actions;

export const selectToken = (state) => state.auth;

export default authSlice.reducer;