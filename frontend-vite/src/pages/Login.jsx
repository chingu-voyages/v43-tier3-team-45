import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="h-full">
        <img
          className="h-full"
          src="https://chinguboard-dev.s3.us-east-2.amazonaws.com/kanban.jpg"
          alt="kanban"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;