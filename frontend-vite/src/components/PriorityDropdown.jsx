import React from "react";

const PriorityDropdown = (props) => {
  let handlePriority = props.handlePriority;
  let priority = props.priority;

  const listener = (e) => {
    e.preventDefault();
    handlePriority(e.target.value);
  };

  return (
    <select
      className="w-half text-sm font-bold ml-1 p-1 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
      onChange={(e) => listener(e)}
      defaultValue={priority}
    >
      <option> LOW</option>
      <option> MODERATE</option>
      <option> HIGH</option>
      <option> CRITICAL</option>
    </select>
  );
};

export default PriorityDropdown;
