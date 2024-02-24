
import { Route } from "react-router-dom";
import RegisterCards from "@/pages/Auth/register-cards";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/Signup";


export const authRoutes = [
  <Route key="register-cards" path="/register-cards" element={<RegisterCards />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />,
];

// Do similarly for student-routes.js and teacher-routes.js
