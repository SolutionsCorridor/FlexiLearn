// Import necessary libraries and components
import { Route } from "react-router-dom";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import UserProfiles from "@/pages/Admin/UserProfiles";

// Define parent-specific routes as an array
export const adminRoutes = [
    <Route
        key="admin-dashboard"
        path="/dashboard"
        element={<AdminDashboard />}
    />,
    <Route path="/:role/:id" element={<UserProfiles />} />,
    // <Route path="/teacher/profile/:id" element={<TeacherProfileForStudent />} />,
    // <Route path="/explore" element={<Explore />} />,
    // // Add more parent-specific routes here
];
