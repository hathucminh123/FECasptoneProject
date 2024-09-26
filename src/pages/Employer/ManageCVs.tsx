import React, { useState } from "react";
import classes from "./ManageCVs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import Table from "../../components/Employer/Table";
import { Link } from "react-router-dom";
const selectData = ["fullstack", "mobile engineer"];

const stateData = [
  "Avalable data",
  "Meeting",
  "Accept a Jobs",
  "Rejected",
  "Pending",
];

const CV = ["Show All Cv", "Show only unseen CVs"];
const headers = ["fullName", "Email", "Phone Number", "CV file", "Status","Action"]; // Add extra column "Status"

// Define the data for the table rows
const data = [
  {
    fullName: "John Doe",
    Email: "johndoe@example.com",
    "Phone Number": "123-456-7890",
    "CV file": "https://example.com/johndoe_cv.pdf",
    Status: "Approved",
    Action:'View Detail'
  },
  {
    fullName: "Jane Smith",
    Email: "janesmith@example.com",
    "Phone Number": "987-654-3210",
    "CV file": "https://example.com/janesmith_cv.pdf",
    Status: "Pending", 
    Action:'View Detail'
  },
];
 
export default function ManageCVs() {
  const [seclectJob, setSelectJob] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectCV, setSelectCV] = useState<string>("");
  const width = 230;
  const handleViewDetail = (row: { [key: string]: string }) => {
    console.log("View Detail clicked for:", row);
    alert(`Viewing details for ${row.fullName}`);
  };

  // Custom renderers for specific columns
  const customRenderers = {
    "CV file": (row: { [key: string]: string }) => (
      <a
        href={row["CV file"]}
        download
        className={classes.cvLink}
      >
        Download CV
      </a>
    ),
    Status: (row: { [key: string]: string }) => (
      <span
        style={{
          color: row.Status === "Approved" ? "green" : "orange",
          fontWeight: "bold",
        }}
      >
        {row.Status}
      </span>
    ),
    "Action":(row: { [key: string]: string }) => (
      <Link to="" className={classes.link3}
       
      >
        {row.Action}
      </Link>
    ),
  };
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Candidate CV Management" appear={true} />
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
          <Table
        headers={headers}
        data={data}
        onViewDetail={handleViewDetail}
        customRenderers={customRenderers} 
      />
          </div>
        </div>
      </div>
    </div>
  );
}
