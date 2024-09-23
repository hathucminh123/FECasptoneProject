import React, { useState } from "react";
import classes from "./ManageCVs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
const selectData = ["fullstack", "mobile engineer"];

const stateData = [
  "Avalable data",
  "Meeting",
  "Accept a Jobs",
  "Rejected",
  "Pending",
];

const CV = ["Show All Cv", "Show only unseen CVs"];

export default function ManageCVs() {
  const [seclectJob, setSelectJob] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectCV, setSelectCV] = useState<string>("");
  const width = 230;
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Candidate CV Management" />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Input name,email,phone number"
                />
                <button className={classes.button}>
                  {" "}
                  <SearchOutlinedIcon fontSize="small" />{" "}
                </button>
              </form>
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={seclectJob}
                setSelectedValue={setSelectJob}
                data={selectData}
                width={width}
                placeholder="Seclect jobs post"
              />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectState}
                setSelectedValue={setSelectState}
                data={stateData}
                width={width}
                placeholder="Seclect state candidate CV"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main6}>
        <div className={classes.main7}>
          <div className={classes.main8}>
            <div className={classes.main9}>
              <div className={classes.main10}>
                finded
                <span className={classes.span}> 0 </span>
                Candidate
              </div>
            </div>
            <div className={classes.main11}>
              <FormSelect
                selectedValue={selectCV}
                setSelectedValue={setSelectCV}
                data={CV}
                placeholder="Show All CV Candidates"
              />
            </div>
          </div>
          <div className={classes.main12}>
            
          </div>
        </div>
      </div>
    </div>
  );
}
