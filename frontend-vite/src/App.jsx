import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {

  return (
    <div>
      <h1>Sign In</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App
