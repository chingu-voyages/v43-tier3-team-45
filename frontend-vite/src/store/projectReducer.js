import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  currentProject: null,
  newStatus: [],
  backlog: [],
  inProgress: [],
  completed: [],
  status: "idle", // idle | loading | sucess | failed
};

export const getProject = createAsyncThunk(
  "projects/get",
  async (projectId) => {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data;
  }
);

export const updateStatus = createAsyncThunk(
  "status/update",
  async (payload) => {
    const { draggableId, status } = payload;
    const response = await axiosInstance.patch(
      `/issues/status/${draggableId}?status=${status}`
    );
    console.log(response.data);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProject: (state) => {
      state.currentProject = null;
      state.newStatus = [];
      state.backlog = [];
      state.inProgress = [];
      state.completed = [];
    },
    removeFromNewStatus: (state, action) => {
      state.newStatus = state.newStatus.filter(
        (item) => item.id !== action.payload
      );
    },
    removeFromBacklog: (state, action) => {
      state.backlog = state.backlog.filter(
        (item) => item.id !== action.payload
      );
    },
    removeFromInProgress: (state, action) => {
      state.inProgress = state.inProgress.filter(
        (item) => item.id !== action.payload
      );
    },
    removeFromCompleted: (state, action) => {
      state.completed = state.completed.filter(
        (item) => item.id !== action.payload
      );
    },
  },
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
      state.status = "success";
    });
    builder.addCase(getProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      switch (action.payload.status) {
        case "NEW":
          state.newStatus.push(action.payload);
          break;
        case "BACKLOG":
          state.backlog.push(action.payload);
          break;
        case "IN_PROGRESS":
          state.inProgress.push(action.payload);
          break;
        case "DONE":
          state.completed.push(action.payload);
          break;
      }
    });
  },
});

export const {
  resetProject,
  removeFromBacklog,
  removeFromNewStatus,
  removeFromInProgress,
  removeFromCompleted,
  addToBacklog,
  addToNewStatus,
  addToInProgress,
  addToCompleted,
} = projectSlice.actions;

export default projectSlice.reducer;
