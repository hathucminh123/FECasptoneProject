import React, { useEffect, useRef, useState } from "react";
import classes from "./RecommendTalents.module.css";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";

import { ListSeekers } from "../../Services/ListSeekers/ListSeekers";
import { AnimatePresence } from "framer-motion";
import ModalSendEmail from "../../components/NewUiEmployer/ModalSendEmail";
import SearchIcon from "@mui/icons-material/Search";
import { GetSkillSets } from "../../Services/SkillSet/GetSkillSet";
import { PostSkillSets } from "../../Services/SkillSet/PostSkillSet";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RecommendTalents() {
  const { id } = useParams();
  // const JobId = Number(id);
  const [openExp, setOpenExp] = useState<boolean>(false);
  const [openSkills, setOpenSkills] = useState<boolean>(false);

  const { data: SkillSetdata } = useQuery({
    queryKey: ["SkillSet"],
    queryFn: ({ signal }) => GetSkillSets({ signal }),
    staleTime: 5000,
  });
  const SkillSetdataa = SkillSetdata?.SkillSets;
  const [nameSkill, setNameSkill] = useState("");
  const [shorthand, setShorthand] = useState("");
  const [descriptionSkillSet, setDescriptionSkillSet] = useState("");
  const [skills, setSkills] = useState<SkillSet[]>([]);
  const [filteredSkills, setFilteredSkills] = useState(SkillSetdataa);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [skillId, setSkillId] = useState<number[]>([]);
  const [inputSkill, setInputSkill] = useState<string>("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOpenSkills = () => {
    setOpenSkills((prev) => !prev);
  };
  const handleSkill = (selectedSkill: SkillSet) => {
    if (
      !skills.includes(selectedSkill) &&
      !skillId.includes(selectedSkill.id)
    ) {
      setSkills([...skills, selectedSkill]);
      setSkillId([...skillId, selectedSkill.id]);
    }
    setDropdownOpen(false);
    setInputSkill("");
  };

  // const handleRemoveSkill = (skillToRemove: SkillSet) => {
  //   setSkills(skills.filter((skill) => skill !== skillToRemove));
  //   setSkillId(skillId.filter((skill) => skill !== skillToRemove.id));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputSkill(inputValue);
    if (inputValue) {
      setFilteredSkills(
        SkillSetdataa?.filter((comp) =>
          comp.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpen(true);
    } else {
      setFilteredSkills([]);
      setDropdownOpen(false);
    }
  };


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
  const { mutate: createSkillSet, isPending: isLoadingSkillSet } = useMutation({
    mutationFn: PostSkillSets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SkillSet"] });
      message.success("Skill set created successfully.");
      handleClose();
    },
    onError: () => {
      message.error("Failed to create skill set.");
    },
  });
  const handleSubmitSkillSet = () => {
    createSkillSet({
      data: {
        name: nameSkill,
        shorthand: shorthand,
        description: descriptionSkillSet,
      },
    });
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
    queryKey: ["JobSeekerRole", pageIndex],
    queryFn: ({ signal }) => ListSeekers({ signal, jobPostId:Number(id), pageIndex, pageSize }),
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

  if(ListSeekrData.length === 0){
    return <NoJobApplicants text="There are no  Talents avalable For Job Yet"/>
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
                            onClick={() => setOpenExp((prev) => !prev)}
                          >
                            {" "}
                            - View More
                          </button>
                        </div>
                      </div>
                      {/* map Exprience*/}
                      <div className={classes.main14}>
                        {data.experienceDetails &&
                        data.educationDetails.length > 0
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
                                    {openExp && (
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
                      {data.educationDetails && data.educationDetails.length > 0
                        ? data.educationDetails.map((edu) => (
                            <div key={edu.id} className={classes.main25}>
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
                          <div className={classes.main29} key={skill.id}>
                            <span>{skill.name}</span>
                          </div>
                        ))}
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
      <div className={classes.main35}>
        <div className={classes.main36}>
          <div className={classes.main37}>
            <div className={classes.main38}>
              <h5 className={classes.main39}>Keyword Search ✦</h5>
              <h6 className={classes.main40}>
                Specific keywords , Education, degrees or skills
              </h6>
            </div>
          </div>
          <div>
            <div
              className={classes.main41}
           
              style={openSkills ? { backgroundColor: "#EAF7E9" } : undefined}
            >
              <div className={classes.main42}    onClick={handleOpenSkills}>
                <div className={classes.main43}>
                  <div className={classes.main44}>
                    <div className={classes.main45}>
                      <h5 className={classes.h5}>Skill ✦</h5>
                      {openSkills ? (
                        <span className={classes.span2}>
                          <span className={classes.span3}>Close</span>
                        </span>
                      ) : (
                        <span className={classes.span2}>
                          <span className={classes.span3}>Preview</span>
                        </span>
                      )}
                    </div>
                    <h6 className={classes.h6}>Programming languages</h6>
                  </div>
                </div>
              </div>
              {openSkills && (
                <div className={classes.main46}>
                  <div className={classes.main47}>
                    <div className={classes.main48}>
                      <div className={classes.main49}>
                        <div className={classes.main50}>
                          <input
                            type="text"
                            className={classes.input}
                            placeholder="find a skills"
                            value={inputSkill}
                            onChange={handleChange}
                            onFocus={() => setDropdownOpen(true)}
                          />
                          <div className={classes.main51}>
                            <SearchIcon />
                          </div>
                        </div>
                        {dropdownOpen && (
                        <div className={classes.dropdown} ref={dropdownRef}>
                          {filteredSkills?.length &&
                          filteredSkills?.length > 0 ? (
                            filteredSkills?.map((comp, index) => (
                              <div
                                key={index}
                                className={classes.dropdownItem}
                                onClick={() => handleSkill(comp)}
                              >
                                {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                                <span className={classes.companyName}>
                                  {comp.name}
                                </span>
                                {/* <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span> */}
                              </div>
                            ))
                          ) : (
                            <div
                              className={classes.createNewCompany}
                              //   onClick={handleOpenRegister}
                              onClick={handleOpen}
                              style={{ cursor: "pointer" }}
                            >
                              <span>Create new Skills {inputSkill}</span>
                            </div>
                          )}
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
               
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Create Skillset
            </Typography>
            <TextField
              label="Name"
              value={nameSkill}
              onChange={(e) => setNameSkill(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Shorthand"
              value={shorthand}
              onChange={(e) => setShorthand(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={descriptionSkillSet}
              onChange={(e) => setDescriptionSkillSet(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={handleSubmitSkillSet}
              disabled={isLoadingSkillSet}
            >
              {isLoadingSkillSet ? "Creating..." : "Create"}
            </Button>
            <Button onClick={handleClose} variant="text">
              Cancel
            </Button>
          </Box>
        </Modal>
    </div>
  );
}
