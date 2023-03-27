import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
  };
  
// export const postUserProfile = createAsyncThunk(
//     "auth/login/",
//     async () => {
//       const res = await axios.post(BASE_URL, axiosInstance, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       return res.data;
//     }
// );

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
      resetState: () => initialState,
    },
  });
  
export const { addUserId, addEmail, 
    addFirstName, addLastName, 
    addRole, addPassword, 
    resetState } = userReducer.actions;
  
export const selectUser = (state) => state.user;

// use dispatch to set and selector to get

export default userReducer.reducer;
