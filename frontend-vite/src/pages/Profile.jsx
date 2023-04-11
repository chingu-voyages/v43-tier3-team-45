import React, { useState, useEffect, Fragment } from "react";
import Avatar from "../components/Avatar";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  return (
    <Fragment>
      <Fragment>
        <div className="flex items-center justify-center mb-1">
          <Avatar
            size={14}
            src={currentUser.avatarUrl}
            alt="avatar"
          />
        </div>
        <h1 className="text-xl font-bold py-2">{currentUser.firstName}</h1>
        <h1 className="text-xl font-bold py-2">{currentUser.lastName}</h1>
        <p className="text-lg py-2">{currentUser.role}</p>
      </Fragment>
      <hr />
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg py-2">{currentUser.email}</p>
        <button
          className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
          onClick={() => {navigate("/profile/update")}}
        >
          Edit Profile
        </button>
      </div>
    </Fragment>
  );
};

export default Profile;
