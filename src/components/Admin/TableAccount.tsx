import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "./TableAccount.module.css";

interface TableProps {
  headers: string[];
  data: { [key: string]: string }[];
  customRenderers?: {
    [key: string]: (row: { [key: string]: string }, index: number) => React.ReactNode;
  };
  onViewDetail?: (row: { [key: string]: string }) => void;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const TableAccount: React.FC<TableProps> = ({
  headers,
  data,
  customRenderers,
  hovered,
  setHovered,
}) => {
  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((header, index) => (
            <th
              key={index}
              className={
                header === "Action" ? `${classes.td} ${classes.centered}` : classes.td
              }
            >
              {header === "Action" ? <SettingsIcon /> : header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={classes.tr}
            onMouseEnter={() => handleMouseEnter(rowIndex)}
            onMouseLeave={() => setHovered(null)}
            style={{
              backgroundColor: hovered === rowIndex ? "#FFD4C3" : "transparent",
              color: hovered === rowIndex ? "transparent" : "#5e6368",
            }}
          >
            {headers.map((header, colIndex) => (
              <td
                key={colIndex}
                className={
                  header === "Action" ? `${classes.td} ${classes.centered}` : classes.td
                }
              >
                {customRenderers && customRenderers[header]
                  ? customRenderers[header](row, rowIndex)
                  : row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAccount;
