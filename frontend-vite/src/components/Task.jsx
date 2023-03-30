import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {

  return (
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
            <div id="user-avatar"></div>
          </div>

         {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
