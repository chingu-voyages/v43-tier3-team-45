import React from "react";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import { getProject } from "../store/projectReducer";

export default function TeamProjects({ project }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getProject(project.id));
  };

  return (
    <li>
      <button onClick={() => handleClick()}>
        <span>{project.name}</span>
        <br></br>
        <span>{project.id}</span>
      </button>
    </li>
  );
}
