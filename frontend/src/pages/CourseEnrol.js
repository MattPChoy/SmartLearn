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


function CourseEnrol() {
  const courses = ['老干妈', 'ELEC2301', 'MATH6969']
  const semesters = [1,2,3]
  const year = 2023;
  const [sem, setSem] = useState('');
  const [course, setCourse] = useState('');

  const handleChange = (event) => {
    setSem(event.target.value);
  };

  const handleSubmit = () => {
    console.log(sem)
    console.log(course)
  }

  return (
    
    <div className="w-25">
      <Headers>
      
      </Headers>
        <h1>Course Enrol</h1>
        
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
            value={sem}
            label="Semester"
            onChange={handleChange}
          > 
          
          {semesters.map((semester, index) => (<MenuItem key={index} value={`${year}-${semester}`}>
            {`Semester ${semester}-${year}`}</MenuItem>))}            
          </Select>
        </FormControl>
        <br/><br/>
        <Button className="btn btn-dark w-100" onClick={async () => await handleSubmit()}>Sign away your life</Button>
    </div>
        
    );
}

export default CourseEnrol;