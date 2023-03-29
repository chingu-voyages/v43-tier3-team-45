import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addEmail, addPassword, setToken} from '../store/userReducer';
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const creds = {
        "email": email,
        "password": password
    }

    const BASE_URL = "http://localhost:8080/api"; // URL for AWS EBS dev deployment
    // Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com/api
  
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
    });
  
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
  
   const loginUser = createAsyncThunk(
        'auth/loginUser',
        async (creds, thunkAPI) => {
          try {
            const response = await axiosInstance.post(`/auth/login`, creds, {dispatch});
            thunkAPI.dispatch(setToken(response.data.token));
            console.log("token success", response)
          } catch (error) {
            console.log("error", error)
            return thunkAPI.rejectWithValue(error.response.data);
          }
        }
    );
  
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPassword(password));
        dispatch(addEmail(email));
    };

    const handleAPI = (e) => {
        e.preventDefault();
        dispatch(loginUser(creds))
          .then((result) => {
            console.log('API success', result);
          })
          .catch((error) => {
            console.log('API error', error);
          });
      }


    return (
        <form >
            <label>
                Email:
                <input type="text" name="name" onChange={handleEmail}/>
            </label>
                
            <label>
                Password:
                <input type="text" name="name" onChange={handlePassword}/>
            </label>
        
            <button onClick={handleSubmit}>Log in</button>
            <button onClick={handleAPI}>API Call</button>
        </form>
    )

}

export default LoginForm