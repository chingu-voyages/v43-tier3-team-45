import axiosInstance from "./AxiosInstance";

/**
 * holds API calls that don't necessarily belong to a particular redux slice
 * need to handle erro properly for all
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

/**
 * can use this to retrieve issue information to display on issue modal
 * @param {String} issueId
 * @returns {IssueDTO} contains all information like comments, assignees, dates, etc
 */
export const getIssueDetail = async (issueId) => {
  try {
    const response = await axiosInstance.get(`/issues/${issueId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * can use this to make a post request when creating a new issue
 * @param {IssueDTO} issue
 * @param {String} projectId
 * @returns {IssueListDTO} containing information needed to display new issue card on the board
 */
export const createNewIssue = async (issue, projectId) => {
  try {
    const response = await axiosInstance.post(
      `/issues/create?projectId=${projectId}`,
      issue
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * can use this function when user closes out from the issue modal
 * @param {IssueDTO} issue need to send the whole object
 * @returns {IssueListDTO} containing information needed to display new issue card on the board
 */
export const updateIssueDetail = async (issue) => {
  try {
    const issueId = issue.id;
    const response = await axiosInstance.patch(`/issues/${issueId}`, issue);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {CommentDTO} comment
 * @param {String} issueId
 * @returns {CommentDTO}
 */
export const createComment = async (comment, issueId) => {
  try {
    const response = await axiosInstance.post(
      `/comments/create?issueId=${issueId}`,
      comment
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// edit comment method
// might be hard to implement editting comment since you have to take into account
// whether the logged in user is the one who wrote the comment
