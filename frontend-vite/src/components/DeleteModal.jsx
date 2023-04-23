import React, { useState, useEffect } from "react";
import DeleteModalForm from "./DeleteModalForm.jsx";
import { getIssueDetail } from "../util/apiCalls.js";

const DeleteModal = ({ onClose, taskId, data }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     getIssueDetail(taskId).then((res) => setData(res));
//   }, []);
console.log("delete", data)

    if (data == null) return <div>no</div>;
    else return <DeleteModalForm taskId={taskId} data={data} onClose={onClose} />;
};

export default DeleteModal;