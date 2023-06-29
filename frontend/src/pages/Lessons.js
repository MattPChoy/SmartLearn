import LessonSelect from "../components/LessonSelect";
import { useParams } from "react-router-dom";

function Lessons() {
  const { course } = useParams();

  return (
    <LessonSelect
      course={course}
      lessons={[
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
      ]}
    />
  );
}

export default Lessons;
