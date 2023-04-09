import React from "react";

const  Avatar = ({ src, alt, size }) => {

  // let avatarSize;
  // if(size == "small"){
  //   avatarSize = 20;
  // } else if(size == "medium"){
  //   avatarSize = 30;
  // } else {
  //   avatarSize = 40;
  // };
    return (
      <img
        className={`inline-block w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden`}
        src={src}
        alt={alt}
      />
    );
  }
  
  export default Avatar