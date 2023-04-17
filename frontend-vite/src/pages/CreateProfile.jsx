import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/authReducer";
import { useNavigate } from "react-router";

function CreateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("profileImage", profileImage);
    dispatch(createUser(data)).then(() => navigate("/home"));
  };

  return (
    <div className="mt-4">
      <h1 className="text-center text-4xl block uppercase tracking-wide ">
        Register an Account
      </h1>
      <div className="flex justify-center">
        <form className="w-full max-w-md" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col mt-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Choose Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Jane"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Doe"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
              Email Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="example@domain.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic mb-10">
              Enter at least twelve characters with a mix of upper and lower
              case letters
            </p>
            <button
              className="bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8 mb-10"
              disabled={!firstName || !lastName || !password || !email}
            >
              Submit
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateProfile;
