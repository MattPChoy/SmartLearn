import LessonSelect from "../components/LessonSelect";
import { useParams } from "react-router-dom";

function Lessons() {
  const { course_offering } = useParams();

  const [course, offering] = course_offering.split("_");

  return <LessonSelect offering={offering} course={course} />;
}

export default Lessons;
