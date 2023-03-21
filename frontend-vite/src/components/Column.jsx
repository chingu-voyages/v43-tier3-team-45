import React from 'react';
import "./scroll.css"
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task'
export default function Column({ title, tasks, id}) {
    console.log(tasks)

    const tasksArray = tasks.map((task, index) => (
        <Task
            key={index}
            index={index}
            task={task}
        />
    ))

    return (
        <div>
            <div id="container" className='column'>
                <h3 id="columnn-id"> {title} </h3>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div id="task-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {tasksArray}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}
