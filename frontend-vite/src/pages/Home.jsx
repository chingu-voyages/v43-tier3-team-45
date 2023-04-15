import React, { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Kanban from "../components/Kanban";
import { BsArrowLeftShort } from "react-icons/bs";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../store/teamReducer";

const Home = () => {
  const teams = useSelector((state) => state.team.allTeams);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect called");
    dispatch(getAllTeams());
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="">
        <NavBar />
      </div>

      <div className="flex justify-start">
        <div
          className={`bg-indigo-300 rounded-md p-5 pt-8 mb-4 ${
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
