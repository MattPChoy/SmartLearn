import { toUnitless } from "@mui/material/styles/cssUtils";
import React from "react";
import Table from "react-bootstrap/Table";

function DataTable({ data }) {
  const fieldTitle = [
    "Course Code",
    "Course Title",
    "Coordinate Name",
    "Attending Semester",
  ];
  return (
    <Table striped TableHeaderColumn width={"80%"}>
      <thead>
        <tr>
          {fieldTitle.map((title, index) => {
            return <th key={index}>{title}</th>;
          })}
        </tr>
      </thead>
      {data.map((courseList, index) => (
        <tr key={index}>
          <td>{courseList.course_name}</td>
          <td>{courseList.description}</td>
          <td>{`${courseList.coordinator_firstname} ${courseList.coordinator_lastname}`}</td>
          <td>{`Semester ${courseList.semester}-${courseList.year}`}</td>
        </tr>
      ))}
    </Table>
  );
}

export default DataTable;
