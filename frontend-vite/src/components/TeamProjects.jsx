import React from "react";
import axiosInstance from "../util/AxiosInstance";

export default function TeamProjects({project}) {
    const getProject = () => {
        axiosInstance.get(`/projects/${project.id}`)
          .then((json) => {
            setBacklog(json.issues.filter((issue) => issue.status == "BACKLOG"));
            setNewStatus(json.issues.filter((issue) => issue.status == "NEW"));
            setinProgress(
              json.issues.filter((issue) => issue.status == "IN_PROGRESS")
            );
            setCompleted(json.issues.filter((issue) => issue.status == "DONE"));
          });
    }


  return (
        <li>
          <button onClick={(e) => getProject()}>
            <span>{project.name}</span>
            <br></br>
            <span>{project.id}</span>
          </button>
        </li>
      );
}
