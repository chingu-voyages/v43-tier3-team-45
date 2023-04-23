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

export const createProject = createAsyncThunk(
  "project/create",
  async (project, { getState }) => {
    const teamId = getState().team.currentTeam.id;
    const response = await axiosInstance.post(
      `/projects/create/${teamId}`,
      project
    );
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

/**
 * @param {IssueDTO} issue
 * @returns {IssueListDTO}
 */
export const createNewIssue = createAsyncThunk(
  "issue/create",
  async (issue, { getState }) => {
    const projectId = getState().project.currentProject.id;
    const response = await axiosInstance.post(
      `/issues/create?projectId=${projectId}`,
      issue
    );
    return response.data;
  }
);

/**
 * @param {string} issueId
 */
export const deleteIssue = createAsyncThunk(
  "issue/delete",
  async (issueId, { getState, dispatch }) => {
    const projectId = getState().project.currentProject.id;
    dispatch(removeIssueById(issueId));
    return axiosInstance.delete(`/issues/${issueId}?projectId=${projectId}`);
  }
);

export const updateProject = createAsyncThunk(
  "project/update",
  async (_, { getState }) => {
    const project = getState().project.currentProject;
    const response = await axiosInstance.put("/projects/update", project);
    return response.data;
  }
);

export const updateIssueDetail = createAsyncThunk(
  "issue/update",
  async (issue) => {
    const issueId = issue.id;
    const response = await axiosInstance.patch(`/issues/${issueId}`, issue);
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
    setProjectName: (state, action) => {
      state.currentProject.name = action.payload;
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
    removeIssueById: (state, action) => {
      const index = state.currentProject.issues.findIndex(
        (issue) => issue.id == action.payload
      );
      const issue = state.currentProject.issues.splice(index, 1)[0];
      switch (issue.status) {
        case "NEW":
          state.newStatus = state.newStatus.filter(
            (issue) => issue.id == action.payload
          );
          break;
        case "BACKLOG":
          state.backlog = state.backlog.filter(
            (issue) => issue.id == action.payload
          );
          break;
        case "IN_PROGRESS":
          state.inProgress = state.inProgress.filter(
            (issue) => issue.id == action.payload
          );
          break;
        case "DONE":
          state.completed = state.completed.filter(
            (issue) => issue.id == action.payload
          );
          break;
      }
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
    builder.addCase(createNewIssue.fulfilled, (state, action) => {
      state.currentProject.issues.push(action.payload);
      state.newStatus.unshift(action.payload);
    });
    builder.addCase(updateIssueDetail.fulfilled, (state, action) => {
      const issueList = {
        id: action.payload.id,
        title: action.payload.title,
        createdBy: action.payload.createdBy,
        issueType: action.payload.issueType,
        priority: action.payload.priority,
        status: action.payload.status,
      };
      const issueId = action.payload.id;
      let index;
      switch (action.payload.status) {
        case "NEW":
          index = state.newStatus.findIndex((el) => el.id == issueId);
          state.newStatus.splice(index, 1, issueList);
          break;
        case "BACKLOG":
          index = state.backlog.findIndex((el) => el.id == issueId);
          state.backlog.splice(index, 1, issueList);
          break;
        case "IN_PROGRESS":
          index = state.inProgress.findIndex((el) => el.id == issueId);
          state.inProgress.splice(index, 1, issueList);
          break;
        case "DONE":
          index = state.completed.findIndex((el) => el.id == issueId);
          state.completed.splice(index, 1, issueList);
          break;
      }
    });
  },
});

export const {
  resetProject,
  setProjectName,
  removeFromBacklog,
  removeFromNewStatus,
  removeFromInProgress,
  removeFromCompleted,
  addToNewStatus,
  addToBacklog,
  addToInProgress,
  addToCompleted,
} = projectSlice.actions;

export default projectSlice.reducer;
