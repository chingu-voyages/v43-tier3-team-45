import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com"

const initialState = {
    token: null,
}

export const loginUser = createAsyncThunk(
    "/api/auth/login", async () => {
        const res = await fetch(url);
        const res_1 = await res.json();
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

export const selectToken = (state) => state.auth;

export const { setToken, logoutToken, logIn } = authSlice.actions;

export default authSlice.reducer;