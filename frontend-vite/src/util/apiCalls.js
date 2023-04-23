import axiosInstance from "./AxiosInstance";

/**
 * holds API calls that don't necessarily belong to a particular redux slice
 * need to handle erro properly for all
 */

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
 * TODO: need to move this into project reducer and make it as createAsyncThunk and add a case for fulfilled
 * to update the particular issue living inside one of the status lists.
 *
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
