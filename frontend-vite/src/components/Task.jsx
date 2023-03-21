import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";

// const Container = styled.div`
//     border-radius: 10px;
//     padding: 8px;
//     color: #000;
//     margin-bottom: 8px;
//     min-height: 90px;
//     margin-left: 10px;
//     margin-right: 10px;
//     background-color: ${(props) => bgcolorChange(props)};
//     cursor: pointer;
//     display: flex;
//     justify-content: space-between;
//     flex-direction: column
// `;

// function bgcolorChange(props) {
//     return props.isDragging
//         ? "lightgreen" : props.isDraggable
//         ? props.isBacklog
//             ? "#F2D7D5" : "#DCDCDC"
//         : props.isBacklog
//         ? "#F2D7D5" : "#fffada"
// };

export default function Task({ task, index }) {

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>

        {(provided, snapshot) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                <div>
                    <span>
                        #{task.id}
                        {" "}
                    </span>
                </div>
                <div id="task-id">
                    {task.title}
                </div>
                <div id="user-avatar"></div>

                {provided.placeholder}
            </div>
        )}
        </Draggable>
    )
}
