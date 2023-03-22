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