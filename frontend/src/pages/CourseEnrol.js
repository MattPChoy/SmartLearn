import React from "react";
import AutoComplete from '@mui/material/Autocomplete'
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Headers from "../components/Header";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function CourseEnrol() {
  const courses = ['DECO2500', 'ELEC2301', 'MATH6969']
  const semesters = [1,2,3]
  const year = 2023;

  const [semester, setSem] = useState('');
  const [course, setCourse] = useState('');
  const [courseShow, setCourseShow] = useState(false);
  const [semShow, setSemShow] = useState(false);
  const [courseConfirmationShow, setCourseConfirmationShow] = useState(false);

  const closeInvalidSem = () => setSemShow(false);
  const showInvalidSem = () => setSemShow(true);
  const closeInvalidCourse = () => setCourseShow(false);
  const showInvalidCourse = () => setCourseShow(true);
  const closeCourseConfirmation = () => setCourseConfirmationShow(false)
  const courseUnenrol = () => {
    setCourseConfirmationShow(false)
    // unenrol in back end
  }
  const showCourseConfirmation = () => setCourseConfirmationShow(true)

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
    )
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
    )
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
    )
  }

  function CourseTable () {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Title</th>
            <th>Course Coordinator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>c1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  /* Submit button event and error handle*/
  const handleSubmit = () => {   
    if(!courses.includes(course)) {
      showInvalidCourse()
    } else if(semester.length===0){
      console.log(semester.length)
      showInvalidSem()
    } else {
      const semNo = semester.split(';')[1]
      // fetch("http://localhost:5000/api/enrol", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     courseID: course,
      //     semNo: semNo,
      //     year: year
      //   }),
      //   headers: {'Content-Type':'application/json'},
      // })

      showCourseConfirmation()      
      console.log(semester)
      console.log(course)
    } 
  }



  /**Create page components */
  return (
    <div className="w-25">
      <Headers />
      
      <h1>Course Enrol</h1>
      <InvalidCourse />
      <InvalidSemester />
      <CourseConfirmation />
      <AutoComplete
        className="w-100"
        disablePortal
        id="combo-box-demo"
        options={courses}
        value={course}
        onInputChange={(e, newValue) => setCourse(newValue)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Course" />} />
      <br/>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="Semester"
          onChange={handleChange}
        > 
        
        {semesters.map((semester, index) => (<MenuItem key={index} value={`${year}; ${semester}`}>
          {`Semester ${semester}; ${year}`}</MenuItem>))}            
        </Select>
      </FormControl>
      <br/><br/>

      <Button className="btn btn-dark w-100" onClick={async () => await handleSubmit()}>Sign away your life</Button>
      <br/><br/>
      <CourseTable />
    </div>
    );
}

export default CourseEnrol;