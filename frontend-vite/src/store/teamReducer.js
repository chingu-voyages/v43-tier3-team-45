import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   teaamId: "",
   teamName: "",
   members: {},
   projects: {},
  };
  
export const teamReducer = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        addTeamId: (state, action) => {
            state.projectId = action.payload;
        },
        addTeamName: (state, action) => {
            state.teamName = action.payload;
        },
        addMembers: (state, action) => {
            state.members = action.payload;
        },
        addTeamProjects: (state, action) => {
            state.projects = action.payload;
        },
    },
  });
  
export const { addProjectId, addProjectName, addProjectIssues } = projectReducer.actions;
  
export const selectissue = (state) => state.issue;

export default projectReducer.reducer;
