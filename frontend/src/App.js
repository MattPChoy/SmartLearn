import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Course from "./pages/Course";
import CourseEnrol from "./pages/CourseEnrol";
import Admin from "./pages/Admin";
import EditLesson from "./pages/EditLesson";
import Wrapper from "./components/Wrapper";
import Lessons from "./pages/Lessons";
import Header from "./components/Header";
import { AuthProvider } from "./helper/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enrol" element={<CourseEnrol />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/:course_offering/:lessonId" element={<Course />} />
            <Route path="/:course_offering" element={<Lessons />} />
            <Route
              path="/admin/:course_offering/:lessonId"
              element={<EditLesson />}
            />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
