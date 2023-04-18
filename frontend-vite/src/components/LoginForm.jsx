import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authReducer";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

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
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-4xl font-bold mb-20 text-center">
        Welcome to Chingu Board
      </h1>
      <form className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-5 w-1/2 lg:w-1/3">
            <label className="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mt-3 mb-2">
              <span>Email: </span>
            </label>
            <input
              className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="example@domain.com"
              name="email"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-5 w-1/2 lg:w-1/3">
            <label className="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mt-3 mb-2">
              <span>Password: </span>
            </label>
            <input
              className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              name="name"
              placeholder="********"
              onChange={handlePassword}
            />
          </div>
          <button
            className=" bg-[#16558f54] hover:bg-indigo-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={handleLogin}
            disabled={status === "loading"}
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-1">Invalid credentials</p>}
          <div className="mt-5 flex">
            <p>Don't have an account? </p>
            <Link className="ml-2 underline" to="/register">
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
