import AuthenticationPage from "@/features/Auth/auth-page";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full p-5">
        <AuthenticationPage
          title="Login"
          description="Enter your email to login to your account"
          value="Signup"
          authFor="login"
        />
      </div>
    </>
  );
};

export default Login;
