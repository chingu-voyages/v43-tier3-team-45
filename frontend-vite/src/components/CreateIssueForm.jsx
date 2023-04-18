import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import Avatar from "./Avatar.jsx";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import {
  clearSelectedList,
  setFilteredList,
  removeMemberFromSelectedList,
} from "../store/teamReducer.js";
import { createNewIssue } from "../store/projectReducer.js";

const CreateIssueForm = ({ onClose }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState("LOW");
  const [type, setType] = useState("TASK");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedList = useSelector((state) => state.team.selectedList);

  // build issue to IssueDTO to send to backend
  const issue = {
    title: title,
    description: description,
    assignees: selectedList,
    comments: [],
    createdBy: currentUser,
    issueType: type,
    priority: priority,
    status: "NEW",
  };

  const handleClick = (e, member) => {
    e.preventDefault();
    dispatch(removeMemberFromSelectedList(member));
    console.log(issue);
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handlePriority = (priority) => {
    setPriority(priority);
  };

  const handleType = (type) => {
    console.log(type);
    setType(type);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(issue);
    dispatch(createNewIssue(issue));
    handleClose(e);
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearSelectedList());
    dispatch(setFilteredList());
    onClose();
  };

  return (
    <div
      className="py-12 backdrop-blur-sm bg-white/50 backdrop-filter w-screen h-screen fixed top-0 left-0 transition duration-150 ease-in-out z-10"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3">
        <div className="relative py-6 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="flow-root">
            <button
              onClick={(e) => handleClose(e)}
              type="button"
              className="float-right bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h1 className="float-center text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 pt-2">
              Add New Task
            </h1>
          </div>
          <form className="mt-6">
            <div className="mb-2">
              <label className="mt-1">
                <input
                  type="text"
                  name="name"
                  className="
                    w-full
                    block pr-3 pl-1 py-1 my-1
                    border-gray-300
                    rounded-md
                    text-black
                    text-2xl
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                    "
                  placeholder="Title"
                  value={title}
                  onChange={handleTitle}
                />
              </label>
              <div className="flex justify-start mt-2">
                <label
                  for="name"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Issue Type:{" "}
                  <TypeDropdown handleType={handleType} type={"TASK"} />
                </label>
              </div>
              <div className="flex justify-start mt-2">
                <label
                  for="name"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Priority:{" "}
                  <PriorityDropdown
                    handlePriority={handlePriority}
                    priority={"LOW"}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-start items-center mt-2">
              <span className="text-gray-800 text-sm font-bold mr-1">
                Assigned to:{" "}
              </span>
              {selectedList.map((member) => (
                <button
                  className="mx-px"
                  onClick={(e) => handleClick(e, member)}
                >
                  <Avatar
                    src={member.avatarUrl}
                    alt={member.firstName}
                    size={12}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-start mt-2">
              <TeamMemberDropdown />
            </div>
            <div className="flex flex-col items-start my-2">
              <span className="text-gray-400 text-md">Description</span>
              <label className="w-full">
                <textarea
                  name="message"
                  value={description}
                  style={{ fontSize: "18px" }}
                  className="
                        block
                        w-full
                        mt-2 px-3 py-3
                        border-gray-300
                        text-black
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                  rows="20"
                  onChange={(e) => handleDescription(e)}
                ></textarea>
              </label>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="
                      mt-5
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
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIssueForm;
