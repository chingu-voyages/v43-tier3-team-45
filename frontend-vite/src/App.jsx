import React, {useState, useEffect} from "react";
import "./App.css";
import Kanban from "./pages/Kanban";
import { Route, Link } from 'react-router-dom';
import SideNavBar from "./components/SideNavBar";

function App() {

  return (
    <div>
      <Kanban/>
      <SideNavBar />
    </div>
  );
}

export default App;
