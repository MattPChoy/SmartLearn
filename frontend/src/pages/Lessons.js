import LessonSelect from "../components/LessonSelect";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

function Lessons() {
  const { course_offering } = useParams();

  const [course, offering] = course_offering.split("_");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Lessons - ${course}`;
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
  }, [course, offering]);

  return loading ? (
    <Spinner />
  ) : (
    <LessonSelect offering={offering} course={course} lessons={lessons} />
  );
}

export default Lessons;
