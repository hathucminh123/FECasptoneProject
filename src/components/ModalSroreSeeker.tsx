import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./ModalSroreSeeker.module.css";

import Typography from "@mui/material/Typography";
import PercentileChart from "./NewUiEmployer/PercentileChart";
import { NavLink } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../Services/JobsPost/GetSeekerJobPost";
import moment from "moment";
import Rating from "@mui/material/Rating";

import Box from "@mui/material/Box";
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

interface SeekersByJobPost {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    cvId: number;
    cvPath: string;
    jobPostActivityId: number;
    status: string;
    jobPostActivityComments: Comment[];
    analyzedResult: AnalyzedResult; // Integrating AnalyzedResult here
  }
  
  interface Comment {
    id: number;
    commentText: string;
    commentDate: string;
    rating: number;
  }
  
  interface AnalyzedResult {
    success: boolean;
    processingTime: number;
    deviceUsed: string;
    matchDetails: MatchDetails;
  }
  
  interface MatchDetails {
    jobId: number;
    jobTitle: string;
    candidateName: string;
    candidateEmail: string;
    scores: Scores;
    skillAnalysis: SkillAnalysis;
    experienceAnalysis: ExperienceAnalysis;
    recommendation: Recommendation;
  }
  
  interface Scores {
    overallMatch: number;
    skillMatch: number;
    experienceMatch: number;
    contentSimilarity: number;
  }
  
  interface SkillAnalysis {
    matchingSkills: string[];
    missingSkills: string[];
    additionalSkills: string[];
  }
  
  interface ExperienceAnalysis {
    requiredYears: number;
    candidateYears: number;
    meetsRequirement: boolean;
  }
  
  interface Recommendation {
    category: string;
    action: string;
  }
  
interface props {
  onClose?: () => void;
  profile?: UserProfile | null;
  id?: number | null;
  idJob?: string |number;
  feedBackUserJob:SeekersByJobPost|undefined
}
export default function ModalSroreSeeker({
  onClose,
  profile,
  id,
  idJob,
  feedBackUserJob,
}: props) {

  const [openExp, setOpenExp] = useState<boolean>(false);
 

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

  const modalRoot = document.getElementById("modalScore");
  // const data = {
  //   overallMatch: 52.52,
  //   skillMatch: 100,
  //   experienceMatch: 0,
  //   contentSimilarity: 41.73,
  // };

 


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
                            </div>
                          </div>
                        </div>

                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>
                              Skills matching
                            </div>
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
                          </div>
                        </div>
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>Skills Missing</div>
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
                          </div>
                        </div>
                        <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>
                              Additional Skills
                            </div>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.main35}>
                    <nav className={classes.nav}>
                      <NavLink
                        to=""
                        className={({ isActive }) =>
                          isActive ? classes.active : undefined
                        }
                        end
                      >
                        <div className={classes.main36}>
                          <span>Comment</span>
                        </div>
                      </NavLink>
                    </nav>
                    <form
                      action=""
                      className={classes.form}
                      //   onSubmit={handleSendEmail}
                    >
                      <Box component="div" className={classes.commentContainer}>
                        {feedBackUserJob && feedBackUserJob.jobPostActivityComments.length > 0 ? (
                        feedBackUserJob?.jobPostActivityComments.map((comment) => (
                            <div key={comment.id} className={classes.comment}>
                              <Typography variant="body1" component="p">
                                <strong>Comment:</strong> {comment.commentText}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Date:</strong>{" "}
                                {new Date(
                                  comment.commentDate
                                ).toLocaleDateString()}
                              </Typography>
                              <Box display="flex" alignItems="center">
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  <strong>Rating:</strong>
                                </Typography>
                                <Rating
                                  name={`rating-${comment.id}`}
                                  value={comment.rating}
                                  readOnly
                                  precision={0.5}
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                              <hr className={classes.commentSeparator} />
                            </div>
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No comments available.
                          </Typography>
                        )}
                      </Box>
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