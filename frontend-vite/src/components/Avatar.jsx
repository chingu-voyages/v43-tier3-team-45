import React from "react";

const  Avatar = ({ src, alt, size }) => {
    return (
      <img
        className={`inline-block rounded-full w-${size} h-${size} border-2 border-blue-400 overflow-hidden`}
        src={src}
        alt={alt}
      />
    );
  }
  
  export default Avatar