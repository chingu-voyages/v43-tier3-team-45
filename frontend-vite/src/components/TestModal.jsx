import React, { useState, useEffect } from "react";
import { getIssueDetail } from "../util/apiCalls.js";
import TestingComponent from './TestingComponent.jsx'

const CreateIssueModal = ({ onClose, taskId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getIssueDetail(taskId).then((res) => setData(res));
  }, []);

  if (data == null) return <div></div>;
  else return <TestingComponent taskId={taskId} data={data} onClose={onClose} />;
  
};

export default CreateIssueModal;
