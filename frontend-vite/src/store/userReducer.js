import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    email: "",
    // fetch these from the backend values created during login/signup
    firstName: "",
    lastName: "",
    role: "",
    // above values will be filled in with event listeners in profile compoent
  };
  

//   use asyncthunk to fetch from backend and populate 
//   then use Selector in profile etc to proevide email and id

export const userSlice = createSlice({
        name: 'user',
        initialState,
        addUserId: (state, action) => {
            state.userId = action.payload
        },
        addEmail: (state, action) => {
            state.email = action.payload
        },
        addFirstName: (state, action) => {
            state.firstName = action.payload
        },
        addLastName: (state, action) => {
            state.lastName = action.payload
        },
        addRole: (state, action) => {
            state.role = action.payload
        },
});

export const { addUserId, addEmail, addFirstName, addLastName, addRole } = userSlice.actions;
// use dispatch to set and selector to get

export default userSlice.reducer;