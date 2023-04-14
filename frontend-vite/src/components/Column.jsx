import React from "react";
// import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function Column({ title, tasks, id }) {
  const tasksArray = tasks.map((task, index) => (
    <Task key={index} index={index} task={task} />
  ));

  return (
    <div>
      <div className="column">
        <div className="rounded-md p-3 overflow-y-scroll">
          <h3 className="text-md font-medium text-grey-900"> {title} </h3>
          <div className="overflow-auto">
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                id="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "lightgrey",
                  minHeight: 100,
                }}
              >
                {tasksArray}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import "./scroll.css";
// import { Droppable } from "react-beautiful-dnd";
// import Task from "./Task";

// export default function Column({ title, tasks, id }) {
//   const tasksArray = tasks.map((task, index) => (
//     <Task key={index} index={index} task={task} />
//   ));

//   return (
//     <div>
//       <div className="">
//         <div className="rounded-md p-3">
//           <h3 className="text-md font-medium text-grey-900"> {title} </h3>
//           <Droppable droppableId={id}>
//             {(provided, snapshot) => (
//               <div
//                 id="task-list"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 // isDraggingOver={snapshot.isDraggingOver}
//                 // style={{
//                 //   background: snapshot.isDraggingOver
//                 //     ? "lightblue"
//                 //     : "lightgrey",
//                 // }}
//               >
//                 {tasksArray}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </div>
//     </div>
//   );
// }

