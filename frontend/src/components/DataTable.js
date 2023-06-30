import { toUnitless } from "@mui/material/styles/cssUtils";
import React from "react";
import Table from "react-bootstrap/Table";

function DataTable( {data} ) {
  const fieldTitle = ['Course Code', 'Course Title', 'Coordinate Name', 'Attending Semester']
  return (

    <Table striped>
      <thead>
        <tr>
          {fieldTitle.map((title, index)=>{
            return(
              <th key={index}>
                {title}
              </th>
            )            
          })}
        </tr>
      </thead>
      {data.map((courseList, index) => (
        <tr>
          <td key={index}>{courseList.course_name}</td>
          <td key={index+1}>{courseList.description}</td>
          <td key={index+2}>{`${courseList.coordinator_firstname} ${courseList.coordinator_lastname}`}</td>
          <td key={index+3}>{`Semester ${courseList.semester}-${courseList.year}`}</td>
        </tr>
      ))}
    </Table>

  );
}

function courseRow({ data }) {
  return (
    <Table striped>
      {data.map((courseList, index) => (
        <tr>
          <td key={index}>{courseList.course_name}</td>
          <td key={index+1}>{courseList.description}</td>
          <td key={index+2}>{`${courseList.coordinator_firstname} ${courseList.coordinator_lastname}`}</td>
          <td key={index+3}>{`Semester ${courseList.semester}-${courseList.year}`}</td>
        </tr>
      ))}
    </Table>
  )
}

export default DataTable;
