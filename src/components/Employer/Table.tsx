import React from "react";
import classes from "./Table.module.css";

// Define the types for the table data
interface TableProps {
  headers: string[]; // Array of headers for the table
  data: { [key: string]: string }[]; // Array of objects for each row
  onViewDetail?: (row: { [key: string]: string }) => void; // Optional function to handle "View Detail" click
  customRenderers?: { [key: string]: (row: { [key: string]: string }) => React.ReactNode };
}

const Table: React.FC<TableProps> = ({ headers, data,  customRenderers }) => {
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((header, index) => (
            <th key={index} className={classes.th}>
              {header}
            </th>
           
          ))}
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={classes.tr}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className={classes.td}>
                {customRenderers && customRenderers[header]
                  ? customRenderers[header](row) // Use custom renderer if available
                  : row[header]} 
              </td>
            ))}
            {/* {onViewDetail && (
              <td className={classes.td}>
                <button
                  className={classes.viewDetailButton}
                  onClick={() => onViewDetail(row)}
                >
                  View Detail
                </button>
              </td>
            )} */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
