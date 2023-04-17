import React from "react";
import Avatar from "./Avatar";
import TeamDropdown from "./TeamDropdown";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutToken } from "../store/authReducer";
import { logoutUser } from "../store/userReducer";
import { resetProject } from "../store/projectReducer";
import { createTeam, resetAllTeams, resetTeam } from "../store/teamReducer";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const teams = useSelector((state) => state.team.allTeams);
  const teamMembers = useSelector((state) => state.team.members);
  let teamAvatars;
  if (teamMembers !== null) {
    teamAvatars = teamMembers.map((member, index) => (
      <Avatar key={index} size={12} src={member.avatarUrl} alt="team member" />
    ));
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutToken());
    dispatch(logoutUser());
    dispatch(resetProject());
    dispatch(resetTeam());
    dispatch(resetAllTeams());
    navigate("/");
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    dispatch(createTeam());
  };

  return (
    <nav className="flex justify-evenly items-center p-3 px-5 mx-auto bg-white-100 shadow">
      <div className="font-sans text-xl text-blue-500 font-bold ml-3">
        Chingu Board
      </div>
      <div className="flex justify-between items-center mx-auto px-5">
        <button
          className="cursor-pointer rounded-lg bg-indigo-300 py-2 shadow-md"
          onClick={(e) => handleCreateTeam(e)}
        >
          <span className="block text-black">Create Team</span>
        </button>
        <div className="mr-2 justify-self-start">
          {teams && <TeamDropdown teams={teams} />}
        </div>
        <div className="flex pl-5">{teamAvatars}</div>
      </div>
      <div className="flex justify-around items-center px-6 mx-6">
        <div className=" bg-white rounded-none p-2 mr-5">
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
        <div className="flex">
          <button
            className="items-center"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Avatar size={12} src={user.avatarUrl} alt={"user"} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
