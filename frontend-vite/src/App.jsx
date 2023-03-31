import React, {useState, useEffect} from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Kanban from "./pages/Kanban";
import SideNavBar from "./components/SideNavBar";
import Profile from './pages/Profile';
import NavBar from "./components/NavBar";

function App() {

  return (
    <div>
      <SideNavBar/>
      <NavBar />
        <Routes>
          <Route
            path='/profile'
            element={<Profile/>}>
          </Route>
        </Routes>
        <Kanban/>

    </div>
  );
}

export default App;
