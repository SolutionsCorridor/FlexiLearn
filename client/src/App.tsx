import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/layouts/Layout";
import { authRoutes } from "@/routes/auth-routes";
import { studentRoutes } from "@/routes/student-routes";
import { teacherRoutes } from "@/routes/teacher-routes";
import PublicRoute from "@/routes/public-route";
import ProtectedRoute from "@/routes/protect-route";
import { parentRoutes } from "./routes/parent-routes";
import HomeSchooling from "./pages/HomeSchooling/HomeSchooling";

function App() {
  return (
      
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/location" element={<HomeSchooling />} />

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>{authRoutes}</Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute roles="student" />}>
          {studentRoutes}
        </Route>

        {/* Teacher Routes */}
        <Route element={<ProtectedRoute roles="teacher" />}>
          {teacherRoutes}
        </Route>

        {/* Parent Routes */}
        <Route element={<ProtectedRoute roles="parent" />}>
          {parentRoutes}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
