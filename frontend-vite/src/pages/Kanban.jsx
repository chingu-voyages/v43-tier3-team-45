import React, {useState} from 'react';
import { DragDropContext } from "react-beautiful-dnd"
import Column from '../components/Column';

export default function Kanban() {
    const [completed, setCompleted] = useState([])
    const [incomplete, setIncomplete] = useState([])

    return (
        <DragDropContext>
            <h1> PROGRESS BOARD</h1>
            <div>
                <Column
                    title={"TO DO"}
                    tasks={incomplete}
                    id={"1"}
                />
            </div>

        </DragDropContext>
    )
}
