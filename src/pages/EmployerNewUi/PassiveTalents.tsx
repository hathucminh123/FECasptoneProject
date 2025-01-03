import React, { useCallback, useEffect, useState } from "react";
import classes from "./RecommendTalents.module.css";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useParams } from "react-router-dom";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CommentModal from "../../components/NewUiEmployer/ModalComment";
// import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";
// import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";

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
const PassiveTalents: React.FC = () => {
  const { id } = useParams();
  const JobId = Number(id);
  // const [openExp, setOpenExp] = useState<boolean>(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState<boolean>(false);
  const [jobProfileCounts, setJobProfileCounts] = useState<
    Record<number, UserProfile>
  >({});

  const [openModal, setOpenModal] = useState<boolean>(false);
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

  const {
    data: SeekerApply,
    // isLoading: isSeekerLoading,
    // isError: isSeekerError,
  } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const dataSeekerApply = SeekerApply?.GetSeekers;

  const fetchProfileApply = useCallback(async () => {
    if (dataSeekerApply) {
      setIsFetchingProfile(true);
      const ProfileSeeker: Record<number, UserProfile> = {};
      await Promise.all(
        dataSeekerApply.map(async (item) => {
          const seekerData = await GetUserProfile({ id: item.id });
          const data = seekerData?.UserProfiles || {};
          ProfileSeeker[item.id] = data;
        })
      );
      setJobProfileCounts(ProfileSeeker);
      setIsFetchingProfile(false);
    }
  }, [dataSeekerApply]);

  useEffect(() => {
    fetchProfileApply();
  }, [fetchProfileApply]);

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

  return (
    <div className={classes.main}>
      <CommentModal
        open={openModal}
        onClose={handleCloseModal}
        selectedIdJobPostActivity={selectedIdJobPostActivity}
      />
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            {isFetchingProfile ? (
              <div>Loading CV data...</div>
            ) : (
              dataSeekerApply?.map((data) => {
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
                        <button type="button" className={classes.button}>
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
                          profile.educationDetails.length > 0
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
                              <div key={edu.id} className={classes.main25}>
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
                            <div className={classes.main29} key={skill.id}>
                              <span>{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={classes.main33}>
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
                    <div className={classes.main33} style={{ top: 10 }}>
                      <div>
                        <a
                          href={data.cvPath || "#"}
                          download
                          className={classes.button5}
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
                          <button
                            className={classes.button3}
                            // onClick={() =>
                            //   handlePutStatusRejected(data.jobPostActivityId)
                            // }
                          >
                            <CloseIcon />
                            <span>Not interested</span>
                          </button>
                          <button
                            type="button"
                            className={classes.button4}
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
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PassiveTalents;
