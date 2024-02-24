// Import necessary libraries and components
import { Route } from "react-router-dom";
import TeacherProfile from "@/pages/Profiles/TeacherProfile";

// Define student-specific routes as an array
export const teacherRoutes = [
  <Route
    key="student-profile"
    path="/profile/teacher"
    element={<TeacherProfile />}
  />,

  // Add more student-specific routes here
];
