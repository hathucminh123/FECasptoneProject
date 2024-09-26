import React from "react";
import classes from "./RequiredText.module.css";

interface props{
    text:string
}

export default function RequiredText({text}:props) {
  return (
    <label htmlFor="" className={classes.label}>
      {text}
      <span className={classes.span}>*</span>
    </label>
  );
}
