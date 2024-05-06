// Import necessary libraries and components
import { Route } from "react-router-dom";
import ParentProfile from "@/pages/Profiles/ParentProfile";
import HomeSchooling from "@/pages/HomeSchooling/HomeSchooling";
import TeacherProfileForStudent from "@/pages/Profiles/TeacherProfileForStudent";
import Explore from "@/pages/Explore";
import DashboardPage from "@/pages/Student/Dashboard";

// Define parent-specific routes as an array
export const parentRoutes = [
  <Route
    key="parent-profile"
    path="/profile/parent"
    element={<ParentProfile />}
  />,
  <Route path="/location" element={<HomeSchooling />} />,
  <Route path="/teacher/profile/:id" element={<TeacherProfileForStudent />} />,
  <Route path="/explore" element={<Explore />} />,
  <Route path='/student-dashboard' element={<DashboardPage/>} />,
  // Add more parent-specific routes here
];
