import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { createComment } from "../util/apiCalls";

export const IssuePostComment = ({ issueId, handleClose }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [text, setText] = useState("");

  const comment = {
    text: text,
    createdBy: currentUser,
  };

  /**
   * handlePost uses handleClose from UpdateIssueForm, which will clear selectedList and close
   * the modal without sending a post request to backend with the IssueDTO even iof any changes were made.
   */
  const handlePost = (e) => {
    e.preventDefault();
    createComment(comment, issueId);
    handleClose(e);
  };

  return (
    <div className="flex justify-start w-full">
      <div className="mx-1">
        <Avatar
          src={currentUser.avatarUrl}
          alt={currentUser.firstName}
          size={12}
        />
      </div>
      <div className="flex flex-col w-full items-start">
        <div>
          <p className="text-sky-400 font-semibold text-sm">
            {currentUser.firstName} {currentUser.lastName}
          </p>
        </div>
        <div className="w-full">
          <textarea
            name="message"
            className="block w-full mt-2 px-3 py-3 font-normal text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="4"
            placeholder="Write a comment"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        {text && (
          <div className="flex justify-end w-full">
            <button
              className="mt-3 h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
              onClick={(e) => handlePost(e)}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
