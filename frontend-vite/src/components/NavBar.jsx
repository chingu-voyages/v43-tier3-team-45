import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import TeamDropdown from "./TeamDropDown";
import { getAllTeams } from "../util/apiCalls";
import { useSelector } from "react-redux";
import TeamMemberDropdown from "./TeamMemberDropdown";
export default function NavBar({ teams }) {
  const user = useSelector((state) => state.user.currentUser);
  const currentTeam = useSelector((state) => state.team.currentTeam);

  // const teamMembers = useSelector((state) => state.team.members);
  // console.log(teamMembers)
  // const teamAvatars = teamMembers.map((member, index) => (
  //   <Avatar key={index} size="small" src={member.avatarUrl} alt="team member" />
  // ));

  return (
    <nav className="flex items-center px-5 justify-between border-8 border-white-600 mx-auto bg-gray-700">
      {/* app name */}
      <div className="font-sans text-xl text-white font-bold">Chingu Board</div>

      {/* Team Drop Down */}
      <div className="">{teams && <TeamDropdown teams={teams} />}</div>

      <div className="">{teams && <TeamMemberDropdown />}</div>

      {/* Team Avatars */}
      <div className="">{/* {teamAvatars} */}</div>

      {/* user Avatar */}
      <div>
        <Avatar className="" src={user.avatarUrl} alt={"user"} />
      </div>
    </nav>
  );
}
