import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import { useState } from "react";
import axiosInstance from "../util/AxiosInstance.js";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import { current } from "@reduxjs/toolkit";

const CreateIssueForm = ({ onClose }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [comment, setComment] = useState();
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const userName = useSelector((state) => state.user.currentUser.email)

  const testIssue = {
    title: "Test createNewIssue",
    description: "testDescription",
    assignees: [],
    comments: [],
    createdBy: currentUser,
    issueType: "TASK",
    priority: "LOW",
    status: "NEW",
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handlePriority = (priority) => {
    setPriority(priority);
  };

  const handleType = (type) => {
    setType(type);
  };

  const handleSave = (e) => {
        e.preventDefault()
        // console.log(title, description, comment, priority, type, userEmail)
        postIssue(testIssue)
        onClose()
  }
  
  const postIssue = async (testIssue) => {
        try {
          const response = await axiosInstance.post(`http://localhost:8080/api/issues/create?projectId=641ba8e494ba927d1a1e932d`, testIssue);
          return response.data;
        } catch (error) {
          console.log("error", error)
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto text-black">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form className="mt-6">
              <div className="mb-2">
                <button 
                  onClick={onClose}
                  type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>
                <label>
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
              <div>Created by: {userName}</div>
              <div>
                    <TypeDropdown handleType={handleType} />
                </div>
                <div>
                    <PriorityDropdown handlePriority={handlePriority}/>
                </div>
                <div>
                  <TeamMemberDropdown />
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
          </form>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateIssueForm;
