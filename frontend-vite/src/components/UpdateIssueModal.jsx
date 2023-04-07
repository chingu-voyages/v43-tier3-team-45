// import axiosInstance from '../util/AxiosInstance.js'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UpdateIssueForm from './UpdateIssueForm.jsx'

const CreateIssueModal = ({onClose, taskId} ) => {
  const [ data, setData ] = useState([])

  // const [ data, setData ] = useState({
  //       title: "",
  //       description: "",
  //       comment: "",
  //       priority: "",
  //       type: ""
  //   })

  useEffect(()  => {
    fetch(`http://localhost:8080/api/issues/${taskId}`)
    .then((r) => r.json())
    .then((data) => setData(data))
  }, [])

if(data.length < 1)
  return (
       <div>Loading </div>      
  )
    else
    return (
      <UpdateIssueForm data={data} onClose={onClose}/>   
    )


};

export default CreateIssueModal;