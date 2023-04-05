import React, { useState, useEffect, Fragment } from "react";
import Avatar from "../components/Avatar";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const handleUpdateProfileClick = () => {
    setShowUpdateProfile(true);
    console.log("edit button clicked");
  };
  return (
    <Fragment>
      <Fragment>
        <Avatar className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden">
          src={currentUser.avatarUrl}
          alt="avatar"
        </Avatar>
        <h1 className="text-xl font-bold py-2">{currentUser.firstName}</h1>
        <h1 className="text-xl font-bold py-2">{currentUser.lastName}</h1>
        <p className="text-lg py-2">{currentUser.role}</p>
      </Fragment>
      <hr />
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg py-2">{currentUser.email}</p>
        <button
          className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
          onClick={handleUpdateProfileClick}
        >
          Edit Profile
        </button>
        {showUpdateProfile ? <UpdateProfile /> : null}
      </div>
    </Fragment>
  );
};

export default Profile;
