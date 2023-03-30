import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/authReducer';

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const creds = {
        "email": email,
        "password": password
    }
  
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleAPI = (e) => {
        e.preventDefault();
        dispatch(loginUser(creds));
        // add the async thunk action here
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
        
            {/* <button onClick={handleSubmit}>Log in</button> */}
            <button onClick={handleAPI}>API Call</button>
        </form>
    )

}

export default LoginForm