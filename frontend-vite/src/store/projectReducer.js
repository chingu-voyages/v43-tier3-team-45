import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  currentProject: null,
  backlog: [],
  newStatus: [],
  inProgress: [],
  completed: [],
};

export const getProject = createAsyncThunk(
  "projects/get",
  async (projectId) => {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.currentProject = action.payload;
      state.backlog = action.payload.issues.filter(
        (issue) => issue.status == "BACKLOG"
      );
      state.newStatus = action.payload.issues.filter(
        (issue) => issue.status == "NEW"
      );
      state.inProgress = action.payload.issues.filter(
        (issue) => issue.status == "IN_PROGRESS"
      );
      state.completed = action.payload.issues.filter(
        (issue) => issue.status == "DONE"
      );
    });
  },
});

export default projectSlice.reducer;
