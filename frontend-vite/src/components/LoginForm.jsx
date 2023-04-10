import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const creds = {
    email: email,
    password: password,
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(creds))
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
        Email:
        <input 
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="email"
        placeholder="example@domain.com"
        name="email"
        onChange={handleEmail} />
      </label>

      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-2">
        Password:
        <input 
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="password"
        placeholder="******************"
        name="password"
        onChange={handlePassword} />
      </label>

      {/* <button onClick={handleSubmit}>Log in</button> */}
      <button 
        className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
        onClick={handleLogin}>Login</button>
    </form>
  );
};

export default LoginForm;
