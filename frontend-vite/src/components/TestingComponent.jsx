import { useSelector } from 'react-redux'
import TypeDropdown from './TypeDropdown.jsx'
import PriorityDropdown from './PriorityDropdown.jsx'
import { useState } from 'react'
import axiosInstance from '../util/AxiosInstance.js'
import TeamDropdown from './TeamMemberDropdown.jsx'


// source code: https://tailwindcomponents.com/component/free-tailwind-css-modal-component

const Test = ({taskId, onClose, data} ) => {

    const [title, setTitle ] = useState(data.title)
    const [description, setDescription ] = useState(data.description)
    const [comment, setComment ] = useState(data.comment)
    const [priority, setPriority] = useState(data.priority)
    const [type, setType ] = useState(data.type)
  
      const currentUser = useSelector((state) => state.user.currentUser.firstName);
  
      const testUser = {
          "id": "641ba87494ba927d1a1e932c",
          "email": "test1@gmail.com",
          "firstName": "Test",
          "lastName": "One",
          "role": "ROLE_USER",
          "avatarUrl": "https://chinguboard-dev.s3.us-east-2.amazonaws.com/f805ce7c-5dba-46f3-be54-90c27983aacc_29348169ecc5b8d01ac28beb2c5a4a79.png"
      }
  
      const testIssue = {
          "title": "testTitle",
          "description": "testDescription",
          "assignees": [],
          "comments": [],
          "createdBy": testUser,
          issueType: "TASK",
          priority: "LOW",
          status: "BACKLOG",
      }
    
    const handleTitle = (e) => {
          e.preventDefault()
          setTitle(e.target.value)
    }
    
    const handleDescription = (e) => { 
          e.preventDefault()
          setDescription(e.target.value)
    }
  
    const handleComment = (e) => { 
          e.preventDefault()
          setComment(e.target.value)
    }
  
    const handlePriority = (priority) => {
          setPriority(priority)
    }
  
    const handleType = (type) => {
          setType(type)
    };
  
    const handleSave = (e) => {
          e.preventDefault()
          // console.log(title, description, comment, priority, type, userEmail)
          postIssue(testIssue)
          onClose()
    }
  
    const handleDelete = (e) => {
      e.preventDefault()
      console.log("DELETE", taskId)
      onClose()
  }
  
    const postIssue = async (testIssue) => {
          try {
            const response = await axiosInstance.post(`http://localhost:8080/api/issues/create?projectId=641ba8e494ba927d1a1e932d`, testIssue);
            console.log(response.data)
            return response.data;
            
          } catch (error) {
            console.log("error", error)
          }
      }
  

    return (
            <div class="py-12 backdrop-blur-sm transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">  
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit Task</h1>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Owner Name</label>
                        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card Number</label>
                        <div class="relative mb-5 mt-2">
                            <input id="email2" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border" placeholder="XXXX - XXXX - XXXX - XXXX" />
                        </div>
                        <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expiry Date</label>
                        <div class="relative mb-5 mt-2">
                            <input id="expiry" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
                        </div>
                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">CVC</label>
                        <div class="relative mb-5 mt-2">
                            <input id="cvc" class="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
                        </div>
                        <div class="flex items-center justify-start w-full">
                            <button onClick={handleSave} class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Save</button>
                            <button onClick={handleDelete} class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">Delete</button>
                        </div>
                        <button onClick={onClose} class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onclick="modalHandler()" aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    )

}

export default Test