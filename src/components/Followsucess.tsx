import { createPortal } from "react-dom";
import classes from "./Followsucess.module.css";
import React from "react";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
interface BusinessStream {
    id: number;
    businessStreamName: string;
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
    jobType: string | null;
    jobLocation: string | null;
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
    imageUrl:string;
    evidence?:string;
    taxCode?:string;
    companyStatus?:number
  }
interface props{
onClose?:()=>void
onConfirm?:()=>void
companyDataa?:Company
}



const Followsucess: React.FC<props> = ({ onClose ,companyDataa}) => {
  const modalRoot = document.getElementById("ModalFollow");
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={classes.main}>
          <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        initial="hidden"
        animate="visible"
        // exit="hidden"
        // whileHover="hidden"
       
        // className={classes.modall}
      >
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              {/* <Typography
                variant="h2"
                sx={{ lineHeight: 1.5, fontSize: "22px", fontWeight: 700 }}
              >
                Deactivate job invitations from employers?
              </Typography> */}
              <div className={classes.img}><img src={companyDataa?.imageUrl} className={classes.img1} alt="companyImage" /></div>
              <IconButton
              aria-label="close"
                onClick={onClose}
              sx={{
                cursor: "pointer",
                marginRight: "20px !important",
                marginTop: "20px !important",
                boxSizing: "content-box",
                width: "1em",
                height: "1em",
                padding: ".25em .25em",
                color: "#000",
                WebkitAppearance: "button",
                textTransform: "none",
                border: 0,
                borderRadius: ".25rem",
                opacity: 0.5,
                margin: 0,
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
              }}
            >
              <CloseIcon />
            </IconButton>
            </div>
            <div className={classes.main5}>
                <Typography variant="h2" sx={{
                    lineHeight: 1.5,
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom:0,
                    marginTop:0,
                    boxSizing: "border-box",
                }}>Follow Successfully</Typography>
            </div>
            <div className={classes.main6}>
                <p className={classes.p}>
                We will email you new jobs and updates from <b className={classes.b}>
                    {companyDataa?.companyName}</b> </p>
            </div>
            {/* <button className={classes.button} type="button">
            <CloseIcon  sx={{padding:'.'}}/>
            </button> */}
            <div className={classes.button}>
            <button type="button" onClick={onClose} className={classes.main10}>OK</button>
            </div>
        
          </div>
          {/* <div className={classes.main5}>
            <p className={classes.main6}>
              You will no longer get job invitations tailored to your skills.
            </p>
          </div> */}
          {/* <div className={classes.main7}>
            <div className={classes.main8}>
              <button type="button" onClick={onClose} className={classes.main9}>Cancel</button>

              <button type="button" onClick={onConfirm} className={classes.main10}>Stop receiving</button>
            </div>
          </div> */}
        </div>
      </div>
      </motion.div>
    </div>,
    modalRoot
  );
}

export default Followsucess