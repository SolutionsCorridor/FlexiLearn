import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuth = localStorage.getItem("isAuthenticated");
  console.log(isAuth);

  // If the user is already authenticated, redirect to the home page
  if (isAuth === "true") {
    return <Navigate to={`/home`} />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
