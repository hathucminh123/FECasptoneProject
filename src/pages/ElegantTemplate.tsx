import React, { useRef } from "react";
import classes from "./ElegantTemplate.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import html2pdf from "html2pdf.js";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const ElegantTemplate:React.FC=()=> {
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
            <header className={classes.header}>
              <div className={classes.main4}>
                <img
                  src="https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg"
                  alt="image"
                  className={classes.main4}
                />
              </div>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <div className={classes.main7} style={{fontFamily: "Lexend, sans-serif",}}>
                    {UserProfileData?.firstName}
                    {UserProfileData?.lastName}
                  </div>
                </div>
                <div className={classes.main8}>
                  <div className={classes.main9}>
                    <div className={classes.main10}>
                      <div className={classes.main11}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/phone-8ec46b9e46b6e6ea3bf01fa198bbb8dbcbfb86b33a2c2766e7ccfa4b1c694d5c.svg"
                          alt="phone"
                          className={classes.img}
                        />
                        <p className={classes.p} style={{fontFamily: "Lexend, sans-serif",}}>
                          {UserProfileData?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className={classes.main10}>
                      <div className={classes.main11}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/mail-f5038b679849f3bc3747122a3108a84d59cd05ad6c23f3b5e60e816cf45d9f0a.svg"
                          alt="phone"
                          className={classes.img}
                        />
                        <p  style={{fontFamily: "Lexend, sans-serif",}}className={classes.p}>{UserProfileData?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className={classes.main12}>
              <div className={classes.main13}>
                <div className={classes.education}>
                  <div className={classes.education1} style={{fontFamily: "Lexend, sans-serif",}}>Education</div>

                  <div className={classes.education2}>
                    {UserProfileData?.educationDetails.map((edu) => (
                      <div className={classes.education3} key={edu.id}>
                        <span className={classes.span} style={{fontFamily: "Lexend, sans-serif",}}>
                          School name: {edu.institutionName}
                        </span>
                        <div className={classes.education4}>
                          <p className={classes.p1} style={{fontFamily: "Lexend, sans-serif",}}>
                            From:{""}
                            {moment(edu.startDate).format("DD-MM-YYYY")} - To:{" "}
                            {moment(edu.endDate).format("DD-MM-YYYY")}
                          </p>
                          <div className={classes.line}></div>
                          <p className={classes.education5} style={{fontFamily: "Lexend, sans-serif",}}>
                            Major: {edu.fieldOfStudy}
                          </p>
                        </div>
                        <span className={classes.span1} style={{fontFamily: "Lexend, sans-serif",}}>
                          Degree: {edu.degree}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.skill}>
                  <div className={classes.skill1} style={{fontFamily: "Lexend, sans-serif",}}>Skill</div>

                  <div className={classes.skill2}>
                    <div className={classes.education3}>
                      <div className={classes.skill3}>
                        <div className={classes.skill4} style={{fontFamily: "Lexend, sans-serif",}}>Skill Name</div>
                        <div className={classes.skill5}>
                          {UserProfileData?.skillSets.map((skill) => (
                            <span key={skill.id} style={{fontFamily: "Lexend, sans-serif",}} className={classes.spanskill}>
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* <div className={classes.skill3}>
                          <div className={classes.skill4}>Description</div>
                          <div className={classes.skill5}>
                            <p className={classes.education5}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: skill.description,
                                }}
                              />
                            </p>
                          </div>
                        </div> */}
                    </div>
                  </div>
                </div>
                <div className={classes.experience}>
                  <div className={classes.experience1} style={{fontFamily: "Lexend, sans-serif",}}>Work Experience</div>

                  <div className={classes.experience2}>
                    {UserProfileData?.experienceDetails.map((exp) => (
                      <div className={classes.experience3} key={exp.id}>
                        <div className={classes.experience4} style={{fontFamily: "Lexend, sans-serif",}}>
                          {" "}
                          From:{""}
                          {moment(exp.startDate).format("DD-MM-YYYY")} - To:{" "}
                          {moment(exp.endDate).format("DD-MM-YYYY")}
                        </div>
                        <div className={classes.experience5}> 
                          <p className={classes.pex} style={{fontFamily: "Lexend, sans-serif",}}>
                            Position: {exp.position}
                          </p>
                          <div className={classes.line}></div>
                          <p className={classes.pex} style={{fontFamily: "Lexend, sans-serif",}}>
                            CompanyName: {exp.companyName}{" "}
                          </p>
                        </div>
                        <div className={classes.experience6}>
                          <div className={classes.experience7}>
                            <div className={classes.experience8}>
                              <div
                              style={{fontFamily: "Lexend, sans-serif",}}
                                dangerouslySetInnerHTML={{
                                  __html: exp.responsibilities,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className={classes.experience9} style={{fontFamily: "Lexend, sans-serif",}}>
                            Achievements:
                          </div>
                          <div className={classes.experience6}>
                            <div className={classes.experience7}>
                              <div className={classes.experience8}>
                                <div
                                style={{fontFamily: "Lexend, sans-serif",}}
                                  dangerouslySetInnerHTML={{
                                    __html: exp.achievements,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
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
      <div className={classes.main14}>
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
export default ElegantTemplate