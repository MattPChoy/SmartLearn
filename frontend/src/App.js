import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Course from "./pages/Course";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="*" element={<h1>dick Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
