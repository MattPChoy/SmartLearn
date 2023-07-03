import { useState, useEffect } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import LessonSelect from "../components/LessonSelect";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../helper/AuthContext";

function Admin() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  const [selectedCourse, setSelectedCourse] = useState({
    name: null,
    lessons: [],
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/coordinatorCourses?coordinator_id=${currentUser}`
        );
        const data = await response.json();
        console.log(data);
        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCourses();
  }, [currentUser]);

  function CourseSelect({ courses }) {
    return (
      <ListGroup>
        {courses.map((course) => (
          <ListGroup.Item
            key={course.course_name}
            action
            variant="light"
            className={`item ${
              course.course_name === selectedCourse.course_name ? "active" : ""
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            {course.course_name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1>Admin</h1>
      <div className="Admin">
        <div className="course-select">
          <CourseSelect courses={courses} />
        </div>

        <div className="lesson-select-container">
          {selectedCourse.course_name !== null && (
            <div className="AddButton">
              <Fab variant="extended" color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
          )}
          <div className="lesson-select">
            {selectedCourse.course_name === null ? (
              <p>No course selected</p>
            ) : (
              <LessonSelect
                lessons={selectedCourse.lessons}
                course={selectedCourse.course_name}
                offering={selectedCourse.offering_id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
