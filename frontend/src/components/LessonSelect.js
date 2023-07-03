import { ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function LessonSelect({ course, offering }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getLessons?offering_id=${offering}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const resObj = await res.json();
        console.log(resObj);
        if (resObj.success === true) {
          setLessons(resObj.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [offering]);

  return loading ? (
    <Spinner />
  ) : (
    <ListGroup>
      {lessons.map((lesson) => (
        <ListGroup.Item
          key={lesson.lesson_num}
          action
          onClick={() =>
            location.pathname === "/admin"
              ? navigate(`${course}_${offering}/${lesson.lesson_num}`)
              : navigate(`${lesson.lesson_num}`)
          }
        >
          {lesson.blurb}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default LessonSelect;
