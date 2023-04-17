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
  let hiddenAvatarsCount;
  if (teamMembers !== null) {
    teamAvatars = teamMembers.slice(0, 4);
    hiddenAvatarsCount = teamMembers.length - teamAvatars.length;
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
    <nav
      className="grid grid-cols-5 gap-none
     items-center px-5 mx-auto bg-white-100"
    >
      <div className="flex justify-start">
        <div className="font-sans text-2xl text-blue-500 ml-2 font-bold">
          Chingu Board
        </div>
      </div>

      <div className="col-span-3">
        <div className="grid grid-cols-4 gap-1">
          <div className="flex justify-end items-center mr-3">
            <button
              className="cursor-pointer rounded-lg bg-[#16558f54] py-2 shadow-md"
              onClick={(e) => handleCreateTeam(e)}
            >
              <span className="block text-black text-sm px-2">Create Team</span>
            </button>
          </div>
          <div className="flex items-center col-span-3">
            <div>{teams && <TeamDropdown teams={teams} />}</div>
            <div className="flex p-3">
              {teamMembers &&
                teamAvatars.map((member, index) => (
                  <Avatar
                    key={index}
                    size={12}
                    src={member.avatarUrl}
                    alt="team member"
                  />
                ))}
              {hiddenAvatarsCount > 0 && (
                <div className="flex items-center justify-center rounded-full w-12 h-12 text-sm font-semibold border-2 border-blue-400 bg-indigo-200 text-gray-600">{`+ ${hiddenAvatarsCount}`}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="grid grid-cols-2 gap-2 items-center">
          <button
            className="rounded-lg bg-[#16558f54] py-2 shadow-md cursor-pointer px-2 text-sm"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
          <div>
            <button
              className="justify-self items-center"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <Avatar size={12} src={user.avatarUrl} alt={"user"} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
