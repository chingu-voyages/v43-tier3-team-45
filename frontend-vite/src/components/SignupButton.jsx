import { useNavigate } from "react-router"

const SignupButton = () => {

    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        navigate('/register')
    }

    return (
        <div >
            <button 
            className=" bg-blue-400 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded mr-2 mt-8"
            onClick={handleSignup}>Sign Up</button>
        </div>
    )
}

export default SignupButton