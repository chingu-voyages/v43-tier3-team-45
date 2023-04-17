const TypeDropdown = (props) => {
  let handleType = props.handleType;

  const listener = (e) => {
    e.preventDefault();
    handleType(e.target.value);
  };

  return (
      <select
        className="w-half text-sm font-bold bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        onChange={listener}
      >
        {/* <option>Type:</option> */}
        <option>BUG</option>
        <option>TASK</option>
      </select>
  );
};

export default TypeDropdown;
