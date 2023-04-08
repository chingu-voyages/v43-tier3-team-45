import React, { useEffect, useState } from "react";
import { getAllTeams } from "../util/apiCalls";
import TeamDropdown from "../components/TeamDropdown";
import SideNavBar from "../components/SideNavBar";
import Kanban from "../components/Kanban";
// import TeamMemberDropdown from "../components/TeamMemberDropdown";
import { BsArrowLeftShort } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "../components/NavBar";

const Home = () => {
  const [teams, setTeams] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    getAllTeams()
      .then((res) => setTeams(res))
      .catch((err) => console.log(err))
      // .finally(console.log("finally"));
  }, []);

  return (
    <div>
      <div className="bg-red-600">
        <h1>TOP NAVIGATION BAR</h1>
        {teams && <TeamDropdown teams={teams} />}
      </div>

      <div className="h-screen w-screen flex">
        <div
          className={`bg-indigo-300 h-screen p-5 pt-8 ${
            sidebarOpen ? "w-72" : "w-20"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-red cursor-pointer ${
              !sidebarOpen && "rotate-180"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className="inline-flex">
            {/* <GiHamburgerMenu className="text-4xl rounded cursor-pointer block float-left mr-2" /> */}
            <h1
              className={`text-2xl origin-left font-medium duration-800 ${
                !sidebarOpen && "scale-0"
              }`}
            >
              Team Workspaces
            </h1>
          </div>
          <SideNavBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        <div className="p-7">
          <div className="text-2xl font-semibold">
            <h1>Kanban Board Goes Here</h1>
          </div>
          {/* <Kanban />  */}
        </div>
      </div>
    </div>
  );
};

export default Home;
