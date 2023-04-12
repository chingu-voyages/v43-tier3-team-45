import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import TeamDropdown from "./TeamDropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function NavBar({ teams }) {
  const user = useSelector((state) => state.user.currentUser);
  const teamMembers = useSelector((state) => state.team.members);
  let teamAvatars;
  if (teamMembers != null) {
    teamAvatars = teamMembers.map((member, index) => (
      <Avatar
        key={index}
        size={12}
        src={member.avatarUrl}
        alt={member.firstName}
      />
    ));
  }
  const navigate = useNavigate();
  return (
    <nav
      className="flex 
     items-center px-5 border-8 border-white-600 mx-auto bg-gray-100"
    >
      {/* app name */}
      <div className="font-sans text-xl text-gray font-bold ml-12 ">
        Chingu Board
      </div>

      {/* Team Drop Down */}
      <div className="ml-56 mr-12">
        {teams && <TeamDropdown teams={teams} />}
      </div>

      {/* Team Avatars */}
      <div className="mr-96">{teamAvatars}</div>

      {/* logout */}
      <div className=" bg-white rounded-none p-2 ml-96">
        <button>Logout</button>
      </div>

      {/* user Avatar */}
      <div className="ml-10">
        <button
          onClick={() => {
            navigate("/profile/update");
          }}
        >
          <Avatar size={12} src={user.avatarUrl} alt={"user"} />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
