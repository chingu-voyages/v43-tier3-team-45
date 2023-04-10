import { useNavigate } from "react-router"

const SignupButton = () => {

    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        navigate('/register')
    }

    return (
        <div>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    )
}

export default SignupButton