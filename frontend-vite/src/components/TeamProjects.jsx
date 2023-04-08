import React from "react";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import { getProject } from "../store/projectReducer";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

export default function TeamProjects({ project, sidebarOpen }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getProject(project.id));
  };

  return (
    <li className="text-grey-300 text-md flex-items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
      <button onClick={() => handleClick()} className="flex items-center justify-center">
        <div className={`text-2xl block float-left ${sidebarOpen && "mr-2"}`}>
          <BsReverseLayoutTextSidebarReverse />
        </div>
        <div className="text-base font-md">{project.name}</div>
        {/* <span>{project.id}</span> */}
      </button>
    </li>
  );
}
