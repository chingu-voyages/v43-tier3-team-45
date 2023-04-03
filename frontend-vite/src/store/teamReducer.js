import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   teamId: "",
   teamName: "",
   members: [],
   projects: [],
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
            const newMember = action.payload;
            state.members = [...state.members, newMember];
        },
        addTeamProjects: (state, action) => {
            const newProject = action.payload;
            state.projects = [...state.items, newProject];
        },
        resetState: () => initialState,
    },
  });
  
export const { addTeamId, addTeamName, 
    addMembers, addTeamProjects, 
    resetState } = teamReducer.actions;
  
export const selectTeam = (state) => state.team;

export default teamReducer.reducer;
