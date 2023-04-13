import React from "react";
import Avatar from "./Avatar";
import TeamDropdown from "./TeamDropdown";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutToken } from "../store/authReducer";
import { logoutUser } from "../store/userReducer";
import { resetProject } from "../store/projectReducer";
import { resetTeam } from "../store/teamReducer";

export default function NavBar({ teams }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
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
    navigate("/");
  };

  return (
    <nav className="flex items-center px-5 justify-between border-8 border-white-600 mx-auto bg-gray-700">
      {/* app name */}
      <div className="font-sans text-xl text-white font-bold">Chingu Board</div>

      {/* Team Drop Down */}
      <div>{teams && <TeamDropdown teams={teams} />}</div>

      {/* Team Avatars */}
      <div>{teamAvatars}</div>

      {/* logout */}
      <div className="ml-50 bg-white">
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>

      {/* user Avatar */}
      <div>
        <Avatar src={user.avatarUrl} alt={"user"} />
      </div>
    </nav>
  );
}
