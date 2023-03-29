import React from 'react'
import './App.css';
import CreateIssue from './pages/CreateIssue';
import LoginForm from './components/LoginForm';

function App() {

  return (
    <div>
      <LoginForm />
      <CreateIssue />
    </div>
  );
}

export default App      