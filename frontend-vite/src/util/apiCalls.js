import axiosInstance from "./AxiosInstance";

/**
 * holds API calls that don't necessarily belong to a particular redux slice
 */

export const getAllTeams = async () => {
  try {
    const response = await axiosInstance.get("/teams");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeIssueStatus = async (issueId, status) => {
  try {
    const response = await axiosInstance.patch(
      `/status/${issueId}?status=${status}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
