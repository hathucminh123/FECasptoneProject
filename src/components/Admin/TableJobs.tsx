import React from "react";
import classes from "./TableJobs.module.css";

interface TableProps {
  headers: string[];
  data: { [key: string]: string}[];
  customRenderers?: {
    [key: string]: (job: { [key: string]: string }, index: number) => React.ReactNode;
  };
  onViewDetail?: (job: { [key: string]: string }) => void;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const TableJobs: React.FC<TableProps> = ({
  headers,
  data,
  customRenderers,
  hovered,
  setHovered,
}) => {
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((header, index) => (
            <th key={index} className={classes.th}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((job, index) => (
          <tr
            key={index}
            className={classes.tr}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{
              backgroundColor: hovered === index ? "#f5f5f5" : "transparent",
            }}
          >
            {headers.map((header, colIndex) => (
              <td key={colIndex} className={classes.td}>
                {customRenderers && customRenderers[header]
                  ? customRenderers[header](job, index)
                  : job[header.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJobs;
