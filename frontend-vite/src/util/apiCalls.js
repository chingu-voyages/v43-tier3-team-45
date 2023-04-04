import axiosInstance from "./AxiosInstance";

/**
 * holds API calls that don't necessarily belong to a particular redux slice
 */

export const getAllTeams = async () => {
  try {
    const response = await axiosInstance.get("/teams");
  } catch (error) {}
};
