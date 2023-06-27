import React from "react";
import AutoComplete from '@mui/material/Autocomplete'
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";


function CourseEnrol() {
  const course = ['老干妈', 'ELEC2301', 'MATH6969']
  const semesters = [1,2,3]
  const year = 2023;
  const [sem, setSem] = useState('');

  const buttonEvent = () => {
    console.log('hello')
  }

  const handleChange = (event) => {
    setSem(event.target.value);
  };

  return (
    <div class="w-25">
        <h1>Course Enrol</h1>
        
        <AutoComplete
        className="w-100"
          disablePortal
          id="combo-box-demo"
          options={course}
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
          
          {semesters.map((semester, index) => (<MenuItem key={index} value={`${year}${semester}`}>
            {`Semester ${semester}-${year}`}</MenuItem>))}            
          </Select>
        </FormControl>

        <Button className="btn btn-dark" onClick={buttonEvent}>Submit</Button>
    </div>
        
    );
}

export default CourseEnrol;