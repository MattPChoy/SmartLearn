import { ListGroup } from "react-bootstrap";
import { removeSlashSuffix } from "../helper/misc";
import { useLocation, useNavigate } from "react-router-dom";

function LessonSelect({ lessons, course }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ListGroup>
      {lessons.map((lesson) => (
        <ListGroup.Item
          key={lesson.id}
          action
          onClick={() =>
            navigate(
              `${removeSlashSuffix(location.pathname)}/${course}/${lesson.id}`
            )
          }
        >
          {lesson.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default LessonSelect;
