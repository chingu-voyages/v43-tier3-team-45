import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   teamId: "",
   teamName: "",
   members: {},
   projects: {},
  };
  
export const teamReducer = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeamId: (state, action) => {
            state.teamId = action.payload;
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
        resetState: () => initialState,
    },
  });
  
export const { addTeamId, addTeamName, addMembers, addTeamProjects, resetState } = teamReducer.actions;
  
export const selectTeam = (state) => state.team;

export default teamReducer.reducer;
