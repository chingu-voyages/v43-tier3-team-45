import React, { useState, useEffect } from "react";
import UpdateIssueForm from "./UpdateIssueForm.jsx";
import { getIssueDetail } from "../util/apiCalls.js";

const CreateIssueModal = ({ onClose, taskId }) => {
  const [data, setData] = useState(null);

  // const [ data, setData ] = useState({
  //       title: "",
  //       description: "",
  //       comment: "",
  //       priority: "",
  //       type: ""
  //   })

  useEffect(() => {
    getIssueDetail(taskId).then((res) => setData(res));
  }, []);

  if (data == null) return <div>Loading </div>;
  else return <UpdateIssueForm taskId={taskId} data={data} onClose={onClose} />;
};

export default CreateIssueModal;
