// Import necessary libraries and components
import { Route } from "react-router-dom";
import TeacherProfile from "@/pages/Profiles/TeacherProfile";
import Assessment from "@/pages/Teacher/Assessment/Assessment";
import Quiz from "@/pages/Teacher/Assessment/Quiz";
import TeacherMeeting from "@/pages/Meeting";
import TeacherPending from "@/pages/Teacher/TeacherPending";

// Define student-specific routes as an array
export const teacherRoutes = [
  <Route
    key="student-profile"
    path="/profile/teacher"
    element={<TeacherProfile />}
  />,
  <Route path="/teacher/assessment/" element={<Assessment />} />,
  <Route path="/teacher/assessment/quiz/:quizId" element={<Quiz />} />,
  <Route path="/teacher/meeting" element={<TeacherMeeting />} />,
  <Route path="/teacher/pending" element={<TeacherPending />} />

  // Add more student-specific routes here
];
