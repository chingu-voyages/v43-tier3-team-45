import React from "react";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setUserFirstName, setUserLastName } from "../store/userReducer";
import {
  updateUserProfile,
  updateUserProfileImage,
} from "../store/userReducer";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(user));
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    dispatch(updateUserProfileImage(formData));
  };

  return (
    <>
      <h1 className="flex items-center justify-center text-2xl font-bold py-2 mt-24">
        Account Settings
      </h1>
      <div className="flex items-center justify-center mb-10 mt-5">
        <Avatar
          className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden"
          src={user.avatarUrl}
          alt={"user"}
        />
      </div>
      <input
        className="mb-10 justify-center"
        type="file"
        name="profileImage"
        accept=".png,.jpg,.jpeg"
        onChange={(e) => handleImageUpdate(e)}
      />

      <form className="flex justify-center" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane Doe"
              name="firstName"
              value={user.firstName}
              onChange={(e) => dispatch(setUserFirstName(e.target.value))}
            />

            <p className="text-red-500 text-xs italic">First Name.</p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane Doe"
              name="lastName"
              value={user.lastName}
              onChange={(e) => dispatch(setUserLastName(e.target.value))}
            />

            <p className="text-red-500 text-xs italic">Last Name.</p>
          </div>
        </div>
      </form>
      <button
        className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </>
  );
};

export default UpdateProfile;
