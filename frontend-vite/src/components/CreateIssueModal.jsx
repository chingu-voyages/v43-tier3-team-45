import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import { useState, useEffect } from "react";
import { createNewIssue } from "../store/projectReducer.js";
import Avatar from "./Avatar.jsx";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import {
  addMemberToSelectedList,
  clearSelectedList,
  removeMemberFromSelectedList,
  setFilteredList,
} from "../store/teamReducer.js";

const CreateIssueModal = ({ onClose }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [comment, setComment] = useState();
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedList = useSelector((state) => state.team.selectedList);
  const members = useSelector((state) => state.team.currentTeam.members);

  const handleClick = (e, member) => {
    e.preventDefault();
    dispatch(removeMemberFromSelectedList(member));
  };

  const testIssue = {
    title: title,
    description: description,
    assignees: members.filter((member) => selectedList.includes(member.id)),
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
    e.preventDefault();
    dispatch(createNewIssue(testIssue));
    handleClose(e);
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearSelectedList());
    dispatch(setFilteredList());
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form className="mt-6">
            <div className="mb-2">
              <label>
                <span className="text-gray-700">
                  {useSelector((state) => state.user.email)}
                </span>
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
              <PriorityDropdown handlePriority={handlePriority} />
            </div>
            <div>
              <p>Assigned to: </p>
              {selectedList.map((member) => (
                <button onClick={(e) => handleClick(e, member)}>
                  <Avatar
                    src={member.avatarUrl}
                    alt={member.firstName}
                    size={12}
                  />
                </button>
              ))}
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
                onClick={(e) => handleClose(e)}
              >
                Cancel
              </button>
            </div>

            <div></div>
          </form>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateIssueModal;
