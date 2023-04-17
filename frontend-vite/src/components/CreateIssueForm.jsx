import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import { useState } from "react";
import axiosInstance from "../util/AxiosInstance.js";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import { IssuePostComment } from "./IssuePostComment.jsx";
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
            <div class="py-12 backdrop-blur-sm transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
            <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"> 
                <button 
                  onClick={onClose}
                  type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button> 
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit Task</h1>
            <form className="mt-6">
              <div className="mb-2">
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
              <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Issue Type: <TypeDropdown /></label>
                </div>
                <div>
                <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Priority: <PriorityDropdown /></label>
                </div>
                <div>
                <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Members: <TeamMemberDropdown /></label>
                </div>
            <div className="mb-2">
              <label>
              <span class="text-gray-400">Description</span>
                  <textarea
                    name="message"
                    value={description}
                    style={{ fontSize: "18px" }}
                    className="
                        block
                        w-full
                        mt-2 px-3 py-3
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                      rows="3"
                    onChange={handleDescription}
                  ></textarea>
                </label>
            </div>
            <div className="mb-2">
            <IssuePostComment />
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
