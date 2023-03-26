import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUserId, addEmail, addFirstName, addLastName, addRole } from '../store/userSlice'

const LoginForm = () => {
    const dispatch = useDispatch()
    // call to backend

    return (
        <div>
            {/* form */}
        </div>
    )

}

export default LoginForm