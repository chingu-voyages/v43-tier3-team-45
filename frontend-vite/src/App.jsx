import React from 'react'
import './App.css';
import LoginForm from './components/LoginForm';
import CreateIssue from '/src/components/CreateIssue.jsx'

function App() {

  return (
    <div>
      <CreateIssue />
      <LoginForm />
    </div>
  );
}

export default App      