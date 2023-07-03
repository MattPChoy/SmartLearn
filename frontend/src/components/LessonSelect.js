import { ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function LessonSelect({ lessons, course, offering }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
