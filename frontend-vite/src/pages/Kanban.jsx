import React, {useState, useEffect} from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column"


export default function Kanban() {
    const [completed, setCompleted] = useState([])
    const [incomplete, setIncomplete] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((r) => r.json())
            .then((json) => {
                setCompleted(json.filter((task) => task.completed));
                setIncomplete(json.filter((task) => !task.completed));
            })
    }, [])

    function findItemById(id, array) {
        return array.find((item) => item.id == id)
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id)
    }

    function handleDragEnd(result) {
        const { destination, source, draggableId} = result;

        if (source.droppableId == destination.droppableId) return;

        //REMOVE FROM SOURCE ARRAY

        if (source.droppableId == 2 ) {
            setCompleted(removeItemById(draggableId, completed));
        } else {
            setIncomplete(removeItemById(draggableId, incomplete))
        }

        // GET ITEM
        const task = findItemById(draggableId, [...incomplete, ...completed])

        // ADD ITEM
        if (destination.droppableId == 2 ) {
            setCompleted([{...task, completed: !task.completed}, ...completed]);
        } else {
            setIncomplete([{...task, completed: !task.completed}, ...incomplete])
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h1> PROGRESS BOARD</h1>
            <div>
                <Column
                    title={"TO DO"}
                    tasks={incomplete}
                    id={"1"}
                />
                <Column
                    title={"COMPLETED"}
                    tasks={completed}
                    id={"2"}
                />
                <Column
                    title={"BACKLOG"}
                    tasks={[]}
                    id={"3"}
                />
            </div>

        </DragDropContext>
    )
}
