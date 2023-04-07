import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import "../App.css";
// import TeamProjects from "./TeamProjects";
import { useSelector } from "react-redux";
import TeamProjects from "./TeamProjects";

function SideNavBar() {
  const [sidebar, setSidebar] = useState(false);
  const [backlog, setBacklog] = useState([]);
  const [newStatus, setNewStatus] = useState([]);
  const [inProgress, setinProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const selectedTeamProjects = useSelector((state) => state.team.currentTeam.projects);

  console.log(selectedTeamProjects)

  const teamProjectArray = selectedTeamProjects.map((project, index) => (
    <TeamProjects
      project={project}
      index={index}
      key={index}/>
  ));

  function showSidebar() {
    setSidebar(!sidebar);
  }


  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {teamProjectArray}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideNavBar;
