import React, { useState, useEffect } from "react";
import UpdateIssueForm from "./UpdateIssueForm.jsx";
import { getIssueDetail } from "../util/apiCalls.js";
import CircularLoading from "./CircularLoading.jsx";

const UpdateIssueModal = ({ onClose, taskId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getIssueDetail(taskId).then((res) => setData(res));
  }, []);

  if (data == null) return <CircularLoading />;
  else return <UpdateIssueForm data={data} onClose={onClose} />;
};

export default UpdateIssueModal;
