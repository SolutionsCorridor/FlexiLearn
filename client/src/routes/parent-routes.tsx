// Import necessary libraries and components
import { Route } from "react-router-dom";
import ParentProfile from "@/pages/Profiles/ParentProfile";

// Define parent-specific routes as an array
export const parentRoutes = [
  <Route
    key="parent-profile"
    path="/profile/parent"
    element={<ParentProfile />}
  />,
  // Add more parent-specific routes here
];
