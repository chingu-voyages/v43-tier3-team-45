import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { PrivateRoutes } from "./util/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
