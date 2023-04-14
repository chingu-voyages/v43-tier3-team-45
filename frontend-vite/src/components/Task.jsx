// import React, { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";
// import UpdateIssueModal from "../components/UpdateIssueModal.jsx";
// import { Transition } from "@headlessui/react";
// import Avatar from "./Avatar.jsx";

// export default function Task({ task, index }) {
//   const [isShowing, setIsShowing] = useState(false);

//   return (
//     <>
//       <div onClick={() => setIsShowing((isShowing) => !isShowing)}>
//         <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
//           {(provided, snapshot) => (
//             <div
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//               ref={provided.innerRef}
//               isDragging={snapshot.isDragging}
//               style={{
//                 userSelect: "none",
//                 padding: 16,
//                 margin: "0 00 8px 0",
//                 minHeight: "50px",
//                 backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
//                 color: "white",
//                 ...provided.draggableProps.style,
//               }}
//             >
//               <div className="border m-2 p-2">
//                 <div id="task-title">{task.title}</div>
//                 <div id="task-status">
//                   <span> Status: {task.status}</span>
//                 </div>
//                 <div id="task-priority">
//                   <span>Priority: {task.priority}</span>
//                 </div>
//                 <div>{task.id}</div>
//                 {/* <div id="user-avatar">
//                 {task.assignees.map((member) => (
//                   <Avatar src={member.avatarUrl} alt={"member"} size={12}/>
//                 ))}
//                 </div> */}
//               </div>
//               {provided.placeholder}
//             </div>
//           )}
//         </Draggable>
//       </div>
//       <div>
//         <Transition
//           show={isShowing}
//           enter="transition-opacity duration-125"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity duration-150"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div>
//             {isShowing ? (
//               <UpdateIssueModal
//                 taskId={task.id}
//                 onClose={() => setIsShowing(false)}
//               />
//             ) : null}
//           </div>
//         </Transition>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import UpdateIssueModal from "../components/UpdateIssueModal.jsx";
import { Transition } from "@headlessui/react";
import Avatar from "./Avatar.jsx";

export default function Task({ task, index }) {
  const [isShowing, setIsShowing] = useState(false);

  console.log(task);
  return (
    <>
      <div onClick={() => setIsShowing((isShowing) => !isShowing)}>
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="rounded-md mt-1"
              style={{
                minHeight: "50px",
                ...provided.draggableProps.style,
              }}
            >
              <div className="block rounded-md shadow bg-white border m-2 p-2">
                <div className="flex justify-between items-center max-w-40">
                  <div className="text-left text-md font-semibold text-grey-900 pr-2 leading-5 pb-2 text-ellipsis overflow-hidden">
                    {task.title}
                  </div>
                  <div className="text-left text-sm font-medium text-grey-600 p-1">
                    <span
                      className={`${
                        task.priority === "LOW"
                          ? "bg-green-400"
                          : task.priority === "MODERATE"
                          ? "bg-yellow-300"
                          : task.priority === "HIGH"
                          ? "bg-orange-300"
                          : "bg-red-600"
                      } rounded-full ml-1 px-2 py-0.5`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="text-left text-sm font-medium text-grey-600">
                  {task.issueType}
                </div>
                <div className="text-left text-sm font-medium text-grey-600">
                  <span>Status:</span>
                  <span
                    className={`${
                      task.status === "NEW"
                        ? "bg-blue-200"
                        : task.status === "BACKLOG"
                        ? "bg-pink-200"
                        : task.status === "IN_PROGRESS"
                        ? "bg-purple-200"
                        : "bg-emerald-200"
                    } rounded-full ml-1 px-2 py-0.5`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      </div>
      <div>
        <Transition
          show={isShowing}
          enter="transition-opacity duration-125"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            {isShowing ? (
              <UpdateIssueModal
                taskId={task.id}
                onClose={() => setIsShowing(false)}
              />
            ) : null}
          </div>
        </Transition>
      </div>
    </>
  );
}
