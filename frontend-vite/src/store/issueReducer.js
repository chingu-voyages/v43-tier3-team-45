import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    issueId: "",
    title: "",
    description: "",
    createdBy: "",
    assignees: {},
    comments: {},
    issueType: "",
    status: "",
    priority: ""
  };
  

export const issueReducer = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        addIssueId: (state, action) => {
            state.issueId = action.payload;
          },
    },
  });
  
export const {  } = issueReducer.actions;
  
export const selectissue = (state) => state.issue;

export default issueReducer.reducer;
