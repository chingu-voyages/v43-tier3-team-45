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
        resetState: () => initialState,
    },
  });
  
export const { addProjectId, addProjectName, 
    addProjectIssues, resetState } = projectReducer.actions;
  
export const selectProject = (state) => state.project;

export default projectReducer.reducer;
