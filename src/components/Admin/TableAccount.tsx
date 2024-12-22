import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "./TableAccount.module.css";

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
  companyStatus?: number;
}

interface TableProps {
  headers: (keyof Company | "Action")[];
  data: Company[];
  customRenderers?: { [key: string]: (row: Company, index: number) => React.ReactNode };
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
  const handleMouseEnter = (index: number) => setHovered(index);

  const renderCellContent = (header: keyof Company, row: Company): React.ReactNode => {
    const value = row[header];
    if (customRenderers && customRenderers[header]) {
      return customRenderers[header](row, data.indexOf(row));
    }


    if (typeof value === "object" && value !== null) {
    
      if ("businessStreamName" in value) {
        return value.businessStreamName; 
      }
      if (Array.isArray(value)) {
        return value.map((item, idx) => (
          <span key={idx} className={classes.arrayItem}>
            {typeof item === "string" ? item : JSON.stringify(item)}
          </span>
        ));
      }
      return JSON.stringify(value); 
    }

    return value != null ? value.toString() : null;
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={classes.th}>
              {header === "Action" ? <SettingsIcon /> : header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row.id}
            onMouseEnter={() => handleMouseEnter(rowIndex)}
            onMouseLeave={() => setHovered(null)}
            className={hovered === rowIndex ? classes.hoveredRow : classes.row}
          >
            {headers.map((header, colIndex) => (
              <td key={colIndex} className={classes.td}>
                {header === "Action"
                  ? customRenderers && customRenderers[header]
                    ? customRenderers[header](row, rowIndex)
                    : "Actions Placeholder" // Replace with actual actions
                  : renderCellContent(header as keyof Company, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAccount;
