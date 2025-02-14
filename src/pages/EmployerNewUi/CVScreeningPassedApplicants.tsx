import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./CVScreeningPassedApplicants.module.css";
import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

import EditIcon from "@mui/icons-material/Edit";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useParams } from "react-router-dom";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CommentModal from "../../components/NewUiEmployer/ModalComment";
import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import ModalScore from "../../components/NewUiEmployer/ModalScore";
import { AnimatePresence } from "framer-motion";
// import GradientCircularProgress from "../../components/NewUiEmployer/GradientCircularProgress";
// import NotifiModal from "../../components/NewUiEmployer/NotifiModal";
// import NoJob from "../../components/NewUiEmployer/NoJob";
import NoJobApplicants from "../../components/NewUiEmployer/NoJobApplicants";
import { CoverLetterModal } from "../../components/CoverModal";
// import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";
import DescriptionIcon from "@mui/icons-material/Description";

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
  proficiencyLevel?: string;
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
const CVScreeningPassedApplicants: React.FC = () => {
  const { id } = useParams();
  const JobId = Number(id);
  // const [openExp, setOpenExp] = useState<boolean>(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState<boolean>(false);
  const [openModalCoverLetter, setOpenModalCoverLetter] =
    useState<boolean>(false);
  const [openModalScore, setOpenModalScore] = useState<boolean>(false);
  const [jobProfileCounts, setJobProfileCounts] = useState<
    Record<number, UserProfile>
  >({});
  const [description, setDescription] = useState<string | undefined>("");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [profileScore, setProfileScore] = useState<UserProfile | null>(null);
  const [idApplicants, setIdApplicants] = useState<number | null>(null);

  const [selectedIdJobPostActivity, setSelectedIdJobPostActivity] = useState<
    number | null
  >(null);
  //   const [commentText, setCommentText] = useState<string>("");
  //   const [value, setValue] = React.useState<number | null>(2);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const handleExpandClick = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    setSelectedIdJobPostActivity(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModalCoverLetter = (data: string | undefined) => {
    setOpenModalCoverLetter(true);
    setDescription(data);
  };

  const {
    data: SeekerApply,
    // isLoading: isSeekerLoading,
    // isError: isSeekerError,
  } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  // const dataSeekerApply = SeekerApply?.GetSeekers;
  const PendingDataSeekerApply = useMemo(() => {
    return (
      SeekerApply?.GetSeekers?.filter(
        (item) => item.status === "CVScreeningPassed"
      ) || []
    );
  }, [SeekerApply]);

  const fetchProfileApply = useCallback(async () => {
    if (PendingDataSeekerApply) {
      setIsFetchingProfile(true);
      const ProfileSeeker: Record<number, UserProfile> = {};
      await Promise.all(
        PendingDataSeekerApply.map(async (item) => {
          const seekerData = await GetUserProfile({ id: item.id });
          const data = seekerData?.UserProfiles || {};
          ProfileSeeker[item.id] = data;
        })
      );
      setJobProfileCounts(ProfileSeeker);
      setIsFetchingProfile(false);
    }
  }, [PendingDataSeekerApply]);

  useEffect(() => {
    fetchProfileApply();
  }, [fetchProfileApply]);

  const { mutate } = useMutation({
    mutationFn: PutJobPostActivityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
      message.success("Status Details Update Successfully");
    },
    onError: () => {
      message.error("Failed to Update the status set");
    },
  });

  const handlePutStatusPassed = (id: number) => {
    mutate({
      data: {
        jobPostActivityId: id,
        status: 5,
      },
    });
  };
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

  const handleOpenMdalScore = (id: number, profile: UserProfile) => {
    setOpenModalScore(true);
    setProfileScore(profile);
    setIdApplicants(id);
  };

  const handleCloseModalScore = () => {
    setOpenModalScore(false);
  };
  // const calculateStrokeDasharray = (percentage:number) => {
  //   const radius = 40; // Radius of the circle
  //   const circumference = 2 * Math.PI * radius;
  //   return `${(percentage / 100) * circumference} ${circumference}`;
  // };

  if (PendingDataSeekerApply.length === 0) {
    return <NoJobApplicants text="There are no applicants to your job yet." />;
  }

  return (
    <div className={classes.main}>
      <CommentModal
        open={openModal}
        onClose={handleCloseModal}
        selectedIdJobPostActivity={selectedIdJobPostActivity}
      />
      <CoverLetterModal
        open={openModalCoverLetter}
        onClose={() => setOpenModalCoverLetter(false)}
        description={description}
      />

      <AnimatePresence>
        {openModalScore && (
          <ModalScore
            onClose={handleCloseModalScore}
            profile={profileScore}
            id={idApplicants}
            idJob={id}
          />
        )}
      </AnimatePresence>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            {isFetchingProfile ? (
              <div>Loading CV data...</div>
            ) : (
              PendingDataSeekerApply?.map((data) => {
                const profile = jobProfileCounts[data.id];
                if (!profile) return null;

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
                        <button
                          type="button"
                          className={classes.button}
                          style={{ marginRight: "50px" }}
                        >
                          <span>
                            {" "}
                            {data.status} {" ✦"}
                          </span>
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
                              // onClick={() => setOpenExp((prev) => !prev)}
                              onClick={() => handleExpandClick(data.id)}
                            >
                              {" "}
                              {expandedId === data.id ? "Hide" : "View More"}
                            </button>
                          </div>
                        </div>
                        {/* map Exprience*/}
                        <div className={classes.main14}>
                          {profile.experienceDetails &&
                          profile.experienceDetails.length > 0
                            ? profile.experienceDetails.map((exp) => (
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
                        {profile.educationDetails &&
                        profile.educationDetails.length > 0
                          ? profile.educationDetails.map((edu) => (
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
                        {profile.certificates && profile.certificates.length > 0
                          ? profile.certificates.map((edu) => (
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
                        {profile.awards && profile.awards.length > 0
                          ? profile.awards.map((edu) => (
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
                          {profile.skillSets.map((skill) => (
                            <>
                              <div className={classes.main13}>
                                {/* {skill.proficiencyLevel} */}
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
                          {profile.benefits && profile.benefits.length > 0 ? (
                            profile.benefits.map((skill) => (
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
                    <div className={classes.main33} style={{ top: 230 }}>
                      <div>
                        <button
                          type="button"
                          className={classes.button5}
                          onClick={() =>
                            handleOpenModalCoverLetter(profile?.coverLetter)
                          }
                        >
                          <span className={classes.spanicon}>
                            <DescriptionIcon />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className={classes.main33} style={{ top: 175 }}>
                      <div>
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
                      </div>
                    </div>
                    <div className={classes.main33} style={{ top: 70 }}>
                      <div>
                        <button
                          type="button"
                          className={classes.button5}
                          onClick={() => handleOpenMdalScore(data.id, profile)}
                        >
                          <span className={classes.spanicon}>
                            <EmailIcon />
                          </span>
                        </button>
                      </div>
                    </div>
                    {/* <div className={classes.main33} style={{ top: 0 }}>
                      <div>
                        <button
                          type="button"
                          className={classes.button6}
                          onClick={() => handleOpenMdalScore(data.id, profile)}
                        >
                          <span className={classes.spanicon}>
                          <GradientCircularProgress
                            percentage={
                              data.analyzedResult.matchDetails.scores
                                .overallMatch
                            }
                          />
                          {data.analyzedResult.matchDetails && (
                            <GradientCircularProgress
                              percentage={
                                data.analyzedResult.matchDetails.scores
                                  .overallMatch
                              }
                            />
                          )}
                            <span className={classes.spanicon}>
                            <EmailIcon />
                            </span>
                           <GradientCircularProgress
                              percentage={
                                data.analyzedResult.matchDetails.scores
                                  .overallMatch
                              }
                            />

                          </span>
                        </button>
                      </div>
                    </div> */}

                    <div className={classes.main33} style={{ top: 125 }}>
                      <div>
                        <a
                          href={data.cvPath || "#"}
                          download
                          className={classes.button5}
                          target="_blank" 
                          rel="noopener noreferrer" 
                        >
                          <span className={classes.spanicon}>
                            <PermContactCalendarIcon />
                          </span>
                        </a>
                      </div>
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
                            onClick={() =>
                              handlePutStatusRejected(data.jobPostActivityId)
                            }
                          >
                            <CloseIcon />
                            <span>Rejected</span>
                          </button> */}
                          <button
                            type="button"
                            className={classes.button4}
                            onClick={() =>
                              handlePutStatusPassed(data.jobPostActivityId)
                            }
                          >
                            <CheckIcon />
                            <span>InterView</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CVScreeningPassedApplicants;
