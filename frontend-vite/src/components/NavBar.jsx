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
      className="grid grid-cols-3 gap-none
     items-center px-5 mx-auto bg-white-100"
    >
      <div className="font-sans text-2xl text-blue-500 font-bold ml-3 w-48">
        Chingu Board
      </div>
      {/* <button
          className="cursor-pointer rounded-lg bg-indigo-300 py-2 shadow-md"
          onClick={(e) => handleCreateTeam(e)}
        >
          <span className="block text-black">Create Team</span>
        </button> */}
      <div className="flex grid-cols-5 gap-1 items-center">
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
            <div className="rounded-full w-12 h-12 text-center pt-3 text-xs border border-blue-200">{`+${hiddenAvatarsCount}more`}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-60 items-center px-6 ml-56">
        <div className="border-2 border-blue-500 rounded-none p-2 w-16">
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
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
    </nav>
  );
};

export default NavBar;
