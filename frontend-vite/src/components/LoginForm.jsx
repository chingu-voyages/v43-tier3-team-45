import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addEmail, addPassword, selectUser } from '../store/userReducer'
import { setToken, logoutToken, selectToken, loginUser} from '../store/authReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

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

    // const handleThunk = (e) => {
    //     e.preventDefault()
    //     dispatch(loginUser())
    // };

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
        </form>
    )

}

export default LoginForm