import React, { useState, useEffect } from 'react'
import Avatar from './Avatar'
import TeamDropdown from './TeamDropDown';
import { getAllTeams } from "../util/apiCalls";
import { useSelector } from "react-redux";

export default function NavBar({teams}) {
  const user = useSelector((state) => state.user.currentUser);
  const teamMembers = useSelector((state) => state.team.members);
  let teamAvatars;
  if(teamMembers != null){
  teamAvatars = teamMembers.map((member, index) => (
    <Avatar key={index} size={"small"} src={member.avatarUrl} alt="team member" />
  ));
  }
  console.log(teams)
  return (
    <nav className="flex justify-between 
    items-center px-5 border-8 border-white-600 mx-auto bg-blue-700">
        {/* app name */}
        <div className="font-sans text-xl text-white font-bold">
          Chingu Board
        </div>

        {/* Team Drop Down */}
        <div >
          {teams && <TeamDropdown teams={teams} />}
        </div>

        {/* Team Avatars */}
        <div>
          {teamAvatars}
        </div>
        
        {/* logout */}
        <div className="ml-50 bg-white">
          <button >
            Logout
          </button>
        </div>
        
        {/* user Avatar */}
        <div>
          <Avatar 
            size={"small"}
            src={user.avatarUrl}
            alt={"user"} />
        </div>

        
    </nav>
  )
}
