import React, { useState } from "react";
import classes from "./RecommendTalents.module.css";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";

import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";

import { ListSeekers } from "../../Services/ListSeekers/ListSeekers";
import { AnimatePresence } from "framer-motion";
import ModalSendEmail from "../../components/NewUiEmployer/ModalSendEmail";

import NoJobApplicants from "../../components/NewUiEmployer/NoJobApplicants";

// import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";
// import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";

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
  proficiencyLevel?: string | null;
}

interface CVs {
  id: number;
  url: string;
  name: string;
}
interface Benefits {
  id: number;
  name: string;
}
interface certificates {
  id: number;
  certificateName: string;
  certificateOrganization: string;
  description: string;
  certificateURL: string;
  issueDate: string;
}

interface Awards {
  id: number;
  awardName: string;
  awardOrganization: string;
  description: string;
  issueDate: string;
}

interface UserProfile {
  id: number;
  userName: string;
  isLookingForJob: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  coverLetter?: string;
  educationDetails: EducationDetail[];
  experienceDetails: ExperienceDetail[];
  cvs: CVs[];
  skillSets: SkillSet[];
  benefits: Benefits[];
  awards: Awards[];
  certificates: certificates[];
  // userAccountServices?:data[];
}

export default function RecommendTalents() {
  const { id } = useParams();
  // const JobId = Number(id);
  // const [openExp, setOpenExp] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // const handleOpen = () => setOpen(true);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setDropdownOpen(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleRemoveSkill = (skillToRemove: SkillSet) => {
  //   setSkills(skills.filter((skill) => skill !== skillToRemove));
  //   setSkillId(skillId.filter((skill) => skill !== skillToRemove.id));
  // };

  //   const [commentText, setCommentText] = useState<string>("");
  //   const [value, setValue] = React.useState<number | null>(2);

  //   const { mutate } = useMutation({
  //     mutationFn: PutJobPostActivityStatus,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["SeekerApply"],
  //         refetchType: "active",
  //       });
  //       message.success("Status Details Update Successfully");
  //     },
  //     onError: () => {
  //       message.error("Failed to Update the status set");
  //     },
  //   });

  //   const handlePutStatusPassed = (id: number) => {
  //     mutate({
  //       data: {
  //         jobPostActivityId: id,
  //         status: 3,
  //       },
  //     });
  //   };
  //   const handlePutStatusRejected = (id: number) => {
  //     mutate({
  //       data: {
  //         jobPostActivityId: id,
  //         status: 2,
  //       },
  //     });
  //   };
  //   const handlePutStatusInterView = (id: number) => {
  //     mutate({
  //       data: {
  //         jobPostActivityId: id,
  //         status: 5,
  //       },
  //     });
  //   };

  const handleExpandClick = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const [openModalScore, setOpenModalScore] = useState<boolean>(false);
  const [profileScore, setProfileScore] = useState<UserProfile | null>(null);
  const handleCloseModalScore = () => {
    setOpenModalScore(false);
  };

  const handleOpenMdalScore = (profile: UserProfile) => {
    setOpenModalScore(true);
    setProfileScore(profile);
    // setIdApplicants(id);
  };
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 5;

  const {
    data: ListSeeker,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["JobSeekerRole", pageIndex, id],
    queryFn: ({ signal }) =>
      ListSeekers({ signal, jobPostId: Number(id), pageIndex, pageSize }),
    enabled: !!id,
  });

  const ListSeekrData = ListSeeker?.items ?? [];
  const totalPages = Math.ceil((ListSeeker?.totalCount || 0) / pageSize); // Calculate total pages

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value);
  };
  if (isLoading) {
    return <div className={classes.loading}>Loading talents...</div>;
  }

  if (isError) {
    return <div className={classes.error}>Error loading talents.</div>;
  }

  if (ListSeekrData.length === 0) {
    return (
      <NoJobApplicants text="There are no  Talents avalable For Job Yet" />
    );
  }

  return (
    <div className={classes.main}>
      <AnimatePresence>
        {openModalScore && (
          <ModalSendEmail
            onClose={handleCloseModalScore}
            profile={profileScore}
            // id={idApplicants}
            idJob={id}
          />
        )}
      </AnimatePresence>

      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            {/* {isFetchingProfile ? (
              <div>Loading CV data...</div>
            ) : ( */}
            {ListSeekrData?.map((data) => {
              return (
                <div className={classes.main4} key={data.id}>
                  <div className={classes.main5}>
                    <div className={classes.main6}>
                      {/* <img src="" alt="" className={classes.img} /> */}
                      <div className={classes.main7}>
                        <div className={classes.main8}>
                          <Typography
                            variant="h4"
                            sx={{
                              margin: 0,
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "24px",
                              padding: 0,
                              boxSizing: "border-box",
                            }}
                          >
                            {data.firstName} {data.lastName}
                          </Typography>
                        </div>
                        <div className={classes.main34}>
                          Email: {data.email} • phoneNumber:{data.phoneNumber}
                        </div>
                      </div>
                    </div>
                    <div className={classes.main9}>
                      <button type="button" className={classes.button}>
                        <span> Resume {" ✦"}</span>
                      </button>
                    </div>
                  </div>
                  <div className={classes.main10}>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Experience{" -"}
                          <button
                            type="button"
                            className={classes.button1}
                            onClick={() => handleExpandClick(data.id)}
                            // onClick={() => setOpenExp((prev) => !prev)}
                          >
                            {" "}
                            {expandedId === data.id ? "Hide" : "View More"}
                          </button>
                        </div>
                      </div>
                      {/* map Exprience*/}
                      <div className={classes.main14}>
                        {data.experienceDetails &&
                        data.experienceDetails.length > 0
                          ? data.experienceDetails.map((exp) => (
                              <div className={classes.main15} key={exp.id}>
                                <div className={classes.main16}>
                                  <div className={classes.main17}>
                                    <div className={classes.main18}>
                                      <span>
                                        Company Name: {exp.companyName}
                                      </span>
                                    </div>
                                    <span className={classes.span}>
                                      Position: {exp.position}
                                    </span>
                                    <div className={classes.main19}>
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
                                    {expandedId === data.id && (
                                      <>
                                        <div className={classes.main20}>
                                          <span>
                                            Responsibilities:
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: exp.responsibilities,
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <div className={classes.main21}>
                                          <div className={classes.main22}>
                                            Achievements
                                          </div>
                                          <div className={classes.main23}>
                                            <div
                                              className={classes.main24}
                                            ></div>
                                            <span>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: exp.achievements,
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
                  {/* edu */}
                  <div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Education{" :"}
                          {/* <button
                              type="button"
                              className={classes.button1}
                              onClick={() => setOpenExp((prev) => !prev)}
                            >
                              {" "}
                              - View More
                            </button> */}
                        </div>
                      </div>
                      {data.educationDetails && data.educationDetails.length > 0
                        ? data.educationDetails.map((edu) => (
                            <div
                              key={edu.id}
                              className={classes.main25}
                              style={{ marginBottom: "10px" }}
                            >
                              <div className={classes.main26}>
                                <span>School name: {edu.institutionName}</span>
                              </div>
                              <div className={classes.main27}>
                                <span>
                                  Field of Study: {edu.fieldOfStudy} - GPA:{" "}
                                  {edu.gpa}
                                </span>
                              </div>
                              <div className={classes.main27}>
                                <span>Degree: {edu.degree}</span>
                              </div>
                              <div className={classes.main27}>
                                <span>
                                  From:{" "}
                                  {moment(edu.startDate).format("DD-MM-YYYY")} -
                                  To: {moment(edu.endDate).format("DD-MM-YYYY")}
                                </span>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Certificates:
                          {/* <button
                              type="button"
                              className={classes.button1}
                              onClick={() => setOpenExp((prev) => !prev)}
                            >
                              {" "}
                              - View More
                            </button> */}
                        </div>
                      </div>
                      {data.certificates && data.certificates.length > 0
                        ? data.certificates.map((edu) => (
                            <div
                              key={edu.id}
                              className={classes.main25}
                              style={{ marginBottom: "10px" }}
                            >
                              <div className={classes.main26}>
                                <span>
                                  Certificates name: {edu.certificateName}
                                </span>
                              </div>
                              <div className={classes.main27}>
                                <span>
                                  Organization: {edu.certificateOrganization} -
                                  URL:{" "}
                                  <a
                                    href={edu.certificateURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      textDecoration: "underline",
                                      color: "blue",
                                    }}
                                  >
                                    {edu.certificateURL.length > 50
                                      ? `${edu.certificateURL.substring(
                                          0,
                                          47
                                        )}...`
                                      : edu.certificateURL}
                                  </a>
                                </span>
                              </div>
                              <div className={classes.main27}>
                                <span>
                                  Issue Date:{" "}
                                  {moment(edu.issueDate).format("DD-MM-YYYY")}{" "}
                                  {/* - To:{" "}
                                    {moment(edu.endDate).format("DD-MM-YYYY")} */}
                                </span>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Award{":"}
                          {/* <button
                              type="button"
                              className={classes.button1}
                              onClick={() => setOpenExp((prev) => !prev)}
                            >
                              {" "}
                              - View More
                            </button> */}
                        </div>
                      </div>
                      {data.awards && data.awards.length > 0
                        ? data.awards.map((edu) => (
                            <div
                              key={edu.id}
                              className={classes.main25}
                              style={{ marginBottom: "10px" }}
                            >
                              <div className={classes.main26}>
                                <span>Awards name: {edu.awardName}</span>
                              </div>
                              <div className={classes.main27}>
                                <span>
                                  Organization: {edu.awardOrganization} -
                                  description: {edu.description}
                                </span>
                              </div>

                              <div className={classes.main27}>
                                <span>
                                  Issue Date:{" "}
                                  {moment(edu.issueDate).format("DD-MM-YYYY")}{" "}
                                  {/* - To:{" "}
                                    {moment(edu.endDate).format("DD-MM-YYYY")} */}
                                </span>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Skills{" :"}
                          {/* <button
                type="button"
                className={classes.button1}
                onClick={() => setOpenExp((prev) => !prev)}
              >
                {" "}
                - View More
              </button> */}
                        </div>
                      </div>

                      <div className={classes.main28}>
                        {data.skillSets.map((skill) => (
                          <>
                            <div
                              className={classes.main13}
                              style={{ marginTop: 5 }}
                            >
                              {skill.proficiencyLevel}
                              {skill.proficiencyLevel !== "" && " :"}
                              {/* <button
                type="button"
                className={classes.button1}
                onClick={() => setOpenExp((prev) => !prev)}
              >
                {" "}
                - View More
              </button> */}
                            </div>
                            <div className={classes.main29} key={skill.id}>
                              <span>{skill.name}</span>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          Benefits{" :"}
                          {/* <button
                type="button"
                className={classes.button1}
                onClick={() => setOpenExp((prev) => !prev)}
              >
                {" "}
                - View More
              </button> */}
                        </div>
                      </div>

                      <div className={classes.main28}>
                        {data.benefits && data.benefits.length > 0 ? (
                          data.benefits.map((skill) => (
                            <div key={skill.id} className={classes.main29}>
                              <span>{skill.name}</span>
                            </div>
                          ))
                        ) : (
                          <span>no Benefits Yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.main33}>
                    {/* <div>
                        <button
                          type="button"
                          className={classes.button5}
                          onClick={() =>
                            handleOpenModal(data.jobPostActivityId)
                          }
                        >
                          <span className={classes.spanicon}>
                            <EditIcon />
                          </span>
                        </button>
                      </div> */}
                  </div>
                  <div className={classes.main33} style={{ top: 10 }}>
                    {/* <div>
                        <a
                          href={data.cvPath || "#"}
                          download
                          className={classes.button5}
                        >
                          <span className={classes.spanicon}>
                            <PermContactCalendarIcon />
                          </span>
                        </a>
                      </div> */}
                  </div>

                  <div className={classes.main30}>
                    <div className={classes.main31}>
                      {/* <button
                          type="button"
                          className={classes.button2}
                          onClick={() =>
                            handlePutStatusInterView(data.jobPostActivityId)
                          }
                        >
                          Interview
                        </button> */}
                      <div className={classes.main32}>
                        {/* <button
                          className={classes.button3}
                          // onClick={() =>
                          //   handlePutStatusRejected(data.jobPostActivityId)
                          // }
                        >
                          <CloseIcon />
                          <span>Not interested</span>
                        </button> */}
                        <button
                          type="button"
                          className={classes.button4}
                          onClick={() => handleOpenMdalScore(data)}
                          // onClick={() =>
                          //   handlePutStatusPassed(data.jobPostActivityId)
                          // }
                        >
                          <CheckIcon />
                          <span>Request to send Email</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.pagination}>
            <Pagination
              count={totalPages} // Total number of pages
              page={pageIndex} // Current page
              onChange={handlePageChange} // Update state when page changes
              color="primary"
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
