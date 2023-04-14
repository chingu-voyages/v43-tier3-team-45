// import React from "react";
// import { DragDropContext } from "react-beautiful-dnd";
// import Column from "./Column";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   removeFromBacklog,
//   removeFromCompleted,
//   removeFromInProgress,
//   removeFromNewStatus,
//   updateStatus,
// } from "../store/projectReducer";
// import CreateIssue from "../pages/CreateIssue";
// import CircularLoading from "./CircularLoading";

// export default function Kanban() {
//   const backlog = useSelector((state) => state.project.backlog);
//   const newStatus = useSelector((state) => state.project.newStatus);
//   const inProgress = useSelector((state) => state.project.inProgress);
//   const completed = useSelector((state) => state.project.completed);
//   const project = useSelector((state) => state.project.currentProject);

//   const dispatch = useDispatch();

//   function handleDragEnd(result) {
//     const { destination, source, draggableId } = result;

//     if (source.droppableId == destination.droppableId) return;

//     //REMOVE FROM SOURCE ARRAY
//     if (source.droppableId == 4) {
//       dispatch(removeFromCompleted(source.index));
//     } else if (source.droppableId == 3) {
//       dispatch(removeFromInProgress(source.index));
//     } else if (source.droppableId == 1) {
//       dispatch(removeFromNewStatus(source.index));
//     } else {
//       dispatch(removeFromBacklog(source.index));
//     }

//     // ADD AND UPDATE ITEM
//     if (destination.droppableId == 4) {
//       dispatch(
//         updateStatus({
//           draggableId: draggableId,
//           status: "DONE",
//           index: destination.index,
//         })
//       );
//     } else if (destination.droppableId == 3) {
//       dispatch(
//         updateStatus({
//           draggableId: draggableId,
//           status: "IN_PROGRESS",
//           index: destination.index,
//         })
//       );
//     } else if (destination.droppableId == 1) {
//       dispatch(
//         updateStatus({
//           draggableId: draggableId,
//           status: "NEW",
//           index: destination.index,
//         })
//       );
//     } else {
//       dispatch(
//         updateStatus({
//           draggableId: draggableId,
//           status: "BACKLOG",
//           index: destination.index,
//         })
//       );
//     }
//   }

//   return (
//     <div>
//       <div className="p-6">{project && <CreateIssue />}</div>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="p-3 flex">
//           <div className="grid grid-cols-4 gap-8">
//             <Column title={"NEW"} tasks={newStatus} id={"1"} />
//             <Column title={"BACKLOG"} tasks={backlog} id={"2"} />
//             <Column title={"IN PROGRESS"} tasks={inProgress} id={"3"} />
//             <Column title={"COMPLETED"} tasks={completed} id={"4"} />
//           </div>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

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

export default function Kanban() {
  const backlog = useSelector((state) => state.project.backlog);
  const newStatus = useSelector((state) => state.project.newStatus);
  const inProgress = useSelector((state) => state.project.inProgress);
  const completed = useSelector((state) => state.project.completed);
  const project = useSelector((state) => state.project.currentProject);

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
      <div className="p-6 flex justify-between">
        <div>{project.name}</div>
        <div>{project && <CreateIssue />}</div>
      </div>
      <div className="">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1">
            <div className="p-3 flex">
              <div className="flex-shrink-0 w-80 p-3 rounded-md bg-gray-100 mr-4 overflow-auto">
                <Column title={"NEW"} tasks={newStatus} id={"1"} />
              </div>
              <div className="flex-shrink-0 w-80 p-3 rounded-md bg-gray-100 mr-4 overflow-auto">
                <Column title={"BACKLOG"} tasks={backlog} id={"2"} />
              </div>
              <div className="flex-shrink-0 w-80 p-3 rounded-md bg-gray-100 mr-4 overflow-auto">
                <Column title={"IN PROGRESS"} tasks={inProgress} id={"3"} />
              </div>
              <div className="flex-shrink-0 w-80 p-3 rounded-md bg-gray-100 overflow-auto">
                <Column title={"COMPLETED"} tasks={completed} id={"4"} />
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
