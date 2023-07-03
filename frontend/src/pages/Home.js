import { useEffect, useState } from "react";
import { Accordion, Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";

function Home() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (currentUser === null) {
        navigate("/login");
      } else {
        try {
          const res = await fetch(
            `http://localhost:5000/api/currentlyEnrolled?student_id=${currentUser}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(res);
          const resObj = await res.json();
          console.log(resObj);
          if (resObj.success === true) {
            setCourses(resObj.data);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchData();
  }, [currentUser, navigate]);

  function CourseCard({ code, name, coordinator, offering }) {
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
                  <Link to={`/${code}_${offering}`}>View</Link>
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
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {courses.map((course) => (
            <CourseCard
              key={course.course_name}
              code={course.course_name}
              name={course.course_desc}
              coordinator={
                course.coordinator_firstname + " " + course.coordinator_lastname
              }
              offering={course.offering_id}
            />
          ))}
        </Container>
      )}
    </>
  );
}

export default Home;
