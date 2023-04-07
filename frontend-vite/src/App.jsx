import React, { useState, useEffect } from "react";
import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Kanban from "./components/Kanban";
// import SideNavBar from "./components/SideNavBar";
// import Profile from "./pages/Profile";
// import NavBar from "./components/NavBar";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateIssue from "./pages/CreateIssue";

function App() {
  return (
    <div>
      <Login />
      <CreateIssue />
      {/* <Home /> */}
      {/* <SideNavBar /> */}
      {/* <NavBar /> */}
      {/* <Routes> */}
        {/* <Route path="/profile" element={<Profile />}></Route> */}
      {/* </Routes> */}
      {/* <Kanban /> */}
    </div>
  );
}

export default App;