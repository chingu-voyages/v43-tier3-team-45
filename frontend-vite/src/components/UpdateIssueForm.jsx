import { useDispatch, useSelector } from "react-redux";
import TypeDropdown from "./TypeDropdown.jsx";
import PriorityDropdown from "./PriorityDropdown.jsx";
import TeamMemberDropdown from "./TeamMemberDropdown.jsx";
import { useEffect, useState } from "react";
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

// data is the IssueDTO
const UpdateIssueForm = ({ onClose, data }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [comments, setComment] = useState(data.comments);
  const [priority, setPriority] = useState(data.priority);
  const [type, setType] = useState(data.issueType);
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

  // const handleComment = (e) => {
  //   e.preventDefault();
  //   setComment(e.target.value);
  // };

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
                  value={title}
                  name="name"
                  className="text-black"
                  placeholder="Title"
                  onChange={handleTitle}
                />
              </label>
            </div>
            <div>
              <TypeDropdown handleType={handleType} type={type} />
            </div>
            <div>
              <PriorityDropdown
                handlePriority={handlePriority}
                priority={priority}
              />
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
              <div>
                {comments.map((data) => {
                  return (
                    < IssueCommentSection data={data}/>
                  )
                })}
              </div>  
              {/* <div className="mb-2">
                <label>
                  <span class="text-gray-400">Comment</span>
                  <textarea
                    name="message"
                    // value={comment}
                    // move this to another component
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
                    onChange={handleComment}
                  ></textarea>
                </label>
              </div> */}
            <IssuePostComment />
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

            <div className="mb-6">
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

export default UpdateIssueForm;
