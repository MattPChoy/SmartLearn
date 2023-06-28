import React from "react";
import Header from "../components/Header";
import { Accordion, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";

const temp_courses = [
  {
    code: "COMP3506",
    name: "Data Structures and Algorithms",
    coordinator: "John",
  },
  {
    code: "COMP3702",
    name: "Artificial Intelligence",
    coordinator: "Steve",
  },
  {
    code: "DECO3801",
    name: "Design Studio 3: Build",
    coordinator: "Bob",
  },
  {
    code: "MATH2100",
    name: "Applied Mathematical Analysis",
    coordinator: "Mary",
  },
];

function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  function CourseCard({ code, name, coordinator }) {
    return (
      <div className="CourseCard">
        <Accordion defaultActiveKey={code}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{code}</Accordion.Header>
            <Accordion.Body>
              <div>
                <h3>{name}</h3>
                <div className="CourseDescription">
                  <h6>{coordinator}</h6>
                  <Link to={`/courses/${code}`}>View</Link>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        {temp_courses.map((course) => (
          <CourseCard
            key={course.code}
            code={course.code}
            name={course.name}
            coordinator={course.coordinator}
          />
        ))}
      </Container>
    </>
  );
}

export default Home;
