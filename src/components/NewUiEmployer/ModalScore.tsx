import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./ModalScore.module.css";

import Typography from "@mui/material/Typography";
import PercentileChart from "./PercentileChart";
import { NavLink,  } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import moment from "moment";
import { CustomEmail } from "../../Services/CustomEmail/CustomEmail";
import { message } from "antd";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
interface EducationDetail {
  id: number;
  name: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
}
interface ExperienceDetail {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}
interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string; // HTML content as a string
}

interface CVs {
  id: number;
  url: string;
  name: string;
}
interface UserProfile {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  educationDetails: EducationDetail[];
  experienceDetails: ExperienceDetail[];
  cvs: CVs[];
  skillSets: SkillSet[];
}
interface props {
  onClose?: () => void;
  profile?: UserProfile | null;
  id?: number | null;
  idJob?: string;
}
export default function ModalScore({ onClose, profile, id, idJob }: props) {
  const [emailForm, setEmailForm] = useState<string>("");
  const companyId = localStorage.getItem("CompanyId");
  const [openExp, setOpenExp] = useState<boolean>(false);

  const {
    data: CompanyDa,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["Company-details", companyId], // Sửa lại tên key cho chính xác
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;

  const {
    data: SeekerApply,
    // isLoading: isSeekerLoading,
    // isError: isSeekerError,
  } = useQuery({
    queryKey: ["SeekerApply", idJob],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(idJob), signal }),
    enabled: !!idJob,
  });
  const dataSeekerApply = SeekerApply?.GetSeekers;

  const profileResult = dataSeekerApply?.find((item) => item.id === id);

  console.log("okchua", profileResult);

  const modalRoot = document.getElementById("modalScore");
  // const data = {
  //   overallMatch: 52.52,
  //   skillMatch: 100,
  //   experienceMatch: 0,
  //   contentSimilarity: 41.73,
  // };

  const { mutate, isPending } = useMutation({
    mutationFn: CustomEmail,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["JobPostActivity"],
      //   refetchType: "active", // Ensure an active refetch
      // });
      message.success(`Send Email successfully!`);
      // navigate(`/thankyou/${job?.id}`);
    },
    onError: () => {
      message.error("Failed to Send Email.");
    },
  });

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForm || emailForm.trim() === "") {
      console.error("Email content is required");
      return;
    }

    const formattedCompanyName = companyDataa?.companyName
      .replace(/\s{2,}/g, " ")
      .trim();

    mutate({
      data: {
        content: emailForm,
        companyName: formattedCompanyName,
        // companyName: "fpt",
        reciveUser: profile?.email,
      },
    });
  };

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    // <div className={classes.backdrop} onClick={onClose ? onClose : undefined}>
    <div className={classes.backdrop} onClick={onClose ? onClose : undefined}>
      <motion.dialog
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        initial="hidden"
        animate="visible"
        // exit="hidden"
        // whileHover="hidden"
        open
        className={classes.modall}
      >
        <div className={classes.main1}>
          <div className={classes.main2}>
            <button className={classes.button} onClick={onClose}>
              <svg viewBox="0 0 24 24" className={classes.svg}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M13.414 12l5.293-5.293a.999.999 0 10-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 10-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 101.414 1.414L12 13.414l5.293 5.293a.997.997 0 001.414 0 .999.999 0 000-1.414L13.414 12z"
                ></path>
              </svg>
            </button>
            <div className={classes.main3}>
              <div className={classes.main4}>
                <div className={classes.main5}>
                  <div className={classes.main6}>
                    <div className={classes.main7}>
                      <div className={classes.main8}>
                        <div className={classes.main9}>
                          <div className={classes.main10}>
                            <img />
                            <div className={classes.main11}>
                              <div className={classes.main12}>
                                <Typography
                                  variant="h4"
                                  sx={{
                                    margin: 0,
                                    fontWeight: 600,
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                    padding: 0,
                                    borderWidth: 0,
                                    borderStyle: "solid",
                                  }}
                                >
                                  <span>
                                    {profile?.firstName} {profile?.lastName}
                                  </span>
                                </Typography>
                                <div></div>
                              </div>
                              <div className={classes.main13}>
                                Email: {profile?.email}• phoneNumber:{" "}
                                {profile?.phoneNumber}
                              </div>
                            </div>
                          </div>
                          <div className={classes.main14}>
                            <button className={classes.status}>
                              <span>{profileResult?.status}</span>
                            </button>
                          </div>
                        </div>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            <div className={classes.main17}>
                              <div className={classes.main18}>
                                Experience{" "}
                                <button
                                  type="button"
                                  className={classes.button1}
                                  onClick={() => setOpenExp((prev) => !prev)}
                                >
                                  {" "}
                                  - View More
                                </button>
                              </div>
                            </div>
                            {/* <div className={classes.main19}>
                           
                              {profile?.experienceDetails &&
                              profile?.experienceDetails.length > 0
                                ? profile.experienceDetails.map((exp) => (
                                    <div className={classes.main20}>
                                      <div className={classes.main21}>
                                        <div className={classes.main22}>
                                          <div className={classes.main23}>
                                            <span>{exp.companyName}</span>
                                          </div>
                                          <span className={classes.span}>
                                            <span className={classes.span1}>
                                              {exp.position}
                                            </span>
                                          </span>
                                          <div className={classes.main24}>
                                            <span className={classes.main25}>
                                              From:{""}
                                              {moment(exp.startDate).format(
                                                "DD-MM-YYYY"
                                              )}{" "}
                                              - To:{" "}
                                              {moment(exp.endDate).format(
                                                "DD-MM-YYYY"
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={classes.main26}>
                                        <span className={classes.span2}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: exp.achievements,
                                            }}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  ))
                                : undefined}
                            </div> */}
                            <div className={classes.main144}>
                              {profile?.experienceDetails &&
                              profile?.educationDetails.length > 0
                                ? profile.experienceDetails.map((exp) => (
                                    <div className={classes.main155}>
                                      <div className={classes.main166}>
                                        <div className={classes.main177}>
                                          <div className={classes.main188}>
                                            <span>
                                              Company Name: {exp.companyName}
                                            </span>
                                          </div>
                                          <span className={classes.spanne}>
                                            Position: {exp.position}
                                          </span>
                                          <div className={classes.main199}>
                                            <span className={classes.span1}>
                                              From:{""}
                                              {moment(exp.startDate).format(
                                                "DD-MM-YYYY"
                                              )}{" "}
                                              - To:{" "}
                                              {moment(exp.endDate).format(
                                                "DD-MM-YYYY"
                                              )}
                                            </span>
                                            {/* {". "}
                                        <span>asdasdas</span> */}
                                          </div>
                                          {openExp && (
                                            <>
                                              <div className={classes.main200}>
                                                <span>
                                                  Responsibilities:
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        exp.responsibilities,
                                                    }}
                                                  />
                                                </span>
                                              </div>
                                              <div className={classes.main211}>
                                                <div
                                                  className={classes.main222}
                                                >
                                                  Achievements
                                                </div>
                                                <div
                                                  className={classes.main233}
                                                >
                                                  <div
                                                    className={classes.main244}
                                                  ></div>
                                                  <span>
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          exp.achievements,
                                                      }}
                                                    />
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : undefined}
                            </div>
                          </div>
                        </div>
                        {/* Education */}
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>Education</div>
                            {/* {profile?.educationDetails &&
                            profile.educationDetails.length > 0
                              ? profile.educationDetails.map((edu) => (
                                  <div className={classes.main32}>
                                    <div className={classes.main33}>
                                      <span>{edu.name}</span>
                                    </div>
                                    <div className={classes.main34}>
                                      <span>
                                        <span>
                                          {edu.institutionName} {" • "}{" "}
                                          <span>
                                            {" "}
                                            From:{" "}
                                            {moment(edu.startDate).format(
                                              "DD-MM-YYYY"
                                            )}{" "}
                                            - To:{" "}
                                            {moment(edu.endDate).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </span>{" "}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                ))
                              : undefined} */}
                            {profile?.educationDetails &&
                            profile?.educationDetails.length > 0
                              ? profile.educationDetails.map((edu) => (
                                  <div key={edu.id} className={classes.main255}>
                                    <div className={classes.main266}>
                                      <span>
                                        School name: {edu.institutionName}
                                      </span>
                                    </div>
                                    <div className={classes.main277}>
                                      <span>
                                        Field of Study: {edu.fieldOfStudy} -
                                        GPA: {edu.gpa}
                                      </span>
                                    </div>
                                    <div className={classes.main277}>
                                      <span>
                                        From:{" "}
                                        {moment(edu.startDate).format(
                                          "DD-MM-YYYY"
                                        )}{" "}
                                        - To:{" "}
                                        {moment(edu.endDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {/* Skills */}
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>Skills</div>
                            <div className={classes.main29}>
                              {profile?.skillSets &&
                              profile.skillSets.length > 0
                                ? profile?.skillSets.map((skill) => (
                                    <div className={classes.main30}>
                                      <div className={classes.main31}>
                                        <span>{skill.name}</span>
                                      </div>
                                    </div>
                                  ))
                                : undefined}
                            </div>
                          </div>
                        </div>
                        {/* chart */}
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.titleChart}>
                              Matching Details
                            </div>
                            <div>
                              {profileResult?.analyzedResult.matchDetails && (
                                <PercentileChart
                                  profileResult={profileResult}
                                  overallMatch={
                                    profileResult?.analyzedResult.matchDetails
                                      .scores.overallMatch
                                  }
                                  skillMatch={
                                    profileResult?.analyzedResult.matchDetails
                                      .scores.skillMatch
                                  }
                                  experienceMatch={
                                    profileResult?.analyzedResult.matchDetails
                                      .scores.experienceMatch
                                  }
                                  contentSimilarity={
                                    profileResult?.analyzedResult.matchDetails
                                      .scores.contentSimilarity
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>
                              Skills matching
                            </div>
                            {
                               profileResult?.analyzedResult.matchDetails && (
                                <div className={classes.main29}>
                                {profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.matchingSkills &&
                                profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.matchingSkills.length > 0
                                  ? profileResult?.analyzedResult.matchDetails.skillAnalysis.matchingSkills.map(
                                      (item) => (
                                        <div className={classes.main30}>
                                          <div className={classes.matching}>
                                            <span>{item}</span>
                                          </div>
                                        </div>
                                      )
                                    )
                                  : undefined}
                              </div>
                              )
                            }
                          
                          </div>
                        </div>
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>Skills Missing</div>
                            {
                              profileResult?.analyzedResult .matchDetails&& (
                                <div className={classes.main29}>
                                {profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.missingSkills &&
                                profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.missingSkills.length > 0
                                  ? profileResult.analyzedResult.matchDetails.skillAnalysis.missingSkills.map(
                                      (item) => (
                                        <div className={classes.main30}>
                                          <div className={classes.missing}>
                                            <span>{item}</span>
                                          </div>
                                        </div>
                                      )
                                    )
                                  : undefined}
                              </div>
                              )
                            }
                         
                          </div>
                        </div>
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>
                              Additional Skills
                            </div>
                            {
                               profileResult?.analyzedResult.matchDetails && (
                                <div className={classes.main29}>
                                {profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.additionalSkills &&
                                profileResult?.analyzedResult.matchDetails
                                  .skillAnalysis.additionalSkills.length > 0
                                  ? profileResult.analyzedResult.matchDetails.skillAnalysis.additionalSkills.map(
                                      (item) => (
                                        <div className={classes.main30}>
                                          <div className={classes.additional}>
                                            <span>{item}</span>
                                          </div>
                                        </div>
                                      )
                                    )
                                  : undefined}
                                {/* <div className={classes.main30}>
                                  <div className={classes.additional}>
                                    <span>React</span>
                                  </div>
                                </div> */}
                              </div>
                              )
                            }
                         
                          </div>
                        </div>
                        {profileResult?.extractedCVInfo ? (
                          <div className={classes.main27}>
                            {" "}
                            <div className={classes.main16}>
                              <div className={classes.main28}>Exact CVS:</div>
                              <div className={classes.main28}>
                                Personal Details:
                              </div>
                              {profileResult.extractedCVInfo.data &&
                              profileResult.extractedCVInfo.data.length > 0
                                ? profileResult.extractedCVInfo.data.map(
                                    (item) => {
                                      return (
                                        <div>
                                          <div className={classes.main2222}>
                                            Contact:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.contact
                                              ) &&
                                              item.personal.contact.length > 0
                                                ? item.personal.contact.join(
                                                    ", "
                                                  )
                                                : "No contacts available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Email:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.email
                                              ) &&
                                              item.personal.email.length > 0
                                                ? item.personal.email.join(", ")
                                                : "No emails available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Github:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.github
                                              ) &&
                                              item.personal.github.length > 0
                                                ? item.personal.github.join(
                                                    ", "
                                                  )
                                                : "No GitHub available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Linkedin:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.linkedin
                                              ) &&
                                              item.personal.linkedin.length > 0
                                                ? item.personal.linkedin.join(
                                                    ", "
                                                  )
                                                : "No linkedin available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Location:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.location
                                              ) &&
                                              item.personal.location.length > 0
                                                ? item.personal.location.join(
                                                    ", "
                                                  )
                                                : "No location available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Name:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.personal.name
                                              ) && item.personal.name.length > 0
                                                ? item.personal.name.join(", ")
                                                : "No name available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            Education:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.professional.education
                                              ) &&
                                              item.professional.education
                                                .length > 0
                                                ? item.professional.education.map(
                                                    (edu) => edu.university
                                                  )
                                                : "No name available"}
                                            </div>
                                          </div>
                                          <div className={classes.main28}>
                                            Experience:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.professional.experience
                                              ) &&
                                              item.professional.experience
                                                .length > 0
                                                ? item.professional.experience.map(
                                                    (exp) => (
                                                      <div
                                                        className={
                                                          classes.main155
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            classes.main166
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              classes.main177
                                                            }
                                                          >
                                                            <div
                                                              className={
                                                                classes.main188
                                                              }
                                                            >
                                                              <span>
                                                                Company Name:{" "}
                                                              </span>
                                                              <div
                                                                className={
                                                                  classes.main29
                                                                }
                                                              >
                                                                {Array.isArray(
                                                                  exp.company
                                                                ) &&
                                                                exp.company
                                                                  .length > 0
                                                                  ? exp.company.join(
                                                                      ", "
                                                                    )
                                                                  : "No company available"}
                                                              </div>
                                                            </div>
                                                            <div
                                                              className={
                                                                classes.main2222
                                                              }
                                                            >
                                                              Personal Project:
                                                              <div
                                                                className={
                                                                  classes.main29
                                                                }
                                                              >
                                                                {Array.isArray(
                                                                  exp.project_experience
                                                                ) &&
                                                                exp
                                                                  .project_experience
                                                                  .length > 0
                                                                  ? exp.project_experience.join(
                                                                      ", "
                                                                    )
                                                                  : "No project available"}
                                                              </div>
                                                            </div>
                                                            <div
                                                              className={
                                                                classes.main2222
                                                              }
                                                            >
                                                              Role :
                                                              <div
                                                                className={
                                                                  classes.main29
                                                                }
                                                              >
                                                                {Array.isArray(
                                                                  exp.role
                                                                ) &&
                                                                exp.role
                                                                  .length > 0
                                                                  ? exp.role.join(
                                                                      ", "
                                                                    )
                                                                  : "No role available"}
                                                              </div>
                                                            </div>
                                                            <div
                                                              className={
                                                                classes.main2222
                                                              }
                                                            >
                                                              Years:
                                                              <div
                                                                className={
                                                                  classes.main29
                                                                }
                                                              >
                                                                {Array.isArray(
                                                                  exp.years
                                                                ) &&
                                                                exp.years
                                                                  .length > 0
                                                                  ? `${exp.years.join(
                                                                      ", "
                                                                    )} years`
                                                                  : "No years available"}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )
                                                : "No experience available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            non_technical_skills:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.professional
                                                  .non_technical_skills
                                              ) &&
                                              item.professional
                                                .non_technical_skills.length > 0
                                                ? item.professional.non_technical_skills.join(
                                                    ", "
                                                  )
                                                : "No non_technical_skills available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            technical_skills:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.professional
                                                  .technical_skills
                                              ) &&
                                              item.professional.technical_skills
                                                .length > 0
                                                ? item.professional.technical_skills.join(
                                                    ", "
                                                  )
                                                : "No technical_skills available"}
                                            </div>
                                          </div>
                                          <div className={classes.main2222}>
                                            tools:
                                            <div className={classes.main29}>
                                              {Array.isArray(
                                                item.professional.tools
                                              ) &&
                                              item.professional.tools.length > 0
                                                ? item.professional.tools.join(
                                                    ", "
                                                  )
                                                : "No tools available"}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                                : undefined}
                              {/* <div className={classes.main28}>
                              Contact:
                              </div> */}
                            </div>
                          </div>
                        ) : undefined}
                      </div>
                    </div>
                  </div>
                  <div className={classes.main35}>
                    <nav className={classes.nav}>
                      <NavLink
                        // to="/EmployerJob/applicants/jobs/2"
                        to={`?mode=Email`}
                        className={({ isActive }) =>
                          isActive ? classes.active : undefined
                        }
                        end
                      >
                        <div className={classes.main36}>
                          <span>Send Email</span>
                        </div>
                      </NavLink>
                    
                    </nav>

                    <form
                      action=""
                      className={classes.form}
                      onSubmit={handleSendEmail}
                    >
                      <div className={classes.main37}>
                        <div className={classes.main38}>
                          <div className={classes.main39}>
                            <div className={classes.main40}>
                              <button className={classes.main41}>
                                Saved Templates ✦
                              </button>
                            </div>
                          </div>
                          <div className={classes.main42}></div>
                        </div>
                        <div className={classes.main50}>
                          <div className={classes.main51}>
                            <textarea
                              name=""
                              id=""
                              className={classes.main52}
                              placeholder="Start writing your Email...."
                              onChange={(e) => setEmailForm(e.target.value)}
                              value={emailForm}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className={classes.main53}>
                        {isPending ? (
                          <button className={classes.main54}>
                            Wait a seconds
                          </button>
                        ) : (
                          <button type="submit" className={classes.main54}>
                            Send Request Email
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.dialog>
    </div>,
    modalRoot
  );
}
