import React from "react";

const Avatar = ({ src, alt, size }) => {
  return (
    <img
      className={`inline-block w-${size} h-${12} rounded-full border-2 border-blue-400 overflow-hidden`}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
