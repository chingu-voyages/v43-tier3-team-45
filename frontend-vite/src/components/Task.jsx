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

    console.log(task)

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>

        {(provided, snapshot) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                style={{
                    userSelect: 'none',
                    padding: 16,
                    margin: '0 00 8px 0',
                    minHeight: '50px',
                    backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                    color: 'white',
                    ...provided.draggableProps.style
                }}
            >
                <div class="border m-2 p-2">
                    <div>
                        <span>
                            #{task.status}
                            {" "}
                        </span>
                    </div>
                    <div id="task-id">
                        {task.title}
                    </div>
                    <div id="user-avatar"></div>
                </div>

                {provided.placeholder}
            </div>
        )}
        </Draggable>
    )
}
