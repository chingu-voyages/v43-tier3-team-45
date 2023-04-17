import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import { updateIssueDetail } from "../util/apiCalls.js";
import Avatar from "./Avatar.jsx";
import {
  addMemberToSelectedList,
  clearSelectedList,
  removeMemberFromSelectedList,
  setFilteredList,
} from "../store/teamReducer.js";
import { IssueCommentSection } from "./IssueCommentSection.jsx";
import { IssuePostComment } from "./IssuePostComment.jsx";

// add new comp for comments and addComment, have own button
// post text and created by user slice
import { IssueCommentSection } from "./IssueCommentSection.jsx";
import { IssuePostComment } from "./IssuePostComment.jsx";

// add new comp for comments and addComment, have own button
// post text and created by user slice

// data is the IssueDTO
const UpdateIssueForm = ({ onClose, data }) => {

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [comments, setComment] = useState(data.comments);
  const [priority, setPriority] = useState(data.priority);
  const [type, setType] = useState(data.issueType);
  const [ newComment, setNewComment ] = useState()


  const dispatch = useDispatch();
  const selectedList = useSelector((state) => state.team.selectedList);

  
  // when new task is opened, set selectedList and filteredList based on the task's assignees
  useEffect(() => {
    data.assignees.map((member) => dispatch(addMemberToSelectedList(member)));
  }, []);

  // function to handle unassigning a member from an issue
  const handleClick = (e, member) => {
    e.preventDefault();
    dispatch(removeMemberFromSelectedList(member));
  };

  // build issue to IssueDTO to send to backend
  const issue = {
    id: data.id,
    title: title,
    description: description,
    assignees: selectedList,
    comments: data.comments,
    createdBy: data.createdBy,
    issueType: type,
    priority: priority,
    status: data.status,
    createdAt: data.createdAt,
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
    setType(type);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateIssueDetail(issue);
    handleClose(e);
    console.log("SAVE", title, description, comments, priority, type, newComment)
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
        <div className="relative py-4 px-4 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="flow-root">
            <button
              onClick={(e) => handleSave(e)}
              type="button"
              className="float-right bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form className="mt-2">
            <div className="mb-2">
              <input
                type="text"
                value={title}
                id="name"
                className="w-full
                    block pr-3 pl-1 py-1 my-1
                    border-gray-300
                    rounded-md
                    text-black
                    text-2xl
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50"
                placeholder="Title"
                onChange={handleTitle}
              />
            </div>
            <div className="flex justify-start mt-2">
              <label
                for="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Issue Type: <TypeDropdown handleType={handleType} type={type} />
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
                  priority={priority}
                />
              </label>
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
            <div className="flex justify-start mt-1">
              <TeamMemberDropdown />
            </div>
            <div className="flex flex-col items-start my-2">
              <span className="text-gray-400">Description:</span>
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
              <div>
                <IssuePostComment setNewComment={setNewComment} />
              </div>
                {(comments.length > 0) ?
                  <div style={{ height: '200px', overflow: 'auto' }}>
                        {comments.map((data) => {
                          return (
                            < IssueCommentSection data={data}/>
                          )
                        })}
                  </div> : null
                }
              <br/>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateIssueForm;
