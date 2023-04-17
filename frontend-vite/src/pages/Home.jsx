import React, { useEffect, useState } from "react";
import { getAllTeams } from "../util/apiCalls";
import SideNavBar from "../components/SideNavBar";
import Kanban from "../components/Kanban";
import { BsArrowLeftShort } from "react-icons/bs";
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
      <div className="">
        <NavBar teams={teams} />
      </div>

      <div className="flex justify-start">
        <div
          className={`bg-[#16558f54] rounded-md p-5 pt-8 mb-4 ${
            sidebarOpen ? "w-72" : "w-20"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-2 border border-red cursor-pointer ${
              !sidebarOpen && "rotate-180"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
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
