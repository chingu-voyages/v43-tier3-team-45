import React from "react";

const Avatar = ({ src, alt, size }) => {
  return (
      <img
        className={`inline w-${size} h-${size} rounded-full border-2 border-blue-400 overflow-hidden`}
        src={src}
        alt={alt}
      />
  );
};
export default Avatar;
