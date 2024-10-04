import React, { useState } from "react";
import classes from "./JobPage.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import PauseIcon from '@mui/icons-material/Pause';
import { useAppSelector } from "../../redux/hooks/hooks";
// import Popover from "@mui/material/Popover";
interface JobFormData {
  id:string,
  title: string,
  selectedDate: Date|null,
  count: number,
  city: string,
  district: string,
  specificLocation:string,
  skills: string[],
  description: string,
  requirements: string,
  benefits: string,
  selectedFile: File[],
};

export default function JobPage() {
  const dataa = ["All", "Approved", "Pending", "Failed"];
  const [state, setState] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);
  // const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const data = useAppSelector((state) => state.create.item);
  console.log('quao',data)
  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget); // Set the DOM element as anchorEl
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  // const jobs = [
  //   {
  //     id: "#12123123123",
  //     title: "FullStack",
  //     status: "No CV yet",
  //     status1: "Failed",
  //   },
  //   {
  //     id: "#45645645678",
  //     title: "Backend Developer",
  //     status: "No CV yet",
  //     status1: "Approved",
  //   },
  // ];


const navigate = useNavigate();

const handleNavigateDetail = (job: JobFormData) => {
  navigate(`/employer-verify/jobs/jobDetail/${job.id}`, {
    state: { job, id: job.id }, 
  });
};
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title="Recruitment management"
          icon={<CreateOutlinedIcon />}
          buttonstring="Post Recruitment"
          url="create-jobs"
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.mainleft}>
                  <div className={classes.main6}>
                    <div className={classes.divicon}>
                      <SearchOutlinedIcon />
                    </div>
                    <input
                      type="text"
                      className={classes.inputsearch}
                      autoComplete="on"
                      placeholder="Search for job postings by title or job code"
                    />
                  </div>
                </div>
                <div className={classes.mainmiddle}>
                  <div className={classes.main6}>
                    <div className={classes.divtext}>Display status :</div>
                    <FormSelect
                      selectedValue={state}
                      setSelectedValue={setState}
                      placeholder=""
                      data={dataa}
                      padding={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.divtable}>
            <div className={classes.divtable1}>
              <div className={classes.divtable2}>
                <div className={classes.left}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    Jobs title
                  </Typography>
                </div>
                <div className={classes.left1}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    Status
                  </Typography>
                </div>
                <div className={classes.right}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    System-generated CVs
                  </Typography>
                </div>
                <div className={classes.right}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                  Filter CVs
                  </Typography>
                </div>

                <div className={classes.right1} >
                  <div className={classes.icon1}>
                    <SettingsOutlinedIcon />
                  </div>
                </div>
              
                {/* <div className={classes.right} >
                  <div className={classes.icon1}>
                    <SettingsOutlinedIcon />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {data.map((job, index) => (
            <div
              className={classes.divtable}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => setHovered(null)}
              key={job.id}
              style={{
                backgroundColor: hovered === index ? "#FFD4C3" : "transparent",
                color: hovered === index ? "transparent" : "#5e6368",
              }}
            >
              <div className={classes.divtable1}>
                <div className={classes.divtable2}>
                  <div className={classes.left}>
                    <div className={classes.div1}>
                      <div className={classes.div2}>
                        <div className={classes.div3}>
                          <span
                            className={classes.span1}
                            style={{
                              color:
                                hovered === index ? "transparent" : "#5e6368",
                            }}
                          >
                            {job.id}
                          </span>
                        </div>
                        <Link
                          to="/"
                          className={classes.link}
                          style={{
                            color:
                              hovered === index ? "transparent" : "#5e6368",
                          }}
                        >
                          {job.title}
                        </Link>
                        <div className={classes.div4}>No CV yet</div>
                        {hovered === index && (
                          <>
                            <div className={classes.div6}>
                              <Link to="" className={classes.link2}>
                                View Report
                              </Link>
                            </div>
                            <div className={classes.div5}>
                              <Link to="Detail/CV/AppliedCV" className={classes.link1}>
                                View Candidate's CV
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={classes.left1}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        paddingRight: ".6em",
                        paddingLeft: ".6em",
                        borderRadius: "10rem",
                        display: "inline-block",
                        padding: ".25em .4em",
                        lineHeight: 1,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        verticalAlign: "baseline",
                        // background:
                        //   job.status1 === "Failed"
                        //     ? "#fff3f2"
                        //     : job.status1 === "Approved"
                        //     ? "#00B14F"
                        //     : undefined,
                        // color:
                        //   job.status1 === "Failed"
                        //     ? "#da4538"
                        //     : job.status1 === "Approved"
                        //     ? "white"
                        //     : undefined,
                        color:"white",
                        background:"#00B14F"
                      }}
                    >
                      Approved
                    </Typography>
                  </div>

                  <div className={classes.right}>
                    <div className={classes.div7}>
                      <div
                        className={classes.div8}
                        style={{
                          color: hovered === index ? "transparent" : "#5e6368",
                        }}
                      >
                        Recommended CV/Profile
                      </div>
                      <div className={classes.div9}>
                        <Link to="Detail/CV/AppliedCV/CV/Recommend" className={classes.link4}>
                          <RemoveRedEyeIcon
                            fontSize="small"
                            sx={{ color: "#a8afb6" }}
                          />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={classes.right}>
                    <div className={classes.div7}>
                      {/* <div
                        className={classes.div8}
                        style={{
                          color: hovered === index ? "transparent" : "#5e6368",
                        }}
                      >
                        Recommended CV/Profile
                      </div> */}
                      <div className={classes.div9}>
                        <Link to="Detail/CV/AppliedCV/CV/Recommend" className={classes.link3}>
                                Find CVs
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className={classes.right1}>
                    {/* <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>Edit</Typography>
                    </Popover> */}
                    <div
                      className={classes.icon2}
                      // onMouseEnter={handleClick}
                      // onMouseLeave={handleClose}
                      onClick={()=>handleNavigateDetail(job)}
                    >
                      <Tooltip title="Edit">
                      <ModeEditIcon
                        fontSize="small"
                        sx={{
                          backgroundColor: hovered ===index ?"#FF6F61": "#e8edf2",
                          borderRadius: "50%",
                          padding: "10px",
                          color: hovered === index ? "#fff" : undefined,
                        }}
                      />
                      </Tooltip>
                    </div>
                    <div
                      className={classes.icon2}
                      // onMouseEnter={handleClick}
                      // onMouseLeave={handleClose}
                    >
                      <Tooltip title="Delete">
                      <PauseIcon
                        fontSize="small"
                        sx={{
                          backgroundColor: hovered ===index ?"#FF6F61": "#e8edf2",
                          borderRadius: "50%",
                          padding: "10px",
                          color: hovered === index ? "#fff" : undefined,
                        }}
                      />
                      </Tooltip>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
