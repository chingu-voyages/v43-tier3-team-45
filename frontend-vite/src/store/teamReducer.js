import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  team: null,
};

/**
 * returns user that has been added
 */
export const addMemberToTeam = createAsyncThunk(
  "teams/addMember",
  async (userId, { getState }) => {
    const teamId = getState().team.team.id;
    const response = await axiosInstance.put(`/teams/${teamId}/${userId}/add`);
    return response.data;
  }
);

/**
 * returns updated list with the member removed
 */
export const removeMemberFromTeam = createAsyncThunk(
  "teams/removeMember",
  async (userId, { getState }) => {
    const teamId = getState().team.team.id;
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
      state.team = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMemberToTeam.fulfilled, (state, action) => {
      state.team.members.push(action.payload);
    });
    builder.addCase(removeMemberFromTeam.fulfilled, (state, action) => {
      state.team.members = action.payload;
    });
  },
});

export const { setTeam } = teamSlice.actions;

export default teamSlice.reducer;
