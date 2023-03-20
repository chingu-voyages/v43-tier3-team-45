import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ task, index }) {

    function bgcolorChange(props) {
        return props.isDragging
            ? "lightgreen"
            : props.isDraggable
            ? props.isBacklog
                ? "#F2D7D5"
                : "DCDCDC"
            : props.isBacklog
            ? "#F2D7D5"
            : "#fffada"
    }

    return (
        <div>
            <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <span>
                            {task.id}
                        </span>
                        <div>
                            {task.title}
                        </div>
                    </div>
                )}
                {provided.placeholder}
            </Draggable>
        </div>
    )
}
