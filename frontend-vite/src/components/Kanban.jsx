import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBacklog,
  removeFromCompleted,
  removeFromInProgress,
  removeFromNewStatus,
  updateStatus,
} from "../store/projectReducer";
import CreateIssue from "../pages/CreateIssue";
import CircularLoading from "./CircularLoading";
import { BsPlus } from "react-icons/bs";

export default function Kanban() {
  const backlog = useSelector((state) => state.project.backlog);
  const newStatus = useSelector((state) => state.project.newStatus);
  const inProgress = useSelector((state) => state.project.inProgress);
  const completed = useSelector((state) => state.project.completed);
  const project = useSelector((state) => state.project.currentProject);
  const loading = useSelector((state) => state.project.status) == "loading";

  const dispatch = useDispatch();

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

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

    // ADD AND UPDATE ITEM
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
    <div className="min-h-screen">
      {loading && <CircularLoading />}
      <div className="p-3 flex justify-between items-center shadow min-w-screen">
        <div className="text-2xl origin-left font-medium text-gray-900 leading-tight">
          {project && project.name}
        </div>
        <div>
        {project && <CreateIssue />}
          {/* <button className="flex items-center px-2 py-1 bg-gray-700 rounded-md shadow hover:bg-gray-600"> */}
            {/* <BsPlus className="h-6 w-6 text-white" />
            <span className="text-sm font-medium text-white m-1">
              {project && <CreateIssue />}
            </span> */}
          {/* </button> */}
        </div>
      </div>
      <div className="">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1">
            <div className="p-3 flex">
              <div>
                <h1 className="pl-1 text-xl origin-left text-left font-medium pb-2">
                  New
                </h1>
                <div className="flex-shrink-0 w-72 p-3 rounded-md bg-gray-100 mr-2 overflow-auto">
                  <Column title={"NEW"} tasks={newStatus} id={"1"} />
                </div>
              </div>
              <div>
                <h1 className="pl-1 text-xl origin-left text-left font-medium pb-2">
                  Backlog
                </h1>
                <div className="flex-shrink-0 w-72 p-3 rounded-md bg-gray-100 mr-2 overflow-auto">
                  <Column title={"BACKLOG"} tasks={backlog} id={"2"} />
                </div>
              </div>
              <div>
                <h1 className="pl-1 text-xl origin-left text-left font-medium pb-2">
                  In Progress
                </h1>
                <div className="flex-shrink-0 w-72 p-3 rounded-md bg-gray-100 mr-2 overflow-auto">
                  <Column title={"IN PROGRESS"} tasks={inProgress} id={"3"} />
                </div>
              </div>
              <div>
                <h1 className="pl-1 text-xl origin-left text-left font-medium pb-2">
                  Completed
                </h1>
                <div className="flex-shrink-0 w-72 p-3 rounded-md bg-gray-100 overflow-auto">
                  <Column title={"COMPLETED"} tasks={completed} id={"4"} />
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
