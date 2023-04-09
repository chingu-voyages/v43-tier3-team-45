import { useSelector } from 'react-redux'
import TypeDropdown from './TypeDropdown.jsx'
import PriorityDropdown from './PriorityDropdown.jsx'
// import axiosInstance from '../util/AxiosInstance.js'
import axios from 'axios'
import { useState, useEffect } from 'react'

const UpdateIssueForm = ({onClose, data} ) => {
    console.log("data.title", data.title)
  const [title, setTitle ] = useState(data.title)
  const [description, setDescription ] = useState(data.description)
  const [comment, setComment ] = useState(data.comment)
  const [priority, setPriority] = useState(data.priority)
  const [type, setType ] = useState(data.type)

  // const currentUser = useSelector(state => state.user.currentUser)

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
  
  const postIssue = async (testIssue) => {
        try {
          const response = await axios.post(`http://localhost:8080/api/issues/create?projectId=641ba8e494ba927d1a1e932d`, testIssue);
          return response.data;
        } catch (error) {
          console.log("error", error)
        }
    }

return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form className="mt-6">

              <div className="mb-2">
                <label>
                  <span className="text-gray-700">{useSelector(state => state.user.email)}</span>
                  <input
                    type="text"
                    value={title}
                    name="name"
                    className="text-black"
                    // className="
                    //   w-full
                    //   block px-16 py-2 mt-2
                    //   border-gray-300
                    //   rounded-md
                    //   shadow-sm
                    //   focus:border-indigo-300
                    //   focus:ring
                    //   focus:ring-indigo-200
                    //   focus:ring-opacity-50
                    // "
                    placeholder="Title"
                    onChange={handleTitle}
                  />
                </label>
                {/* <div className="text-black">{title}</div> */}
              </div>
                <div>
                    <TypeDropdown handleType={handleType} type={type} />
                </div>
                <div>
                    <PriorityDropdown handlePriority={handlePriority} priority={priority}/>
                </div>

              <div className="mb-2">
                <label>
                  <span class="text-gray-700">Description</span>
                  <textarea
                    name="message"
                    value={description}
                    className="
                        block
                        w-full
                        mt-2 px-16 py-8
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                      rows="5"
                    onChange={handleDescription}
                  ></textarea>
                </label>
              </div>

              <div className="mb-2">
                <label>
                  <span class="text-gray-700">Comment</span>
                  <textarea
                    name="message"
                    value={comment}
                    className="
                        block
                        w-full
                        mt-2 px-16 py-8
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                    rows="5"
                    onChange={handleComment}
                  ></textarea>
                </label>
              </div>

              <div class="mb-6">
                <button
                  type="submit"
                  className="
                      h-10
                      px-5
                      text-indigo-100
                      bg-indigo-700
                      rounded-lg
                      transition-colors
                      duration-150
                      focus:shadow-outline
                      hover:bg-indigo-800
                    "
                    onClick={handleSave}
                >
                  Update
                </button>
              </div>

              <div class="mb-6">
                <button
                    type="submit"
                    className="
                      h-10
                      px-5
                      text-indigo-100
                      bg-indigo-700
                      rounded-lg
                      transition-colors
                      duration-150
                      focus:shadow-outline
                      hover:bg-indigo-800
                      "
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>

              <div></div>
            </form >

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            </div>
          </div>
        </div>
      </div>
)

};

export default UpdateIssueForm;