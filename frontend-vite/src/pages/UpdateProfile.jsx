import React, { useState, useEffect } from "react";
import Avatar from '../components/Avatar';

const UpdateProfile = ({ user, avatarSrc }) => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
console.log(profileData)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.patch('http://localhost:8080/api/users/641ba82f94ba927d1a1e932a', profileData);
      console.log(response.data);
      // add code to handle successful update
    } catch (error) {
      console.error(error);
      // add code to handle error
    }
  };
  avatarSrc =
    "https://gravatar.com/avatar/29348169ecc5b8d01ac28beb2c5a4a79?s=400&d=robohash&r=x";
  return (
    <>
      <h1 className="flex items-center justify-center text-2xl font-bold py-2">Account Settings</h1>
      <div className="flex items-center justify-center mb-1">
        <Avatar className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden"
          src={avatarSrc}
          alt={user}
        />
      </div>
      
      <form className=" w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" 
              type="text" 
              placeholder="Jane Doe"
              name="firstName"
              value={profileData.firstName}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
            />
            
            <p className="text-red-500 text-xs italic">First Name.</p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" 
              type="text" 
              placeholder="Jane Doe"
              name="lastName"
              value={profileData.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
            />
            
            <p className="text-red-500 text-xs italic">Last Name.</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Role
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-role" type="text" placeholder="Software Engineer"/>
          </div>
      </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email Address
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@domain.com"/>
          </div>
        </div>
    </form>
    <button
          className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
        >
          Submit
        </button>
    
</>
  );
};

export default UpdateProfile;