import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classes from "./FormSelect.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

interface JobType {
    id: number;
    name: string;
    description: string;
  }
  
  // interface JobLocation {
  //   id: number;
  //   district: string;
  //   city: string;
  //   postCode: string;
  //   state: string;
  //   country: string;
  //   stressAddress: string;
  // }
  
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
    jobType: JobType; // jobType là đối tượng JobType
    jobLocationCities:string[];
    jobLocationAddressDetail:string[]
    skillSets: string[]; // Array of skill sets, có thể là array rỗng
  }
  
interface Props {
  selectedValue: JobPost | null;
  setSelectedValue: Dispatch<SetStateAction<JobPost | null>>;
  data?: JobPost[];
  placeholder?: string;
  padding?: boolean;
  height?: number;
  width?: number;
  text?: string;
}

export default function FormSelectJobPost({
  selectedValue,
  setSelectedValue,
  data = [],
  placeholder = "Select Job Post",
  padding,
  height,
  text,
  width,
}: Props) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleOpenSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleLocation = (item: JobPost) => {
    setSelectedValue(item);
    setIsSelectOpen(false);
  };

  return (
    <div className={classes.div18} ref={selectRef}>
      {selectedValue && (
        <span className={classes.spande}>
          <i onClick={() => setSelectedValue(null)}>
            <HighlightOffOutlinedIcon fontSize="small" sx={{ color: "#868d94" }} />
          </i>
        </span>
      )}
      <div className={classes.div19}>
        <div className={classes.div20} onClick={handleOpenSelect}>
          <ArrowDropDownIcon />
        </div>
        <div
          className={classes.div21}
          style={{
            minHeight: height ? `${height}px` : undefined,
            width: width ? `${width}px` : undefined,
          }}
        >
          <input
            className={`${
              isSelectOpen && padding
                ? classes.inputlocationOpenPadding
                : isSelectOpen
                ? classes.inputlocationOpen
                : classes.inputlocation
            }`}
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            tabIndex={0}
            value={selectedValue?.jobTitle || ""}
            readOnly
          />
          {!selectedValue && !isSelectOpen && (
            <span className={classes.spanlocation}>{placeholder}</span>
          )}
          {selectedValue && (
            <span className={`${padding ? classes.spanlocation1 : classes.spanlocation}`}>
              {selectedValue?.jobTitle} {text}
            </span>
          )}
        </div>
        {isSelectOpen && (
          <div className={classes.divselect}>
            <ul className={classes.ul}>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li
                    onClick={() => handleLocation(item)}
                    key={index}
                    className={classes.li}
                  >
                    <span className={classes.spanselect}>
                      <span>{item.jobTitle} {text}</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className={classes.li}>
                  <span className={classes.spanselect}>
                    <span>No options found</span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
