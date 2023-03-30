import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import NewIssueForm from "../components/NewIssueForm";

export default function Kanban({task}) {
  const [backlog, setBacklog] = useState([]);
  const [newStatus, setNewStatus] = useState([]);
  const [inProgress, setinProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [allIssues, setAllIssues] = useState([])


  useEffect(() => {
    fetch("http://localhost:8080/api/projects/641ba8e494ba927d1a1e932d")
      .then((r) => r.json())
      .then((json) => {
        setAllIssues(json.issues)
        setBacklog(json.issues.filter((issue) => issue.status == "BACKLOG"));
        setNewStatus(json.issues.filter((issue) => issue.status == "NEW"));
        setinProgress(json.issues.filter((issue) => issue.status == "IN_PROGRESS"));
        setCompleted(json.issues.filter((issue) => issue.status == "DONE"));
      });
  }, []);

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    console.log(draggableId)

    if (source.droppableId == destination.droppableId) return;
    console.log(source.droppableId)

    //REMOVE FROM SOURCE ARRAY
    if (source.droppableId == 4) {
      setCompleted(removeItemById(draggableId, completed));
    } else if (source.droppableId == 3) {
      setinProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId == 2) {
      setNewStatus(removeItemById(draggableId, newStatus));
    } else {
      setBacklog(removeItemById(draggableId, backlog));
    }

    // GET ITEM
    const task = findItemById(draggableId, [
      ...newStatus,
      ...completed,
      ...backlog,
      ...inProgress,
    ]);

    // ADD ITEM
    if (destination.droppableId == 4) {

      const issueId = allIssues.filter((issue) => issue.id == draggableId)

      const taskData = {
        status: "COMPLETED",
        ...issueId
      }

      fetch(`http://localhost:8080/api/issues/${draggableId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData)
      })
      .then(() =>
      setCompleted([...completed, { ...task, completed: !task.completed }]));

    } else if (destination.droppableId == 3) {
      setinProgress([...inProgress, { ...task, completed: !task.completed }]);
    } else if (destination.droppableId == 2) {
      setNewStatus([...newStatus, { ...task, completed: !task.completed }]);
    } else {
      setBacklog([...backlog, { ...task, completed: !task.completed }]);
    }
  }

  return (
    <div>
      <div class="p-6">
        <NewIssueForm />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div class="flex">
          <div class="grid grid-cols-4 gap-8">
            <Column title={"BACKLOG"} tasks={backlog} id={"1"} />
            <Column title={"TO DO"} tasks={newStatus} id={"2"} />
            <Column title={"IN PROGRESS"} tasks={inProgress} id={"3"} />
            <Column title={"COMPLETED"} tasks={completed} id={"4"} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
