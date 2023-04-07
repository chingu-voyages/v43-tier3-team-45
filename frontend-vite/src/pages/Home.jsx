import React, { useEffect, useState } from "react";
import { getAllTeams } from "../util/apiCalls";
import TeamDropdown from "../components/TeamDropdown";
import SideNavBar from "../components/SideNavBar";
// import TeamMemberDropdown from "../components/TeamMemberDropdown";

const Home = () => {
  const [teams, setTeams] = useState();

  useEffect(() => {
    getAllTeams()
      .then((res) => setTeams(res))
      .catch((err) => console.log(err))
      .finally(console.log("finally"));
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-400">
      {teams && <TeamDropdown teams={teams} />}
      <SideNavBar />
    </div>
  );
};

export default Home;
