import React from "react";

const  Avatar = ({ src, alt }) => {
    return (
      <img
        className="inline-block w-40 h-40 rounded-full border-2 border-blue-400 overflow-hidden"
        src={src}
        alt={alt}
      />
    );
  }
  
  export default Avatar