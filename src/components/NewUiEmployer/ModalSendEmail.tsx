import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./ModalSendEmail.module.css";

import Typography from "@mui/material/Typography";

import { NavLink, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import moment from "moment";
import { CustomEmail } from "../../Services/CustomEmail/CustomEmail";
import { message } from "antd";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AddUserJobPostActivity } from "../../Services/JobsPostActivity/AddUser";
import { queryClient } from "../../Services/mainService";
import { GetJobPostById } from "../../Services/JobsPost/GetJobPostById";
// import { PostCVsAI } from "../../Services/CVService/PostCVAI";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { PostCVsAI } from "../../Services/CVService/PostCVAI";
interface EducationDetail {
  id: number;
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
  shorthand: string | null;
  description: string | null;
}

interface CVs {
  id: number;
  url: string;
  name: string;
}

interface UserProfile {
  id: number;
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
  profile?: UserProfile | undefined | null;
  id?: number | null;
  idJob?: string;
}
export default function ModalSendEmail({ onClose, profile, idJob }: props) {
  const [emailForm, setEmailForm] = useState<string>("");
  const companyId = localStorage.getItem("CompanyId");
  const [openExp, setOpenExp] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const isEmail = searchParams.get("mode") === "Email";

  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);
  const [selectedCvUrl, setSelectedCvUrl] = useState<string | null>(null);
  const handleCVSelect = (cv: CVs) => {
    setSelectedCvId(cv.id);
    setSelectedCvUrl(cv.url);
  };

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

  const feedBackUserJob = dataSeekerApply?.find(
    (item) => item.id === Number(profile?.id)
  );

  const { data: jobData } = useQuery({
    queryKey: ["Job-details", idJob],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(idJob), signal }),
    enabled: !!idJob,
  });

  const job = jobData?.JobPosts;

  // const profileResult = dataSeekerApply?.find((item) => item.id === id);

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

  const { mutate: PostCVAi } = useMutation({
    mutationFn: PostCVsAI,
    onSuccess: (data) => {
      console.log("ok chua ta ", data);

      // queryClient.invalidateQueries({
      //   queryKey: ["JobPostActivity"],
      //   refetchType: "active", // Ensure an active refetch
      // });
      // message.success(`CV Apply to ${job?.jobTitle} successfully!`);
      // navigate(`/thankyou/${job?.id}`);
    },

    onError: () => {
      message.error("Failed to Apply CV.");
    },
  });

  const { mutate: Add, isPending: Adding } = useMutation({
    mutationFn: AddUserJobPostActivity,
    onSuccess: async () => {
      try {
        await PostCVAi({
          data: {
            jobPostId: job?.id,
            url: selectedCvUrl ?? "",
            cvId: selectedCvId,
            userId: profile?.id,
          },
        });
        queryClient.invalidateQueries({
          queryKey: ["JobPostActivity"],
          refetchType: "active",
        });
        queryClient.invalidateQueries({
          queryKey: ["JobPostActivity"],
          refetchType: "active",
        });
        queryClient.invalidateQueries({
          queryKey: ["SeekerApply"],
          refetchType: "active",
        });
        message.success("Add user To InterView sucessfully");
      } catch {
        message.error("Failed to apply CV after adding user to interview.");
      }
    },
    // onSuccess: () => {

    //   PostCVAi({
    //     data: {
    //       jobPostId: job?.id,
    //       url: selectedCvUrl,
    //     },
    //   });

    //   message.success(
    //     `Add user to InterView at  ${job?.jobTitle} successfully!`
    //   );
    // },

    onError: () => {
      message.error("Failed to Add User InterView.");
    },
  });

  const handleSendCvApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCvId && selectedCvUrl) {
      try {
        // Show loading indicator here if needed
        // const response = await fetch(selectedCv?.url);
        // const blob = await response.blob();

        // // Convert Blob to File
        // const file = new File([blob], selectedCv?.name || "uploaded_file", {
        //   type: blob.type,
        // });

        // Send file via PostCVAi
        // await PostCVAi({
        //   data: {
        //     jobPostId: job?.id,
        //     url: selectedCvUrl,
        //   },
        // });

        // Trigger mutation for further updates
        await Add({
          data: {
            jobPostId: job?.id,
            cvId: selectedCvId,
            userId: profile?.id,
          },
        });

        // message.success("CV sent successfully!");
      } catch (error) {
        console.error("Error during CV submission:", error);
        message.error("Failed to send CV. Please try again.");
      }
    } else {
      message.warning("Please select a CV to apply.");
    }
  };
  const expiryDate = job?.expiryDate ? new Date(job?.expiryDate) : null;
  const today = new Date();

  const isExpired = expiryDate ? expiryDate < today : undefined;

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
                              <span>Resume</span>
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
                                    <div
                                      className={classes.main155}
                                      key={exp.id}
                                    >
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
                                    <div className={classes.main30} key={skill.id}>
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
                        {/* <div className={classes.main27}>
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
                        </div> */}

                        {/* <div className={classes.main27}>
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
                        </div> */}
                        {/* <div className={classes.main27}>
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
                        </div> */}
                        {/* <div className={classes.main27}>
                          <div className={classes.main16}>
                            <div className={classes.main28}>Additional Skills</div>
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
                           
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className={classes.main35}>
                    <nav className={classes.nav}>
                      <NavLink
                        to={`?mode=Email`}
                        className={isEmail ? classes.active : undefined}
                        end
                      >
                        <div className={classes.main36}>
                          <span>Send Email</span>
                        </div>
                      </NavLink>
                      <NavLink
                        to={`?mode=CVs`}
                        // className={({ isActive }) =>
                        //   isActive ? classes.active : undefined
                        // }
                        className={!isEmail ? classes.active : undefined}
                        style={{ marginLeft: "24px" }}
                        end
                      >
                        <div className={classes.main36}>
                          <span>View CVS</span>
                        </div>
                      </NavLink>
                    </nav>
                    {isEmail ? (
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
                    ) : (
                      <form
                        action=""
                        className={classes.form}
                        onSubmit={handleSendCvApply}
                      >
                        <div className={classes.dropdown}>
                          {profile?.cvs.map((cv) => (
                            <div
                              key={cv.id}
                              className={`${
                                selectedCvId === cv.id
                                  ? classes.formupload1
                                  : classes.formupload
                              }`}
                            >
                              <div className={classes.check}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={selectedCvId === cv.id}
                                        onChange={() => handleCVSelect(cv)}
                                        name="form"
                                      />
                                    }
                                    label="Use This CV"
                                  />
                                </FormGroup>
                              </div>
                              <div className={classes.file}>
                                <div className={classes.upload5}>
                                  <div className={classes.filename}>
                                    <a
                                      href={cv.url}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "blue",
                                      }}
                                      className={classes.a}
                                    >
                                      {cv.name}
                                    </a>
                                    <a
                                      href={cv.url}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        textDecoration: "none",
                                        color: "blue",
                                      }}
                                      className={classes.a}
                                    >
                                      <VisibilityIcon
                                        style={{ color: "blue" }}
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className={classes.main53}>
                          {Adding ? (
                            <button className={classes.main54}>
                              Wait a seconds
                            </button>
                          ) : feedBackUserJob ? (
                            <button type="button" className={classes.main54}>
                              Status: {feedBackUserJob.status}
                            </button>
                          ) : isExpired ? (
                            <button disabled={true} className={classes.main544}>
                             Application deadline
                            </button>
                          ) : (
                            <button type="submit" className={classes.main54}>
                              Add To Interview
                            </button>
                          )}
                        </div>
                      </form>
                    )}
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
