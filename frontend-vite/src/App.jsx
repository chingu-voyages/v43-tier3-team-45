import React, {useState, useEffect} from "react";
import "./App.css";
import Kanban from "./pages/Kanban";

function App() {
  const [taskStatus, setTaskStatus] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/issues")
  })

  return (
    <div>
      <Kanban />
    </div>
  );
}

export default App;
