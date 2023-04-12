import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import UpdateIssueModal from '../components/UpdateIssueModal.jsx'
import { Transition } from '@headlessui/react'
import TestModal from '../components/TestModal.jsx'

export default function Task({ task, index }) {

  const [isShowing, setIsShowing] = useState(false)

  return (
    <div>
      <div onClick={() => setIsShowing((isShowing) => !isShowing)}>
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          style={{
            userSelect: "none",
            padding: 16,
            margin: "0 00 8px 0",
            minHeight: "50px",
            backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
            color: "white",
            ...provided.draggableProps.style,
          }}
        >
          <div class="border m-2 p-2">
            <div id="task-title">{task.title}</div>
            <div id="task-status">
              <span> Status: {task.status}</span>
            </div>
            <div id="task-priority">
              <span>Priority: {task.priority}</span>
            </div>
            <div>{task.id}</div>
            <div id="user-avatar"></div>
            <div>
            {/* <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
                Edit
            </button> */}
            {/* moved the TRANSITION component so it's not draggable while opened */}
        </div>
            {/* <div>{<button onClick={(() => console.log("edit", task.id))}>Edit</button>} </div> */}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
    </div>
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
            {isShowing ? (<TestModal taskId={task.id} onClose={() => setIsShowing(false)} />) : null }
          </div>
      </Transition>
    </div>
  );
}
