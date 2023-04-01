import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  team: null,
};

export const addMemberToTeam = createAsyncThunk(
  "teams/addMember",
  async (userId, { getState }) => {
    const teamId = getState().team.team.id;
    const response = await axiosInstance.put(`/teams/${teamId}/${userId}/add`);
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
  },
});

export const { setTeam } = teamSlice.actions;

export default teamSlice.reducer;
