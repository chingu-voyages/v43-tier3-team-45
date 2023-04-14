import React, { useState } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import TeamProjects from "./TeamProjects";
import { BsSearch } from "react-icons/bs";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

function SideNavBar({ sidebarOpen }) {
  const selectedTeam = useSelector((state) => state.team.currentTeam);
  let selectedTeamProjects;
  let teamProjectArray;
  if (selectedTeam !== null) {
    selectedTeamProjects = selectedTeam.projects;
    teamProjectArray = selectedTeamProjects.map((project, index) => (
      <div>
        <TeamProjects
          project={project}
          index={index}
          key={index}
          sidebarOpen={sidebarOpen}
        />
      </div>
    ));
  }

  return (
    <>
      <div className="inline-flex">
        <h1
          className={`text-2xl origin-left font-medium duration-800 ${
            !sidebarOpen && "scale-0"
          }`}
        >
          {selectedTeam.name} Workspaces
        </h1>
      </div>
      <div
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
      </div>
      <ul
        className={`origin-left font-medium text-lg duration-400 ${
          !sidebarOpen && "scale-0"
        }`}
      >
        {selectedTeamProjects && teamProjectArray}
      </ul>
    </>
  );
}

export default SideNavBar;
