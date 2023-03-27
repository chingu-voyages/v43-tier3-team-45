import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   projectId: "",
   projectName: "",
   issues: {},
  };
  
export const projectReducer = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProjectId: (state, action) => {
            state.projectId = action.payload;
          },
        addProjectName: (state, action) => {
            state.projectName = action.payload;
          },
        addProjectIssues: (state, action) => {
            state.projectIssues = action.payload;
          },
    },
  });
  
export const { addProjectId, addProjectName, addProjectIssues } = projectReducer.actions;
  
export const selectissue = (state) => state.issue;

export default projectReducer.reducer;
