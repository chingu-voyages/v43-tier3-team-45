import LoginForm from "../components/LoginForm";
import SignUp from "../components/Signup";

function Login() {
  return (
    <div>
      <h1>Sign Up:</h1>
      <SignUp />
      <h2>Already have an account? Sign in below:</h2>
      <LoginForm />
    </div>
  );
}

export default Login;