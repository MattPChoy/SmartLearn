import { useEffect, useState } from "react";
import Header from "../components/Header";
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
          const resObj = res.json();
          if (resObj.success === true) {
            setCourses(resObj.data);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          console.warn(e);
        }
      }
    }

    fetchData();
  }, [currentUser, navigate]);

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
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {courses.map((course) => (
            <CourseCard
              key={course.code}
              code={course.code}
              name={course.name}
              coordinator={course.coordinator}
            />
          ))}
        </Container>
      )}
    </>
  );
}

export default Home;
