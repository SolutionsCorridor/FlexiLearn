// Import necessary libraries and components
import { Route } from "react-router-dom";
import StudentProfile from "@/pages/Profiles/StudentProfile";
import HomeSchooling from "@/pages/HomeSchooling/HomeSchooling";
import TeacherProfileForStudent from "@/pages/Profiles/TeacherProfileForStudent";
import Explore from "@/pages/Explore";
// Define student-specific routes as an array
export const studentRoutes = [
  <Route
    key="student-profile"
    path="/profile/student"
    element={<StudentProfile />}
  />,
  <Route path="/location" element={<HomeSchooling />} />,
  <Route path="/teacher/profile/:id" element={<TeacherProfileForStudent />} />,
  <Route path="/explore" element={<Explore />} />,
  // Add more student-specific routes here
];
