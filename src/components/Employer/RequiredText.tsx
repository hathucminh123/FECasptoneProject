import React from "react";
import classes from "./RequiredText.module.css";

interface props {
  text: string;
}

const RequiredText: React.FC<props> = ({ text }) => {
  return (
    <label htmlFor="" className={classes.label}>
      {text}
      <span className={classes.span}>*</span>
    </label>
  );
};

export default RequiredText;
