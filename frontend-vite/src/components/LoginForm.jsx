import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

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
      <label>
        Email:
        <input type="text" name="name" onChange={handleEmail} />
      </label>

      <label>
        Password:
        <input type="text" name="name" onChange={handlePassword} />
      </label>

      {/* <button onClick={handleSubmit}>Log in</button> */}
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};

export default LoginForm;
