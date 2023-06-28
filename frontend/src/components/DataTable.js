import React from "react";

function DataTable({ data }) {
  return (
    <div className="DataTable">
      <table>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
        {data.map((course) => (
          course.map((row) =>
            <tr>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          )
        ))}
      </table>
    </div>
  );
}

export default DataTable;
