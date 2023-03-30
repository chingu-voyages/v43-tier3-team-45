import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";
import { setUser } from "./userReducer";

const initialState = {
  token: null,
  status: "idle",
  error: null,
};

/**
 * thunk to make an async call to authenticate user credentials with backend server and store token and user information it receives back
 * @param creds - { email, password }
 */
export const loginUser = createAsyncThunk("auth/loginUser", async (creds) => {
  const response = await axiosInstance.post(`/auth/login`, creds);
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
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
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      // not too sure about these two lines
      state.token = action.payload.token;
      setUser(action.payload.user);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
  },
});

export const { setToken, logoutToken } = authReducer.actions;

export default authSlice.reducer;
