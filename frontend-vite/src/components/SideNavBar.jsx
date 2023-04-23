import React, { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import TeamProjects from "./TeamProjects";
import { BsSearch } from "react-icons/bs";
import { createProject } from "../store/projectReducer";
import { addMemberToTeam } from "../store/teamReducer";
import { BsPlus } from "react-icons/bs";

function SideNavBar({ sidebarOpen }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedTeam = useSelector((state) => state.team.currentTeam);
  let isInTeam = true;
  const selectedTeamProjects = useSelector((state) => {
    if (selectedTeam !== null) {
      return state.team.currentTeam.projects;
    } else {
      return null;
    }
  });
  let teamProjectArray;
  if (selectedTeam !== null) {
    teamProjectArray = selectedTeamProjects.map((project, index) => (
      <div key={index}>
        <TeamProjects
          project={project}
          index={index}
          key={index}
          sidebarOpen={sidebarOpen}
        />
      </div>
    ));
    isInTeam = selectedTeam.members.some(
      (member) => member.id == currentUser.id
    );
  }

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      name: "new project",
      issues: [],
    };
    dispatch(createProject(project));
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    dispatch(addMemberToTeam());
  };

  return (
    <>
      <div className="inline-flex">
        <h1
          className={`text-2xl origin-left font-medium duration-800 ${
            !sidebarOpen && "scale-0"
          }`}
        >
          {selectedTeam && selectedTeam.name} Workspaces
        </h1>
      </div>
      {!isInTeam && (
        <div
          className={`origin-left font-medium text-lg duration-400 ${
            !sidebarOpen && "scale-0"
          }`}
        >
          <div className="flex flex-col items-center pt-3">
            <button
              onClick={(e) => handleJoinTeam(e)}
              className="flex items-center px-2 py-1 bg-gray-700 rounded-md shadow hover:bg-gray-600"
            >
              <BsPlus className="h-6 w-6 text-white" />
              <span className="block uppercase tracking-wide text-sm font-medium text-white m-1">
                Join Team
              </span>
            </button>
          </div>
        </div>
      )}
      {/* <div
        className={`flex items-center rounded-md bg-light-white my-4 ${
          !sidebarOpen ? "px-2.5" : "px-4"
        } py-2`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            sidebarOpen && "mr-2"
          }`}
        />
        <input
          type={"search"}
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white focus:outline-none ${
            !sidebarOpen && "hidden"
          }`}
        />
      </div> */}
      <ul
        className={`origin-left font-medium text-lg duration-400 ${
          !sidebarOpen && "scale-0"
        }`}
      >
        {selectedTeamProjects && teamProjectArray}
      </ul>
      {selectedTeam && (
        <div
          className={`flex flex-col items-center pt-3 origin-left font-medium text-lg duration-400 ${
            !sidebarOpen && "scale-0"
          }`}
        >
          <button
            onClick={(e) => handleCreateProject(e)}
            className="flex items-center px-2 py-1 bg-gray-700 rounded-md shadow hover:bg-gray-600"
          >
            <BsPlus className="h-6 w-6 text-white" />
            <span className="block uppercase tracking-wide text-sm font-medium text-white m-1">
              New Project
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default SideNavBar;
