import React from "react";
import AutoComplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Button, Spinner } from "react-bootstrap";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../helper/AuthContext";
import DataTable from "../components/DataTable";

function CourseEnrol() {
  const { currentUser } = useAuth();

  const [courseShow, setCourseShow] = useState(false);
  const [semShow, setSemShow] = useState(false);
  const [courseConfirmationShow, setCourseConfirmationShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [foo, setfoo] = useState(0);
  const sid = 1;

  const closeInvalidSem = () => setSemShow(false);
  const showInvalidSem = () => setSemShow(true);
  const closeInvalidCourse = () => setCourseShow(false);
  const showInvalidCourse = () => setCourseShow(true);
  const closeCourseConfirmation = () => setCourseConfirmationShow(false);
  const courseUnenrol = () => {
    setCourseConfirmationShow(false);
    // unenrol in back end
  };
  const showCourseConfirmation = () => setCourseConfirmationShow(true);

  /* handle form control change message*/
  const handleChange = (event) => {};

  /** Invalid course pop up message*/
  function InvalidCourse() {
    return (
      <Modal show={courseShow} onHide={closeInvalidCourse}>
        <Modal.Header showButton>
          <Modal.Title>Course does not exist!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please select an existing course</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInvalidCourse}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /** Invalid semester pop up message*/
  function InvalidSemester() {
    return (
      <Modal show={semShow} onHide={closeInvalidSem}>
        <Modal.Header showButton>
          <Modal.Title>Invalid semester!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please select a value semester</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInvalidSem}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /** Course confirmation pop up*/
  function CourseConfirmation() {
    return (
      <Modal show={courseConfirmationShow} onHide={closeCourseConfirmation}>
        <Modal.Header showButton>
          <Modal.Title>Course Enrolled!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully enrolled in the course</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={courseUnenrol}>
            Unenrol
          </Button>
          <Button variant="primary" onClick={closeCourseConfirmation}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function getAvaliableSemesters(course) {}

  function getSelectedDict() {
    console.log("enrollment successful");
    courses
      .filter((course) => course.course_name === selectedCourse)
      .map((course) => {
        return setEnrolled([...enrolled, course]);
      });
  }

  function currentlyEnrolled() {
    try {
      const sid = 1;
      fetch(`http://localhost:5000/api/currentlyEnrolled?student_id=${sid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) {
            console.log(res.data);
          } else {
            console.log(res.reason);
          }
        });
    } catch (e) {}
  }

  /** Submit button event and error handle*/
  const handleSubmit = async () => {
    if (
      courses.filter((course) => course.course_name === selectedCourse)
        .length === 0 ||
      selectedSemester === ""
    ) {
      showInvalidCourse();
    } else {
      try {
        fetch(`http://localhost:5000/api/enrol`, {
          method: "POST",
          body: JSON.stringify({
            semester: selectedSemester,
            course_name: selectedCourse,
            year: selectedYear,
            student_id: sid,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.success === true) {
              getSelectedDict();
              setfoo(foo + 1);
              currentlyEnrolled();
              setSelectedCourse("");
            } else {
              console.log(res.reason);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Get data from database
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/availableCourses?student_id=${sid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const resObj = await res.json();
        if (resObj.success === true) {
          setCourses(resObj.data);
          setLoading(false);
          // console.log(resObj.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [foo]);

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  /** Create page components */
  return loading ? (
    <Spinner />
  ) : (
    <div className="w-25">
      <h1>Course Enrol</h1>
      <InvalidCourse />
      <InvalidSemester />
      {/* <CourseConfirmation /> */}
      <AutoComplete
        className="w-100"
        disablePortal
        id="combo-box-demo"
        options={(courses.map((course) => course.course_name)).filter(onlyUnique)}
        value={selectedCourse}
        onInputChange={(e, n) => setSelectedCourse(n)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Course" />
        )}
      />
      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${selectedSemester}:${selectedYear}`}
          label="Semester"
          onChange={(e) => {
            const [sem, year] = e.target.value.split(":");
            setSelectedSemester(sem);
            setSelectedYear(year);
            // console.log(selectedSemester)
          }}
        >
          {courses
            .filter((course) => course.course_name === selectedCourse)
            .map((course) => {
              const semester = {
                semester: course.semester,
                year: course.year,
              };
              return semester;
            })
            .map((sem, index) => (
              <MenuItem key={index} value={`${sem.semester}:${sem.year}`}>
                {`Semester ${sem.semester} ${sem.year}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Button className="btn btn-primary w-100" onClick={handleSubmit}>
        Kiss Shakes
      </Button>
      <br />
      <br />
      <DataTable data={enrolled} />
    </div>
  );
}

export default CourseEnrol;
