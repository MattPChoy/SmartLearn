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

function CourseEnrol() {
  const courses = ['DECO2500', 'ELEC2301', 'MATH6969']
  const semesters = [1,2,3]
  const year = 2023;

  const [semester, setSem] = useState('');
  const [course, setCourse] = useState('');
  const [courseShow, setCourseShow] = useState(false);
  const [semShow, setSemShow] = useState(false);

  const closeInvalidSem = () => setSemShow(false);
  const showInvalidSem = () => setSemShow(true);
  const closeInvalidCourse = () => setCourseShow(false);
  const showInvalidCourse = () => setCourseShow(true);

  const handleChange = (event) => {
    setSem(event.target.value);
  };

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

  const handleSubmit = () => {
    if (courses.includes(course)) {
      // fetch("http://localhost:5000/api/auth", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     courseID: course,
      //     semNo: semester,
      //   }),
      //   headers: {'Content-Type':'application/json'},
      // })
      console.log(semester)
      console.log(course)
    } 
    
    if(!courses.includes(course)) {
      showInvalidCourse()
    } else if(semester.length===0){
      console.log(semester.length)
      showInvalidSem()
    } 
  }

  return (
    <div className="w-25">
      <Headers>
      
      </Headers>
        <h1>Course Enrol</h1>
        <InvalidCourse />
        <InvalidSemester />
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
    </div>
    );
}

export default CourseEnrol;