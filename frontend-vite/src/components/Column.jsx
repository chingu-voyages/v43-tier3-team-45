import React from 'react';
import "./scroll.css"
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task'
export default function Column({ title, tasks, id}) {

    const tasksArray = tasks.map((task, index) => (
        <Task
            key={index}
            index={index}
            task={task}
        />
    ))

    return (
        <div>
            <div class='column'>
                <div class="border">
                    <h3 class="text-4xl font-bold"> {title} </h3>
                    <Droppable droppableId={id}>
                        {(provided, snapshot) => (
                            <div id="task-list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                                style={{
                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                    padding: 4,
                                    width: 400,
                                    minHeight: 800}}
                            >
                                {tasksArray}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    )
}
