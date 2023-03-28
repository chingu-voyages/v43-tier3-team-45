// import React, {useState, useEffect} from 'react';
// import { DragDropContext } from "react-beautiful-dnd";
// import Column from "../components/Column"


// export default function Kanban() {
//     const [completed, setCompleted] = useState([]);
//     const [incomplete, setIncomplete] = useState([]);
//     const [backlog, setBacklog] = useState([])

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/todos")
//             .then((r) => r.json())
//             .then((json) => {
//                 setCompleted(json.filter((task) => task.completed));
//                 // setCompleted(json.filter((task) => task.column === 'completed'));
//                 setIncomplete(json.filter((task) => !task.completed));
//                 // setIncomplete(json.filter((task) => task.column === 'in-progress'));
//                 // setBacklog(json.filter((task) => task.column === 'backlog'));
//             })
//     }, [])

//     function findItemById(id, array) {
//         return array.find((item) => item.id == id)
//     }

//     function removeItemById(id, array) {
//         return array.filter((item) => item.id != id)
//     }

//     function handleDragEnd(result) {
//         const { destination, source, draggableId} = result;

//         if (source.droppableId == destination.droppableId) return;

//         //REMOVE FROM SOURCE ARRAY

//         if (source.droppableId == 2 ) {
//             setCompleted(removeItemById(draggableId, completed));
//         } else {
//             setIncomplete(removeItemById(draggableId, incomplete))
//         }

//         // GET ITEM
//         const task = findItemById(draggableId, [...incomplete, ...completed])

//         // ADD ITEM
//         if (destination.droppableId == 2 ) {
//             setCompleted([{...task, completed: !task.completed}, ...completed]);
//         } else {
//             setIncomplete([{...task, completed: !task.completed}, ...incomplete])
//         }
//     }

//     return (
//         <DragDropContext onDragEnd={handleDragEnd}>
//             <div class="flex">
//                 <div class="grid grid-cols-4 gap-8">
//                 <Column
//                     title={"TO DO"}
//                     tasks={incomplete}
//                     id={"1"}
//                 />
//                 <Column
//                     title={"COMPLETED"}
//                     tasks={completed}
//                     id={"2"}
//                 />
//                 <Column
//                     title={"BACKLOG"}
//                     tasks={[]}
//                     id={"3"}
//                 />
//                 <Column
//                     title={"IN PROGRESS"}
//                     tasks={[]}
//                     id={"4"}
//                 />
//                 </div>
//             </div>

//         </DragDropContext>
//     )
// }


import React, {useState, useEffect} from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";


export default function Kanban() {
    // const [completed, setCompleted] = useState([]);
    // const [incomplete, setIncomplete] = useState([]);

    const [backlog, setBacklog] = useState([]);
    const [newStatus, setNewStatus] = useState([]);
    const [inProgress, setinProgress] = useState([]);
    const [completed, setCompleted] = useState([]);


    const [projects, setProjects] = useState({})


    useEffect(() => {
        fetch("http://localhost:8080/api/projects/641ba8e494ba927d1a1e932d")
            .then((r) => r.json())
            .then((json) => {
                setBacklog(json.issues.filter((issue) => issue.status == 'BACKLOG'))
                setNewStatus(json.issues.filter((issue) => issue.status == 'NEW'))
                setinProgress(json.issues.filter((issue) => issue.status == 'IN_PROGRESS'))
                setCompleted(json.issues.filter((issue) => issue.status == 'DONE'))
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
        if (source.droppableId == 4) {
            setCompleted(removeItemById(draggableId, completed));
        } else if (source.droppableId == 3) {
            setinProgress(removeItemById(draggableId, inProgress));
        } else if (source.droppableId == 2 ) {
            setNewStatus(removeItemById(draggableId, newStatus));
        } else {
            setBacklog(removeItemById(draggableId, backlog));
        }

        // GET ITEM
        const task = findItemById(draggableId, [...newStatus, ...completed, ...backlog, ...inProgress])

        // ADD ITEM
        if (destination.droppableId == 4 ) {
            setCompleted([{...task, completed: !task.completed}, ...completed]);
        } else if (destination.droppableId == 3) {
            setinProgress([{...task, completed: !task.completed}, ...inProgress]);
        } else if (destination.droppableId == 2) {
            setNewStatus([{...task, completed: !task.completed}, ...newStatus]);
        } else {
            setBacklog([{...task, completed: !task.completed}, ...backlog]);
        }
    }


    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div class="flex">
                <div class="grid grid-cols-4 gap-8">
                <Column
                    title={"BACKLOG"}
                    tasks={backlog}
                    id={"1"}
                />
                <Column
                    title={"TO DO"}
                    tasks={newStatus}
                    id={"2"}
                />
                <Column
                    title={"IN PROGRESS"}
                    tasks={inProgress}
                    id={"3"}
                />
                <Column
                    title={"COMPLETED"}
                    tasks={completed}
                    id={"4"}
                />
                </div>
            </div>
        </DragDropContext>
    )
}




