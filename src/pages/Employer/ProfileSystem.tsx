import React, { useRef } from "react";
import classes from "./ProfileSystem.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import moment from "moment";
import html2pdf from "html2pdf.js";

export default function ProfileSystem() {
  const { ProfileId } = useParams();

  const cvRef = useRef<HTMLDivElement>(null);
  // const userId = localStorage.getItem("userId");

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(ProfileId), signal: signal }),
    staleTime: 1000,
  });
  const handleDownload = () => {
    const element = cvRef.current;
    if (element) {
      html2pdf()
        .from(element)
        .save(`${UserProfileData?.firstName}${UserProfileData?.lastName}.pdf`);
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const UserProfileData = UserProfile?.UserProfiles;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.header}>
          <div style={{ display: "flex", alignItems: "center",cursor:'pointer' }} onClick={handleBack}>
            <ArrowBackIosNewOutlinedIcon />
            Back
          </div>
          <div>
            View Profile Of {UserProfileData?.firstName}{" "}
            {UserProfileData?.lastName}
          </div>
          <div className={classes.main2}  onClick={handleDownload}>
            <DownloadIcon />
            Download Profile as PDF
          </div>
        </div>

        <div className={classes.frame} ref={cvRef}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <div className={classes.main9}>
                        {UserProfileData?.firstName} {UserProfileData?.lastName}
                      </div>
                      <div className={classes.main10}>
                        <div className={classes.main11}>
                          <p className={classes.p}>
                            {UserProfileData?.phoneNumber}
                          </p>
                          <p className={classes.main12}>
                            {UserProfileData?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <section>
                      <div className={classes.main13}>
                        <div className={classes.skill}>Skills</div>
                        <hr className={classes.hr} />
                        <div className={classes.main14}>
                          <ul className={classes.ul}>
                            {UserProfileData?.skillSets.map((skill) => (
                              <li className={classes.li}>
                                <span className={classes.span}>
                                  <strong className={classes.strong}>
                                    {skill.name}
                                  </strong>
                                  <p className={classes.p1}>
                                    {" "}
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: skill.description,
                                      }}
                                    />
                                  </p>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                    <section className={classes.education}>
                      <div className={classes.edu1}>
                        <div className={classes.edu2}>Education</div>
                        <hr className={classes.hr} />
                        {UserProfileData?.educationDetails.map((edu) => (
                          <div
                            className={classes.edu3}
                            style={{ marginBottom: "20px" }}
                          >
                            <div>
                              <strong>
                                School Name: {edu.name} | From:{""}
                                {moment(edu.startDate).format("YYYY-MM-DD")} -
                                To: {moment(edu.endDate).format("YYYY-MM-DD")}
                              </strong>
                            </div>
                            <div>
                              <strong>Major: {edu.fieldOfStudy}</strong>
                            </div>
                            <div className={classes.edu4}>
                              <p className={classes.p2}>Degree: {edu.degree}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className={classes.experience}>
                      <div className={classes.exp1}>
                        <div className={classes.edu2}>Experience</div>
                        <hr className={classes.hr} />
                        {UserProfileData?.experienceDetails.map((exp) => (
                          <div>
                            <div className={classes.exp2}>
                              {" "}
                              From:{""}
                              {moment(exp.startDate).format("YYYY-MM-DD")} - To:{" "}
                              {moment(exp.endDate).format("YYYY-MM-DD")}
                            </div>
                            <div>
                              <strong>
                                Position: {exp.position} | Company Name:{" "}
                                {exp.companyName}
                              </strong>
                            </div>
                            <div className={classes.edu4}>
                              <p className={classes.p2}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: exp.responsibilities,
                                  }}
                                />
                              </p>
                            </div>
                            <div>
                              <strong>Project:</strong>
                            </div>
                            <div className={classes.edu4}>
                              <p className={classes.p2}>
                                {" "}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: exp.achievements,
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
