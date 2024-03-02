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
import TeacherProfileForStudent from "./pages/Profiles/TeacherProfileForStudent";
import Assessment from "./pages/Teacher/Assessment/Assessment";
import Quiz from "./pages/Teacher/Assessment/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/location" element={<HomeSchooling />} />
        <Route path="/teacher/profile/:id" element={<TeacherProfileForStudent />} />
        <Route path="/teacher/assessment/" element={<Assessment />} />
        <Route path="/teacher/assessment/quiz/:quizId" element={<Quiz />} />
        <Route path="/home" element={<Home />} />

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
