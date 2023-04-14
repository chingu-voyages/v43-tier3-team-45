import React, { useEffect, useState } from "react";
import { getAllTeams } from "../util/apiCalls";
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
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="h-1/6">
        <NavBar teams={teams} />
      </div>

      <div className="flex h-5/6">
        <div
          className={`bg-indigo-300 p-5 pt-8 ${
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
        <div className="p-1">
          <div className="text-2xl font-semibold w-full">
            <Kanban />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
