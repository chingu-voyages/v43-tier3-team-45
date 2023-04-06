import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  token: null,
  status: "idle", // idle | loading | sucess | failed
  error: null,
};

/**
 * thunk to make an async call to authenticate user credentials with backend server and store token and user information it receives back
 * @param creds - { email, password }
 */
export const loginUser = createAsyncThunk("auth/loginUser", async (creds) => {
  const response = await axiosInstance.post("/auth/login", creds);
  return response.data;
});

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (formData) => {
    const response = await axiosInstance.post("/auth/register", formData);
    return response.data;
  }
);

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
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const { setToken, logoutToken } = authSlice.actions;

export default authSlice.reducer;
