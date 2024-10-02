import React from "react";
import classes from "./Employer.module.css";
import Image from "./../../assets/image/empoyer.png.webp";
import  Typography  from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function EmployerPage() {

  const navigate =useNavigate()

  const handleNavigate =()=>{
    navigate('/employers/login')
  }
  return (
    <section className={classes.section}>
      <div className={classes.div}>
        <div className={classes.div1}>
          <img
            src={Image}
            alt="Employer Image"
            style={{
              width: "100%",
              verticalAlign: "middle",
              boxSizing: "border-box",
              overflowClipMargin: "content-box",
              overflow: "clip",
            }}
          />
        </div>
        <div className={classes.div2}>
          <div className={classes.div3}>
            <Typography variant="h1" sx={{marginTop:'32px',fontSize:'36px',fontWeight:700,lineHeight:1.5,}}>Hire the best IT Professionals in Vietnam with Us</Typography>
            <p style={{marginBottom:'48px',marginTop:'24px',fontSize:'16px',fontWeight:400,boxSizing:'border-box'}}>
            With in-depth understanding in the IT sector and specialized skills, we can help you reach and hire the best IT candidates.
            </p>
            <button className={classes.button} onClick={handleNavigate}>
            Post jobs now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
