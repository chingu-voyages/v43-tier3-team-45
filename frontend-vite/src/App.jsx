import React, {useState, useEffect} from "react";
import "./App.css";
import Kanban from "./pages/Kanban";

function App() {
  const [taskStatus, setTaskStatus] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/issues/641bad971753157698dc186a")
      .then(response => response.json())
      .then((task) => setTaskStatus(task))
  }, [])

  // console.log(taskStatus.status)

  return (
    <div>
      <Kanban
        task={taskStatus}
      />
    </div>
  );
}

export default App;
