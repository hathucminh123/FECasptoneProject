import React, { useEffect, useState } from "react";
import classes from "./SearchTalents.module.css";
import Typography from "@mui/material/Typography";

import { useOutletContext, useParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";

import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";

import { AnimatePresence } from "framer-motion";
import ModalSendEmail from "../../components/NewUiEmployer/ModalSendEmail";

import { message } from "antd";
import NoJobApplicants from "../../components/NewUiEmployer/NoJobApplicants";

import { GetUserSearchService } from "../../Services/UserSearchSevice/GetUserSearchService";
import SearchFilter from "./SearchFilter";
import { useSelector } from "react-redux";
import { selectSearchFilter } from "../../redux/slices/searchUserSlice";
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

type OutletContextType = {
  totalJobs: number;
  // setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalJobs: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchTalents() {
  const { id } = useParams();
  // const JobId = Number(id);
  // const [openExp, setOpenExp] = useState<boolean>(false);
  const searchFilter = useSelector(selectSearchFilter);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { totalJobs, setTotalJobs } = useOutletContext<OutletContextType>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  const pageSize = 10;
  const [user, setUser] = useState<UserProfile[]>([]);
  // const [totalJobs, setTotalJobs] = useState<number>(0);
  const { mutateAsync } = useMutation({
    mutationFn: GetUserSearchService,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setUser(data.result.items);
        setTotalJobs(data.result.totalCount);
      } else {
        setUser([]);
        setTotalJobs(0);
      }
      setIsLoading(false);
    },
    onError: () => {
      message.error("Failed to fetch User data");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutateAsync({
      data: {
        pageIndex: 1,
        pageSize: pageSize,
      },
    });
  }, [mutateAsync]);

  const totalPages = Math.ceil((totalJobs || 0) / pageSize); // Calculate total pages

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value); 
    setIsLoading(true);
    mutateAsync({
      data: {
        pageIndex: value,
        pageSize: pageSize,
        keyword: searchFilter.keyword,
        degree: searchFilter.degree,
        skillSetFilters: searchFilter.skillSetFilters,
      },
    });
  };
  

  if (isLoading) {
    return <div className={classes.loading}>Loading talents...</div>;
  }

  //   if (!user || user.length === 0) {
  //     return (
  //       <NoJobApplicants text="There are no talents available for the job yet" />
  //     );
  //   }

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
      {user.length === 0 ? (
        <NoJobApplicants text="There are no talents available for the filter  yet" />
      ) : (
        <div className={classes.main1}>
          <div className={classes.main2}>
            <div className={classes.main3}>
              {/* {isFetchingProfile ? (
              <div>Loading CV data...</div>
            ) : ( */}
              {user?.map((data) => {
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
                            Education{" -"}
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
                        {data.educationDetails &&
                        data.educationDetails.length > 0
                          ? data.educationDetails.map((edu) => (
                              <div
                                key={edu.id}
                                className={classes.main25}
                                style={{ marginBottom: "10px" }}
                              >
                                <div className={classes.main26}>
                                  <span>
                                    School name: {edu.institutionName}
                                  </span>
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
                                    {moment(edu.startDate).format("DD-MM-YYYY")}{" "}
                                    - To:{" "}
                                    {moment(edu.endDate).format("DD-MM-YYYY")}
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
                                    Organization: {edu.certificateOrganization}{" "}
                                    - URL:{" "}
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
              {/* <Pagination
                count={totalPages} // Total number of pages
                page={pageIndex} // Current page
                onChange={handlePageChange} // Update state when page changes
                color="primary"
                shape="rounded"
              /> */}
              <Pagination
                count={totalPages} // Tổng số trang
                page={pageIndex} // Trang hiện tại từ state
                onChange={handlePageChange} // Gọi lại API khi thay đổi trang
                color="primary"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      )}

      <div className={classes.main35}>
        <div className={classes.main36}>
          <div className={classes.main37}>
            <div className={classes.main38}>
              {/* <h5 className={classes.main39}>Keyword Search ✦</h5>
              <h6 className={classes.main40}>
                Specific keywords , Education, degrees or skills
              </h6> */}
              <div className={classes.main50}>
                {/* <SearchFilter
                  setUser={setUser}
                  totalJobs={totalJobs}
                  setTotalJobs={setTotalJobs}
                /> */}
                <SearchFilter
                  setUser={setUser}
                  totalJobs={totalJobs}
                  setTotalJobs={setTotalJobs}
                  pageIndex={pageIndex} // Truyền pageIndex vào SearchFilter
                  setPageIndex={setPageIndex} // Truyền hàm setPageIndex vào SearchFilter
                />
                {/* <input
                            type="text"
                            className={classes.input}
                            placeholder="find a skills"
                            value={inputSkill}
                            onChange={handleChange}
                            onFocus={() => setDropdownOpen(true)}
                          /> */}
                {/* <div className={classes.main51}>
                            <SearchIcon />
                          </div> */}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
