import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
    token: null,
}

/**
 * thunk to make an async call to authenticate user credentials with backend server and store token and user information it receives back
 * @param creds - { email, password }
 */
export const loginUser = createAsyncThunk('auth/loginUser', async (creds, {dispatch}) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, creds);
        dispatch(setToken(response.data.token));
        dispatch() // would need action from userSlice to set user information. if this is the case why even used thunk to define async function within the slice
    } catch (error) {
        
    }
})

export const authSlice = createSlice({
>>>>>>> 5d9e119b (looking at thunk async)
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