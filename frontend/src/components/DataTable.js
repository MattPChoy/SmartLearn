// import { toUnitless } from "@mui/material/styles/cssUtils";
import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function DataTable({ data, studet_id }) {
  function unenrolClick(cid, sid) {
    console.log("cid");
  }

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
          <td>{courseList.course_desc}</td>
          <td>{`${courseList.coordinator_firstname} ${courseList.coordinator_lastname}`}</td>
          <td>{`Semester ${courseList.semester}-${courseList.year}`}</td>
          <td>
            <Button
              className="btn btn-primary"
              onClick={unenrolClick(courseList.course_name, studet_id)}
            >
              Unenrol
            </Button>
          </td>
        </tr>
      ))}
    </Table>
  );
}

export default DataTable;
