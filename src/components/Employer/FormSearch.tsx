import React from "react";
import classes from "./FormSearch.module.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
interface props {
    placeholder?:string
}

export default function FormSearch({placeholder} :props) {
  return (
    <div className={classes.div}>
      <div className={classes.div1}>
          <div className={classes.div2}>
            <SearchOutlinedIcon fontSize="small"/>
          
          </div>
          <input type="text" className={classes.input} autoComplete="on" placeholder={placeholder} />
      </div>
    </div>
  );
}