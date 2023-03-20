import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";
import Task from "./Task"


// const TaskList = styled.div`
//     padding: 3px;
//     transition: background-color 0.2s ease;
//     background-color: #f4f5f7;
//     flex-grow: 1;
//     min-height: 100px
// `
function Column({ title, tasks, id}) {


    return (
        <div>
        <Droppable droppableId={id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                >

            <Task
                task={{id:123, title: "Make a KanBan Board"}}
                index={1}
            />

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div>
    )
}

export default Column
