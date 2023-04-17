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
import { setTeamName, updateTeam } from "../store/teamReducer";
import { setProjectName, updateProject } from "../store/projectReducer";

export default function Kanban() {
  const backlog = useSelector((state) => state.project.backlog);
  const newStatus = useSelector((state) => state.project.newStatus);
  const inProgress = useSelector((state) => state.project.inProgress);
  const completed = useSelector((state) => state.project.completed);
  const project = useSelector((state) => state.project.currentProject);
  const team = useSelector((state) => state.team.currentTeam);
  const loading = useSelector((state) => state.project.status) == "loading";
  const teamName = useSelector((state) => {
    if (team !== null) {
      return state.team.currentTeam.name;
    } else {
      return "";
    }
  });

  const dispatch = useDispatch();

  const handleTeamNameChange = (e) => {
    dispatch(setTeamName(e.target.value));
  };

  const handleTeamNameBlur = (e) => {
    dispatch(updateTeam());
  };

  const handleProjectNameChange = (e) => {
    dispatch(setProjectName(e.target.value));
  };

  const handleProjectNameBlur = (e) => {
    dispatch(updateProject());
  };

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
      <div className="grid grid-cols-5 gap-1 shadow min-w-screen p-2">
        <div className="col-span-2 flex justify-start ml-1 text-2xl origin-left font-semibold text-gray-900 leading-tight">
          {team && (
            <input
              type="text"
              onChange={(e) => handleTeamNameChange(e)}
              onBlur={(e) => handleTeamNameBlur(e)}
              value={teamName}
              className="truncate w-11/12 font-medium"
            />
          )}
        </div>
        <div className="col-span-2 flex justify-start ml-2 text-2xl origin-left font-medium text-gray-900 leading-tight">
          {/* {project && project.name} */}
          {project && (
            <input
              type="text"
              value={project.name}
              onChange={(e) => handleProjectNameChange(e)}
              onBlur={(e) => handleProjectNameBlur(e)}
              className="truncate w-11/12 font-medium"
            />
          )}
        </div>
        <div className="flex justify-end h-full mr-2">
          <div className="text-sm font-medium text-white">
            {project && <CreateIssue />}
          </div>
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
