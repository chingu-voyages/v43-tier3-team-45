import React, {useEffect} from "react";
import SideNavBar from "../components/SideNavBar";
import Kanban from "../components/Kanban";
import NavBar from "../components/NavBar";

function Home() {

    // fetch ALL TEAMS
    useEffect(() => {
        fetch("http://localhost:8080/api/teams")
            .then((res) => res.json())
            .then(teams => console.log(teams))
    })

  return (
    <div>
      {/* <Kanban />
      <SideNavBar />
      <NavBar /> */}
    </div>
  );
}
export default Home;
