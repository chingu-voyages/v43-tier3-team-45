import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import UpdateIssueModal from "../components/UpdateIssueModal.jsx";
import { Transition } from "@headlessui/react";

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
                        ? "bg-[#B8E3FF]"
                        : task.status === "BACKLOG"
                        ? "bg-[#61B0B7]"
                        : task.status === "IN_PROGRESS"
                        ? "bg-[#0584d2be]"
                        : "bg-[#16558f74]"
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
