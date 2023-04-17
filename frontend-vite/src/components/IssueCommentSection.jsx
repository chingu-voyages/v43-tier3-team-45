import React from "react";
import Avatar from "./Avatar";

export const IssueCommentSection = ({ data, key }) => {
  const user = data.createdBy;
  const comment = data.text;
  const timestamp = new Date(data.createdAt);
  const localTime = timestamp.toLocaleString();

  return (
    <div className="flex w-full justify-start my-2" key={key}>
      <div className="mx-1">
        <Avatar src={user.avatarUrl} alt={user.firstName} size={12} />
      </div>
      <div className="flex flex-col w-full items-start">
        <div className="flex justify-between w-full items-center">
          <p className="text-sky-400 text-sm">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-400 ml-3">{localTime}</p>
        </div>
        <div>
          <p className="text-sm text-start font-medium">{comment}</p>
        </div>
      </div>
    </div>
  );
};
