import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import NewIssueForm from "./NewIssueForm";

export default function Kanban() {
  // const [backlog, setBacklog] = useState([]);
  // const [newStatus, setNewStatus] = useState([]);
  // const [inProgress, setinProgress] = useState([]);
  // const [completed, setCompleted] = useState([]);

  // // console.log(newStatus);
  // // console.log(inProgress);
  // // console.log(backlog)

  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/projects/${project.id}`)
  //     .then((r) => r.json())
  //     .then((json) => {
  //       setBacklog(json.issues.filter((issue) => issue.status == "BACKLOG"));
  //       setNewStatus(json.issues.filter((issue) => issue.status == "NEW"));
  //       setinProgress(
  //         json.issues.filter((issue) => issue.status == "IN_PROGRESS")
  //       );
  //       setCompleted(json.issues.filter((issue) => issue.status == "DONE"));
  //     });
  // }, []);

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    // console.log(draggableId);

    if (source.droppableId == destination.droppableId) return;
    // console.log(source.droppableId);

    //REMOVE FROM SOURCE ARRAY
    if (source.droppableId == 4) {
      setCompleted(removeItemById(draggableId, completed));
    } else if (source.droppableId == 3) {
      setinProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId == 1) {
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
      fetch(
        `http://localhost:8080/api/issues/status/${draggableId}?status=DONE`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() =>
        setCompleted([...completed, { ...task, status: "DONE" }])
      );
    } else if (destination.droppableId == 3) {
      fetch(
        `http://localhost:8080/api/issues/status/${draggableId}?status=IN_PROGRESS`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() =>
        setinProgress([...inProgress, { ...task, status: "IN_PROGRESS" }])
      );
    } else if (destination.droppableId == 1) {
      fetch(
        `http://localhost:8080/api/issues/status/${draggableId}?status=NEW`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() =>
        setNewStatus([...newStatus, { ...task, status: "NEW" }])
      );
    } else {
      fetch(
        `http://localhost:8080/api/issues/status/${draggableId}?status=BACKLOG`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // .then((res) => (res.json().then((data) => console.log(data)))
      .then(() =>
        setBacklog([
          ...backlog,
          { ...task, status: "BACKLOG"},
        ])
      );
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
            <Column title={"NEW"} tasks={newStatus} id={"1"} />
            <Column title={"BACKLOG"} tasks={backlog} id={"2"} />
            <Column title={"IN PROGRESS"} tasks={inProgress} id={"3"} />
            <Column title={"COMPLETED"} tasks={completed} id={"4"} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
