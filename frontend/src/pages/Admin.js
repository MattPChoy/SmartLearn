import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import LessonSelect from "../components/LessonSelect";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const temp_courses = [
  {
    code: "COMP3506",
    name: "Data Structures and Algorithms",
    coordinator: "John",
    lessons: [
      { name: "Lecture 1", id: 1 },
      { name: "Lecture 2", id: 2 },
      { name: "Lecture 1", id: 3 },
      { name: "Lecture 2", id: 4 },
      { name: "Lecture 1", id: 5 },
      { name: "Lecture 2", id: 6 },
      { name: "Lecture 1", id: 7 },
      { name: "Lecture 2", id: 8 },
      { name: "Lecture 1", id: 9 },
      { name: "Lecture 2", id: 10 },
      { name: "Lecture 1", id: 11 },
      { name: "Lecture 2", id: 12 },
      { name: "Lecture 1", id: 13 },
      { name: "Lecture 2", id: 14 },
    ],
  },
  {
    code: "COMP3702",
    name: "Artificial Intelligence",
    coordinator: "Steve",
    lessons: [
      { name: "asdf 1", id: 1 },
      { name: "Lesadfre 2", id: 2 },
    ],
  },
];

function Admin() {
  const [selectedCourse, setSelectedCourse] = useState({
    code: null,
    lessons: [],
  });

  function CourseSelect({ courses }) {
    return (
      <ListGroup>
        {courses.map((course) => (
          <ListGroup.Item
            key={course.code}
            action
            variant="light"
            className={`item ${
              course.code === selectedCourse.code ? "active" : ""
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            {course.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return (
    <>
      <h1>Admin</h1>
      <div className="Admin">
        <div className="course-select">
          <CourseSelect courses={temp_courses} />
        </div>

        <div className="lesson-select-container">
          {selectedCourse.code !== null && (
            <div className="AddButton">
              <Fab variant="extended" color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
          )}
          <div className="lesson-select">
            {selectedCourse.code === null ? (
              <p>No course selected</p>
            ) : (
              <LessonSelect
                lessons={selectedCourse.lessons}
                course={selectedCourse.code}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
