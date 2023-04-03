import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    issueId: "",
    title: "",
    description: "",
    createdBy: "",
    assignees: [],
    comments: [],
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
        addTitle: (state, action) => {
            state.title = action.payload;
        },
        addDescription: (state, action) => {
            state.description = action.payload;
        },
        addCreatedBy: (state, action) => {
            state.createdBy = action.payload;
        },
        addAssignees: (state, action) => {
            const newAssignee = action.payload;
            state.assignees = [...state.assignees, newAssignee];
        },
        addComments: (state, action) => {
            const newComment = action.payload;
            state.comments = [...state.comments, newComment];
        },
        addIssueType: (state, action) => {
            state.issueType = action.payload;
        },
        addStatus: (state, action) => {
            state.status = action.payload;
        },
        addPriority: (state, action) => {
            state.priority = action.payload;
        },
        resetState: () => initialState,
    },
  });
  
export const { addIssueId, addTitle, 
    addDescription, addCreatedBy, 
    addAssignees, addComments, 
    addIssueType, addStatus, 
    addPriority, resetState  } = issueReducer.actions;
  
export const selectIssue = (state) => state.issue;

export default issueReducer.reducer;
