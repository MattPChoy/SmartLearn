import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Course from "./pages/Course";
import CourseEnrol from "./pages/CourseEnrol";
import Admin from "./pages/Admin";
import EditLesson from "./pages/EditLesson";
import { AuthProvider } from "./helper/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enrol" element={<CourseEnrol />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/admin/:courseId/:lessonId" element={<EditLesson />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
