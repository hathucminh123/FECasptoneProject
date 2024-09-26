import React, { useState } from "react";
import classes from "./MultipleSelect.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

// Define the props type
interface MultipleSelectProps {
  options: string[];
  placeholder?: string;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>; 
}

export default function MultipleSelect({
  options,
  placeholder = "EX: Java, ReactJS, .Net", 
  skills, 
  setSkills, 
}: MultipleSelectProps) {
  const [isSelectOpenSkill, setIsSelectOpenSkill] = useState<boolean>(false);
  const [inputSkill, setInputSkill] = useState<string>("");

  const handleOpenSelectSkill = () => {
    setIsSelectOpenSkill(!isSelectOpenSkill);
  };

  const handleSkill = (selectedSkill: string) => {
    // Add skill if it's not already in the array
    if (!skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
    setIsSelectOpenSkill(false);
    setInputSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSkill(e.target.value);
  };

  return (
    <div className={classes.div35}>
      <div className={classes.div36} onClick={handleOpenSelectSkill}>
        <ArrowDropDownIcon />
      </div>
      <div className={classes.div37}>
        <div className={classes.div38}>
          {/* Display selected skills */}
          {skills.map((skill, index) => (
            <div key={index} className={classes.div39}>
              <span className={classes.spanskill1}>{skill}</span>
              <span
                className={classes.spanskillicon}
                onClick={() => handleRemoveSkill(skill)}
              >
                <ClearOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: "2px" }}
                />
              </span>
            </div>
          ))}
        </div>

        <div className={classes.div22}></div>
        <div className={classes.div23}></div>
        <input
          className={classes.inputskill}
          type="text"
          autoComplete="off"
          tabIndex={0}
          value={inputSkill}
          onChange={handleControl}
        />
        {!inputSkill && !isSelectOpenSkill ? (
          <span className={classes.spanskill}>{placeholder}</span>
        ) : (
          <span className={classes.spanskill}>{inputSkill}</span>
        )}
      </div>
      {isSelectOpenSkill && (
        <div className={classes.divselect}>
          <ul className={classes.ul}>
            {options.length > 0 ? (
              options.map((item, index) => (
                <li
                  onClick={() => handleSkill(item)}
                  key={index}
                  className={classes.li}
                >
                  <span className={classes.spanselect}>
                    <span>{item}</span>
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
  );
}
