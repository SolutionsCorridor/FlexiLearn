import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationPage from "@/features/Auth/auth-page";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting query parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get("userType");
  const allowedUserTypes = ["student", "teacher", "parent"];
  const isUserTypeAllowed =
    userType !== null && allowedUserTypes.includes(userType);

  useEffect(() => {
    if (!isUserTypeAllowed) {
      navigate("/register-cards"); // Redirect if the user type is not allowed
    }
  }, [isUserTypeAllowed, navigate]);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full p-5">
        <AuthenticationPage
          title="Sign Up"
          description="Enter your email below to create your account"
          value="Login"
          authFor="signup"
        />
      </div>
    </>
  );
};

export default SignUp;
