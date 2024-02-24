// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  roles: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated") || "false");
  const userRole = localStorage.getItem("userType");

  if (!isAuth) {
    return <Navigate to={`/login`} />;
  } else if (roles !== userRole) {
    return <Navigate to={`/`} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
