import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";

const initialState = {
  currentProject: null,
  newStatus: [],
  backlog: [],
  inProgress: [],
  completed: [],
  status: "idle", // idle | loading | sucess | failed
  dndIssue: null,
};

export const getProject = createAsyncThunk(
  "projects/get",
  async (projectId) => {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data;
  }
);

/**
 * @param payload - { draggabeId, new_status, destination_index }
 */
export const updateStatus = createAsyncThunk(
  "status/update",
  async (payload, { dispatch }) => {
    const { draggableId, status, index } = payload;
    switch (status) {
      case "NEW":
        dispatch(addToNewStatus(index));
        break;
      case "BACKLOG":
        dispatch(addToBacklog(index));
        break;
      case "IN_PROGRESS":
        dispatch(addToInProgress(index));
        break;
      case "DONE":
        dispatch(addToCompleted(index));
        break;
    }
    const response = await axiosInstance.patch(
      `/issues/status/${draggableId}?status=${status}`
    );
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
      state.dndIssue = null;
    },
    removeFromNewStatus: (state, action) => {
      state.dndIssue = state.newStatus.splice(action.payload, 1)[0];
    },
    removeFromBacklog: (state, action) => {
      state.dndIssue = state.backlog.splice(action.payload, 1)[0];
    },
    removeFromInProgress: (state, action) => {
      state.dndIssue = state.inProgress.splice(action.payload, 1)[0];
    },
    removeFromCompleted: (state, action) => {
      state.dndIssue = state.completed.splice(action.payload, 1)[0];
    },
    addToNewStatus: (state, action) => {
      state.dndIssue.status = "NEW";
      state.newStatus.splice(action.payload, 0, state.dndIssue);
    },
    addToBacklog: (state, action) => {
      state.dndIssue.status = "BACKLOG";
      state.backlog.splice(action.payload, 0, state.dndIssue);
    },
    addToInProgress: (state, action) => {
      state.dndIssue.status = "IN_PROGRESS";
      state.inProgress.splice(action.payload, 0, state.dndIssue);
    },
    addToCompleted: (state, action) => {
      state.dndIssue.status = "DONE";
      state.completed.splice(action.payload, 0, state.dndIssue);
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
  },
});

export const {
  resetProject,
  removeFromBacklog,
  removeFromNewStatus,
  removeFromInProgress,
  removeFromCompleted,
} = projectSlice.actions;

export default projectSlice.reducer;
