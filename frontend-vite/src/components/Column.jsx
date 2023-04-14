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
      <div className="min-h-screen">
        <div className="rounded-md max-h-screen">
          {/* <h3 className="text-md font-medium text-grey-900"> {title} </h3> */}
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
                    ? "#F3F4F6"
                    : "#F3F4F6",
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

