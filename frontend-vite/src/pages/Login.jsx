import LoginForm from "../components/LoginForm";
import SignupButton from "../components/SignupButton";

function Login() {
  return (
    <div className="flex justify-center">
    <form className="w-full max-w-md">
       <div className="flex flex-col">
        <br/>
        <br/>
        <LoginForm />
        <br/>
        <SignupButton />
      </div>
    </form>
    </div>
  );
}

export default Login;