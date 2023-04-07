import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { PrivateRoutes } from "./util/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="register" element={<CreateProfile />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;