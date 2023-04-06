import { useDispatch, useSelector } from 'react-redux'
import TypeDropdown from './TypeDropdown.jsx'
import PriorityDropdown from './PriorityDropdown.jsx'
import { useState } from 'react'
// import axiosInstance from '../util/AxiosInstance.js'
import axios from 'axios'
import { Popover } from '@headlessui/react'

const ModalExample2 = ({closeModal}) => {
  const [title, setTitle ] = useState()
  const [description, setDescription ] = useState()
  const [comment, setComment ] = useState()
  const [priority, setPriority] = useState()
  const [type, setType ] = useState()

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
        closeModal(false)
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
      <div className="fixed top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        <div>
             <label>
              <span className="text-gray-700">{useSelector(state => state.user.email)}</span>
               <input
                type="text"
                name="name"
                className="

            w-full
            block px-16 py-2 mt-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="Title"
                onChange={handleTitle}
              />
            </label>
          </div>
          <div>
                <TypeDropdown handleType={handleType} />
            </div>
            <div>
                <PriorityDropdown handlePriority={handlePriority}/>
            </div>
          <div className="mb-2">
            <label>
              <span class="text-gray-700">Description</span>
              <textarea
                name="message"
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
              Save
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
          onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </div>
      </Popover>
      </div>
    )

  // return (
  //   <div class="modal">
  //   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden " >
  //     <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
  //       <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
  //           Create Issue
  //       </h1>
  //       <form className="mt-6">
  //         <div className="mb-2">
  //           <label>
  //             <span className="text-gray-700">{useSelector(state => state.user.email)}</span>
  //             <input
  //               type="text"
  //               name="name"
  //               className="

  //           w-full
  //           block px-16 py-2 mt-2
  //           border-gray-300
  //           rounded-md
  //           shadow-sm
  //           focus:border-indigo-300
  //           focus:ring
  //           focus:ring-indigo-200
  //           focus:ring-opacity-50
  //         "
  //               placeholder="Title"
  //               onChange={handleTitle}
  //             />
  //           </label>
  //         </div>
  //         <div>
  //               <TypeDropdown handleType={handleType} />
  //           </div>
  //           <div>
  //               <PriorityDropdown handlePriority={handlePriority}/>
  //           </div>
  //         <div className="mb-2">
  //           <label>
  //             <span class="text-gray-700">Description</span>
  //             <textarea
  //               name="message"
  //               className="
  //           block
  //           w-full
  //           mt-2 px-16 py-8
  //           border-gray-300
  //           rounded-md
  //           shadow-sm
  //           focus:border-indigo-300
  //           focus:ring
  //           focus:ring-indigo-200
  //           focus:ring-opacity-50
  //         "
  //               rows="5"
  //               onChange={handleDescription}
  //             ></textarea>
  //           </label>
  //         </div>

  //         <div className="mb-2">
  //           <label>
  //             <span class="text-gray-700">Comment</span>
  //             <textarea
  //               name="message"
  //               className="
  //           block
  //           w-full
  //           mt-2 px-16 py-8
  //           border-gray-300
  //           rounded-md
  //           shadow-sm
  //           focus:border-indigo-300
  //           focus:ring
  //           focus:ring-indigo-200
  //           focus:ring-opacity-50
  //         "
  //               rows="5"
  //               onChange={handleComment}
  //             ></textarea>
  //           </label>
  //         </div>

  //         <div class="mb-6">
  //           <button
  //             type="submit"
  //             className="
  //           h-10
  //           px-5
  //           text-indigo-100
  //           bg-indigo-700
  //           rounded-lg
  //           transition-colors
  //           duration-150
  //           focus:shadow-outline
  //           hover:bg-indigo-800
  //         "
  //         onClick={handleSave}
  //           >
  //             Save
  //           </button>
  //         </div>
  //         <div class="mb-6">
  //           <button
  //             type="submit"
  //             className="
  //           h-10
  //           px-5
  //           text-indigo-100
  //           bg-indigo-700
  //           rounded-lg
  //           transition-colors
  //           duration-150
  //           focus:shadow-outline
  //           hover:bg-indigo-800
  //         "
  //         onClick={() => closeModal(false)}
  //           >
  //             Cancel
  //           </button>
  //         </div>

  //         <div></div>
  //       </form>
  //     </div>
  //   </div>
  //   </div>
  // );
};

export default ModalExample2;