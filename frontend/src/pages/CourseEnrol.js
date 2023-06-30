import React from "react";
import AutoComplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
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
  // const courses = [];
  const semesters = [1, 2, 3];
  const year = 2023;

  const [semester, setSem] = useState("");
  const [course, setCourse] = useState("");
  const [courseShow, setCourseShow] = useState(false);
  const [semShow, setSemShow] = useState(false);
  const [courseConfirmationShow, setCourseConfirmationShow] = useState(false);
  const [courses, setCourses] = useState([])
  const [coursesDicts, setCourseDicts] = useState([])
  const [enrolled, setEnrolled] = useState([])

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
  const handleChange = (event) => {
    setSem(event.target.value);
  };

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

  /* Submit button event and error handle*/
  const handleSubmit = () => {
    if (!courses.includes(course)) {
      showInvalidCourse();
    } else if (semester.length === 0) {
      showInvalidSem();
    } else {
      showCourseConfirmation()
      // getAvailableCourses(currentUser)  
      if(courses.includes(course)) {
        setEnrolled([...enrolled, coursesDicts.find(dict=>{
          return dict.course_name === course
        })]
        )
        console.log(enrolled)
        // coursesDicts.map((courseDict)=> {
        //   if (courseDict.course_name===course) {
        //     // enrolled.push(courseDict)
        //     // console.log(enrolled)
        //     setEnrolled(...courseDict)
        //     console.log(enrolled)
        //     return courseDict
        //   } else {
        //     return 'Error'
        //   }
        // })
      }  
    }
  } 
 
  /** fetching course details */
  function getAvailableCourses(student_id) {
    fetch(`http://localhost:5000/api/availableCourses?id=${student_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()).then((data) => {
      if (data.success === true) {
        setCourseDicts(data.data)       
        setCourses(data.data.map((courseList)=>{          
          return(courseList.course_name)       
        }))
      } else {
        console.log("Request failed")
      }
    })
  }

  /**Render th courses */
  useEffect(() => {
    getAvailableCourses(1)
  }, [])

  /**Create page components */
  return (    
    <div className="w-25">
      <h1>Course Enrol</h1>
      <InvalidCourse />
      <InvalidSemester />
      {/* <CourseConfirmation /> */}
      <AutoComplete
        className="w-100"
        disablePortal
        id="combo-box-demo"
        options={courses}
        value={course}
        onInputChange={(_, newValue) => setCourse(newValue)}
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
          value={semester}
          label="Semester"
          onChange={handleChange}
        >
          {semesters.map((semester, index) => (
            <MenuItem key={index} value={`${year}; ${semester}`}>
              {`Semester ${semester}; ${year}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />

      <Button
        className="btn btn-dark w-100"
        onClick={async () => await handleSubmit()}
      >
        Sign away your life
      </Button> 
      <br />
      <br />
      <DataTable  data={enrolled}/>
    </div>
  );
}

export default CourseEnrol;
