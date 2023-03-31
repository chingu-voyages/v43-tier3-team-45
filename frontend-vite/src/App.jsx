import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import CreateIssue from './pages/CreateIssue';

function App() {

  return (
    <div className="App">
        <Login />
        <CreateIssue />
    </div>
  );
}

export default App