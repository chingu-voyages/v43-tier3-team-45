import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import NewIssueForm from "./NewIssueForm";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBacklog,
  removeFromCompleted,
  removeFromInProgress,
  removeFromNewStatus,
  updateStatus,
} from "../store/projectReducer";

export default function Kanban() {
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

  const backlog = useSelector((state) => state.project.backlog);
  const newStatus = useSelector((state) => state.project.newStatus);
  const inProgress = useSelector((state) => state.project.inProgress);
  const completed = useSelector((state) => state.project.completed);

  const dispatch = useDispatch();

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
      dispatch(removeFromCompleted(source.index));
    } else if (source.droppableId == 3) {
      dispatch(removeFromInProgress(source.index));
    } else if (source.droppableId == 1) {
      dispatch(removeFromNewStatus(source.index));
    } else {
      dispatch(removeFromBacklog(source.index));
    }

    // ADD ITEM
    if (destination.droppableId == 4) {
      dispatch(
        updateStatus({
          draggableId: draggableId,
          status: "DONE",
          index: destination.index,
        })
      );
    } else if (destination.droppableId == 3) {
      dispatch(
        updateStatus({
          draggableId: draggableId,
          status: "IN_PROGRESS",
          index: destination.index,
        })
      );
    } else if (destination.droppableId == 1) {
      dispatch(
        updateStatus({
          draggableId: draggableId,
          status: "NEW",
          index: destination.index,
        })
      );
    } else {
      dispatch(
        updateStatus({
          draggableId: draggableId,
          status: "BACKLOG",
          index: destination.index,
        })
      );
    }
  }

  return (
    <div>
      <div className="p-6">
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
