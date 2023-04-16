import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoutes } from "./util/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import NavBar from "./components/NavBar";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<CreateProfile />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/update" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
