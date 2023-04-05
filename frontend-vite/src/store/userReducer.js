import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authReducer";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  currentUser: null,
};

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedInfo, { getState }) => {
    const userId = getState().user.currentUser.id;
    const response = await axiosInstance.patch(`/users/${userId}`, updatedInfo);
    return response.date;
  }
);

/**
 * use this to update use the user's profile image
 * @param formData - FormData with key "profileImage" and the file as its value
 * @returns string url of where the image is stored
 */
export const updateUserProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (formData, { getState }) => {
    const userId = getState().user.currentUser.id;
    const response = await axiosInstance.patch(
      `/users/image/${userId}`,
      formData
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setUserFirstName: (state, action) => {
      state.currentUser.firstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.currentUser.lastName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
    });
    builder.addCase(updateUserProfileImage.fulfilled, (state, action) => {
      state.currentUser.avatarUrl = action.payload;
    });
  },
});

export const { setUser, setUserFirstName, setUserLastName } = userSlice.actions;

export default userSlice.reducer;
