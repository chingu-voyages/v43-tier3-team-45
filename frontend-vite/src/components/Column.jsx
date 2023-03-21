import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function Column({ title, tasks, id}) {



    return (
        <div>
            <div id="container">
                <h3 id="columnn-id"> {title} </h3>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div id="task-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {/* provide tasks here */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}
