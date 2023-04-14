import React, { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import TeamProjects from "./TeamProjects";
import { BsSearch } from "react-icons/bs";
import { createProject } from "../store/projectReducer";
import { addMemberToTeam } from "../store/teamReducer";

function SideNavBar({ sidebarOpen }) {
  const [sidebar, setSidebar] = useState(false);
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
      {!isInTeam && (
        <div
          className={`origin-left font-medium text-lg duration-400 ${
            !sidebarOpen && "scale-0"
          }`}
        >
          <button onClick={(e) => handleJoinTeam(e)}>
            <p className="text-red-500"> Join Team</p>
          </button>
        </div>
      )}
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
      {selectedTeam && (
        <button
          className={`origin-left font-medium text-lg duration-400 ${
            !sidebarOpen && "scale-0"
          }`}
          onClick={(e) => handleCreateProject(e)}
        >
          <p>Create new Project</p>
        </button>
      )}
    </>
  );
}

export default SideNavBar;
