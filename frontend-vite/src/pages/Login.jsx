import LoginForm from "../components/LoginForm";
import SignupButton from "../components/SignupButton";

function Login() {
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-md">
       <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="h-full">
            <img
              className="h-full"
              src="https://chinguboard-dev.s3.us-east-2.amazonaws.com/kanban.jpg"
              alt="kanban"
            />
            </div>
            <div className="flex flex-col">
            <br/>
            <div className="flex flex-col justify-center items-center h-full">
              <LoginForm />
              <br/>
              <SignupButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
