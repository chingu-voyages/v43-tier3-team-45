import React, { useEffect, useState } from "react";
import { getAllTeams } from "../util/apiCalls";

const Home = () => {
  const [teams, setTeams] = useState();

  useEffect(() => {
    setTeams(getAllTeams());
  }, []);

  return <div>Home</div>;
};

export default Home;
