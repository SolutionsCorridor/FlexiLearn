// Import necessary libraries and components
import { Route } from "react-router-dom";
import StudentProfile from "@/pages/Profiles/StudentProfile";

// Define student-specific routes as an array
export const studentRoutes = [
  <Route
    key="student-profile"
    path="/profile/student"
    element={<StudentProfile />}
  />,
  // Add more student-specific routes here
];
