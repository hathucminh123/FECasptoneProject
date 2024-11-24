import React, { useRef } from "react";
import classes from "./MinimalTemplate.module.css";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import html2pdf from "html2pdf.js";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
const  MinimalTemplate:React.FC =()=> {
  const cvRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("userId");

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  const handleDownload = () => {
    const element = cvRef.current;
    if (element) {
      html2pdf()
        .from(element)
        .save(`${UserProfileData?.firstName}${UserProfileData?.lastName}.pdf`);
    }
  };
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3} ref={cvRef}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.header}>
                  <div className={classes.header1}></div>
                  <div className={classes.header2}>
                    <div className={classes.header3}>
                      <div className={classes.header4}>
                        <div className={classes.header5}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontWeight: 500,
                              fontSize: "36px",
                              wordBreak: "break-word",
                              wordWrap: "break-word",
                              width: "100%",
                              lineHeight: 1.5,
                              marginTop: 0,
                              marginBottom: 0,
                              boxSizing: "border-box",
                              display: "block",
                           fontFamily: "Lexend, sans-serif",
                            }}
                          >
                            {UserProfileData?.firstName}{" "}
                            {UserProfileData?.lastName}
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.header6}>
                        <div className={classes.img}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.main6}>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",

                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Personal Details
                      </Typography>
                      <div className={classes.main9}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/minimal-phone-16ff110181006af27cc6139e229a10bf6b13b6ee9901dff55b5c2245be310494.svg"
                          alt="phone"
                          className={classes.img1}
                        />
                        <div className={classes.main10} style={{   fontFamily: "Lexend, sans-serif",}}>
                          {UserProfileData?.phoneNumber}
                        </div>
                      </div>
                      <div
                        className={classes.main9}
                        style={{ paddingTop: "10px" }}
                      >
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/minimal-mail-2a7565291c2e36bf20fbf4450bc65b770fe7b2a92d6152418abbdc0d42e3d012.svg"
                          alt="email"
                          className={classes.img1}
                        />
                        <div className={classes.main10} style={{   fontFamily: "Lexend, sans-serif",}}>
                          {UserProfileData?.email}
                        </div>
                      </div>
                    </div>
                    <div className={classes.education}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Education
                      </Typography>
                      {UserProfileData?.educationDetails.map((edu) => (
                        <div className={classes.education1} key={edu.id}>
                          <div className={classes.education2} style={{   fontFamily: "Lexend, sans-serif",}}>
                            School name: {edu.institutionName}
                          </div>
                          <div className={classes.education3} style={{   fontFamily: "Lexend, sans-serif",}}>
                            Major: {edu.fieldOfStudy}
                          </div>
                          <div className={classes.education3} style={{   fontFamily: "Lexend, sans-serif",}}>
                            {" "}
                            From:{""}
                            {moment(edu.startDate).format("DD-MM-YYYY")} - To:{" "}
                            {moment(edu.endDate).format("DD-MM-YYYY")}
                          </div>
                          <div className={classes.education3} style={{   fontFamily: "Lexend, sans-serif",}}>
                            Degree: {edu.degree}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={classes.Skill}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                         fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Skills
                      </Typography>
                      {UserProfileData?.skillSets.map((skills) => (
                        <div style={{ marginBottom: "30px" }} key={skills.id}>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span className={classes.span1}>
                                <strong>Skill Name:</strong>
                              </span>
                            </div>
                            <div className={classes.skill3}>
                              <span style={{   fontFamily: "Lexend, sans-serif",}} className={classes.span2}>
                                {skills.name}
                              </span>
                            </div>
                          </div>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span className={classes.span1} style={{   fontFamily: "Lexend, sans-serif",}}>
                                <strong>Description:</strong>
                              </span>
                            </div>
                            <div>
                              <span className={classes.span2}>
                                <div
                                style={{   fontFamily: "Lexend, sans-serif",}}
                                  dangerouslySetInnerHTML={{
                                    __html: skills.description,
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.mainright}>
                    <div className={classes.main12}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                         fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Work Experience
                      </Typography>

                      {UserProfileData?.experienceDetails.map((exp) => (
                        <div className={classes.main13} key={exp.id}>
                          <div className={classes.main14}>
                            <div className={classes.exp2} style={{   fontFamily: "Lexend, sans-serif",}}>
                              Position: {exp.position}
                            </div>
                            <div className={classes.exp3}>
                              {" "}
                              From:{""}
                              {moment(exp.startDate).format("DD-MM-YYYY")} - To:{" "}
                              {moment(exp.endDate).format("DD-MM-YYYY")}
                            </div>
                          </div>
                          <div className={classes.exp4} style={{   fontFamily: "Lexend, sans-serif",}}>
                            Company Name: {exp.companyName}
                          </div>
                          <div className={classes.exp5}>
                            <div
                            style={{   fontFamily: "Lexend, sans-serif",}}
                              dangerouslySetInnerHTML={{
                                __html: exp.responsibilities,
                              }}
                            />
                          </div>
                          <div className={classes.exp6} style={{   fontFamily: "Lexend, sans-serif",}}>Project</div>
                          <div className={classes.exp7}>
                            <div
                            style={{   fontFamily: "Lexend, sans-serif",}}
                              dangerouslySetInnerHTML={{
                                __html: exp.achievements,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main15}>
        <div
          className={classes.button}
          style={{ cursor: "pointer" }}
          onClick={handleDownload}
        >
          <div className={classes.button1}>
            <DownloadIcon />
            Download CV
          </div>
        </div>
      </div>
    </div>
  );
}
export default MinimalTemplate