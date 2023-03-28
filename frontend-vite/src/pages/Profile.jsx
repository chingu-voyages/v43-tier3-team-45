import React, { useState, useEffect } from "react";
import Avatar from '../components/Avatar';
import UpdateProfile from './UpdateProfile';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
      const data = await axios.get("/api/users/641ba82f94ba927d1a1e932a");
      console.log(data)
    }

    useEffect(() => {
      fetchUser().then((response) => setUser(response.data))
      // make sure to catch any error
      .catch(console.error);
    }, []);
  
    //const { firstName, lastName, role, email } = user 
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    const avatarSrc="https://gravatar.com/avatar/29348169ecc5b8d01ac28beb2c5a4a79?s=400&d=robohash&r=x"
    
    const handleUpdateProfileClick = () => {
      setShowUpdateProfile(true);
      console.log("edit button clicked")
    };
  return (
    <>
      <div className="items-center justify-center">
          <Avatar className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden"
            src={avatarSrc}
            alt="avatar"
          />
          <h1 className="text-xl font-bold py-2">{firstName}</h1>
          <h1 className="text-xl font-bold py-2">{lastName}</h1>
          <p className="text-lg py-2">{role}</p>
      </div>
      <hr />
      <div>
        <p className="text-lg py-2">{email}</p>
      </div> 
        <button className="bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8" onClick={handleUpdateProfileClick}>
          Edit Profile
        </button>
        {showUpdateProfile ? <UpdateProfile /> : null}
        
    </>
  );
};

export default Profile;