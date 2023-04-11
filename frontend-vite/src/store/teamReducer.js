import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  currentTeam: null,
  members: null,
  selectedList: [], // list containing member IDs that are selected
  filteredList: [], // list of members filtered to show those not selected
};

/**
 * returns user that has been added
 */
export const addMemberToTeam = createAsyncThunk(
  "teams/addMember",
  async (_, { getState }) => {
    const userId = getState().user.currentUser.id;
    const teamId = getState().team.currentTeam.id;
    const response = await axiosInstance.put(`/teams/${teamId}/${userId}/add`);
    return response.data;
  }
);

/**
 * returns updated list with the member removed
 */
export const removeMemberFromTeam = createAsyncThunk(
  "teams/removeMember",
  async (_, { getState }) => {
    const userId = getState().user.currentUser.id;
    const teamId = getState().team.currentTeam.id;
    const response = await axiosInstance.put(
      `/teams/${teamId}/${userId}/remove`
    );
    return response.data;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.currentTeam = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
      state.filteredList = action.payload; // can remove this once set/clearFilteredList is hooked up with open/close modal
    },
    addMemberToSelectedList: (state, action) => {
      state.selectedList.push(action.payload);
      state.filteredList = state.filteredList.filter(
        (member) => !state.selectedList.includes(member.id)
      );
    },
    clearSelectedList: (state) => {
      state.selectedList = [];
    },
    setFilteredList: (state) => {
      state.filteredList = state.currentTeam.members;
    },
    clearFilteredList: (state) => {
      state.filteredList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMemberToTeam.fulfilled, (state, action) => {
      state.currentTeam.members.push(action.payload);
      state.members = state.currentTeam.members;
    });
    builder.addCase(removeMemberFromTeam.fulfilled, (state, action) => {
      state.currentTeam.members = action.payload;
      state.members = state.currentTeam.members;
    });
  },
});

export const {
  setTeam,
  setMembers,
  addMemberToSelectedList,
  clearSelectedList,
} = teamSlice.actions;

export default teamSlice.reducer;
