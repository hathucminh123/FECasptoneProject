import React, { useState, useRef, useEffect } from "react";
import classes from "./CreateJobs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import Typography from "@mui/material/Typography";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ImageIcon from "@mui/icons-material/Image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
// import { v4 as uuidv4 } from "uuid";
import { PostJobType } from "../../Services/JobTypeService/PostJobType";
import { GetJobType } from "../../Services/JobTypeService/GetJobType";
import { DeleteJobType } from "../../Services/JobTypeService/DeleteJobType";
import { PostSkillSets } from "../../Services/SkillSet/PostSkillSet";
import { GetSkillSets } from "../../Services/SkillSet/GetSkillSet";
import { DeleteSkillSet } from "../../Services/SkillSet/DeleteSkillSet";
import { PostJobPosts } from "../../Services/JobsPost/PostJobPosts";
import { queryClient } from "../../Services/mainService";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NotificationAlert from "../../components/NotificationAlert";
import Input from "../../components/Employer/Input";
import RequiredText from "../../components/Employer/RequiredText";
import FormSelect from "../../components/Employer/FormSelect";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";

const dataType = ["Full Time", "Part Time", "Remote"];

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

interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
}

export default function CreateJobs() {
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isSelectOpenSkill, setIsSelectOpenSkill] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const [skills, setSkills] = useState<SkillSet[]>([]);
  console.log('thiệt khong',skills)
  const [inputSkill, setInputSkill] = useState<string>("");
  const [salary, setSalary] = useState<number>();
  const [skillLevel, setSkillLevel] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirement] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nameJobType, setNameJobtype] = useState<string>("");
  const [typeDescription, setTypeDescription] = useState<string>("");
  const [selectedTopTypeID, setSelectedTopTypeID] = useState<number>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [nameSkill, setNameSkill] = useState("");
  const [shorthand, setShorthand] = useState("");
  const [descriptionSkillSet, setDescriptionSkillSet] = useState("");
  const [skillId, setSkillId] = useState<number[]>([]);
  console.log('thiệt khongid',skillId)
  const [fileUrl, setFileUrl] = useState<string>();
 
  const adjustTimezone = (date:Date) => {
    const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - offsetInMs).toISOString();
  };
   const date=  selectedDate ? adjustTimezone(selectedDate) : ""
  console.log('coko',date)
  const companyId = localStorage.getItem("CompanyId");
  const userId = localStorage.getItem("userId");
  const onChange = (value: number) => {
    setCount(Number(value));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const { data: JobTypedata } = useQuery({
    queryKey: ["JobType"],
    queryFn: ({ signal }) => GetJobType({ signal }),
    staleTime: 5000,
  });

  const JobTypeDatas = JobTypedata?.JobTypes;

  const { mutate: JobPost ,isPending:PostPending} = useMutation({
    mutationFn: PostJobPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JobPosts"] });
      message.success("Post Job successfully.");
      setShowAlert(true);
    },
    onError: () => {
      message.error("Failed to post the job.");
    },
  });

  const handleOnCreate = async () => {
    try {
      // Kiểm tra nếu `selectedFile` tồn tại trước khi tiếp tục
      if (!selectedFile) {
        console.error("No file selected");
        message.warning("Please select a file to upload.");
        return;
      }

      const fileName = `${uuidv4()}-${selectedFile.name}`;
      const fileRef = ref(storage, fileName);

      await uploadBytes(fileRef, selectedFile);

      const fileUrl = await getDownloadURL(fileRef);

      setFileUrl(fileUrl);

      const data = {
        jobtitle: title,
        jobDescription: description,
        salary: salary ?? 0,
        experienceRequired: count,
        qualificationRequired: requirements,
        benefits,
        skillLevelRequired: skillLevel ?? 0,
        jobTypeId: selectedTopTypeID ?? 0,
        companyID: Number(companyId),
        imageURL: fileUrl, 
        userID: Number(userId),
        skillSetIds: skillId,
        expiryDate: selectedDate ? adjustTimezone(selectedDate) : ""
      };

      // Gửi yêu cầu tạo công việc mới với dữ liệu đã chuẩn bị
       await JobPost({ data });

      console.log("Job created successfully with image URL:", fileUrl);
    } catch (error) {
      console.error("Error creating job:", error);
      message.error("Failed to create job. Please try again.");
    }
  };

  // const handleSkill = (selectedSkill: SkillSet) => {
  //   if (!skills.includes(selectedSkill)) {
  //     setSkills([...skills, selectedSkill]);
  //   }
  //   setIsSelectOpenSkill(false);
  //   setInputSkill("");
  //   setSkillId([...skillId, selectedSkill.id]);
  // };

  const handleSkill = (selectedSkill: SkillSet) => {
    if (!skills.includes(selectedSkill) && !skillId.includes(selectedSkill.id)) {
      setSkills([...skills, selectedSkill]);
      setSkillId([...skillId, selectedSkill.id]);
    }
    setIsSelectOpenSkill(false);
    setInputSkill("");
  };

  const handleRemoveSkill = (skillToRemove: SkillSet) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    setSkillId(skillId.filter((skill)=> skill !== skillToRemove.id ));
  };



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
   
      const previewUrl = URL.createObjectURL(file);
      setFileUrl(previewUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeCount = (type: string, limited: boolean) => {
    if (type === "increase" && !limited) setCount(count + 1);
    if (type === "decrease" && !limited && count > 1) setCount(count - 1);
  };

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "salary") setSalary(Number(value));
    if (name === "skillLevel") setSkillLevel(Number(value));
  };

  const { mutate: JobType, isPending: PedingJobtype } = useMutation({
    mutationFn: PostJobType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JobType"] });
      message.success("Job type created successfully.");
      setNameJobtype("");
      setTypeDescription("");
    },
    onError: () => {
      message.error("Failed to create job type.");
    },
  });

  const handleSubmitJobtype = (e: React.FormEvent) => {
    e.preventDefault();
    JobType({ data: { name: nameJobType, description: typeDescription } });
  };

  const handleJobTypeSelect = (Id: number) => {
    setSelectedTopTypeID(Id);
  };

  const { mutate: deleteSkillSet } = useMutation({
    mutationFn: DeleteSkillSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SkillSet"] });
      message.success("Skill set deleted successfully.");
    },
    onError: () => {
      message.error("Failed to delete skill set.");
    },
  });

  const handledeleteSkillSet = (Id: number) => {
    deleteSkillSet({ id: Id });
  };
  const maxLength = 50;

  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(title).length;
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

  const handleOpenSelectSkill = () => {
    setIsSelectOpenSkill(!isSelectOpenSkill);
  };
  const { data: SkillSetdata } = useQuery({
    queryKey: ["SkillSet"],
    queryFn: ({ signal }) => GetSkillSets({ signal }),
    staleTime: 5000,
  });
  const { mutate: deleteJobType } = useMutation({
    mutationFn: DeleteJobType,
    onSuccess: () => {
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      queryClient.invalidateQueries({
        queryKey: ["JobType"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success("JobType Details Deleted Successfully");
      // setDeletingId(null);
    },
    onError: () => {
      message.error("Failed to delete the Job Types");
    },
  });

  const handleDeleteJobType = (id: number) => {
    deleteJobType({ id: id });
  };
  const SkillSetdataa = SkillSetdata?.SkillSets;

  return (
    <div className={classes.main}>
      <div className={classes.div}>
       
        <HeaderSystem
          title="Recruitment Post"
          pending ={PostPending}
          buttonstring="Save and Post "
          onclick={handleOnCreate}
        />
      </div>
      <NotificationAlert
        showAlert={showAlert}
        severity="success"
        location="List jobs"
        notification="created successfully"
        link="/employer-verify/jobs"
      />
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.mainLeft}>
            <div className={classes.div}>
              <div className={classes.div1}>
                <div className={classes.div2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      color: "#212f3f",
                      fontWeight: 600,
                      marginBottom: ".5rem",
                      lineHeight: 1.2,
                      marginTop: "0px",
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  >
                    General information
                  </Typography>
                </div>
                <div className={classes.div}>
                  <div className={classes.div3}>
                    <label htmlFor="title" className={classes.label}>
                      Job Title
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={classes.div}>
                      <div className={classes.form}>
                        <span className={classes.span1}>
                          <span className={classes.span2}>
                            <i onClick={() => setTitle("")}>
                              <HighlightOffOutlinedIcon
                                fontSize="small"
                                sx={{ color: "#868d94" }}
                              />
                            </i>
                          </span>
                          {remainingChars}/50
                        </span>
                        <input
                          name="title"
                          value={title}
                          type="text"
                          autoComplete="true"
                          onChange={handleControl}
                          placeholder="Job Title"
                          className={classes.input}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.div4}>
                  <div className={classes.div5}>
                    <label
                      htmlFor="application-deadline"
                      className={classes.label}
                    >
                      Application deadline
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={`${classes.div6} date-picker-wrapper`}>
                      <i className={classes.i1} style={{ cursor: "pointer" }}>
                        <EventNoteOutlinedIcon fontSize="small" />
                      </i>
                      <input
                        onClick={handleIconClick}
                        type="text"
                        placeholder="dd/mm/yyyy"
                        value={
                          selectedDate
                            ? selectedDate.toLocaleDateString("en-GB")
                            : ""
                        }
                        className={classes.inputdate}
                        readOnly
                      />
                      {isDatePickerOpen && (
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setIsDatePickerOpen(false);
                          }}
                          onClickOutside={() => setIsDatePickerOpen(false)}
                          dateFormat="dd/MM/yyyy"
                          inline
                        />
                      )}
                    </div>
                  </div>
                  <div className={classes.div7}>
                    <label
                      htmlFor="Number of recruitment"
                      className={classes.label}
                    >
                      Experience Required
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={classes.div8}>
                      <div
                        className={classes.div9}
                        onClick={() =>
                          handleChangeCount("decrease", count === 1)
                        }
                      >
                        <RemoveOutlinedIcon />
                      </div>
                      <input
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={classes.inputcount}
                      />
                      <div
                        className={classes.div10}
                        onClick={() => handleChangeCount("increase", false)}
                      >
                        <AddOutlinedIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.div3}>
                  <label htmlFor="title" className={classes.label}>
                    Salary
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div}>
                    <div className={classes.form}>
                      <span className={classes.span1}>
                        <span className={classes.span2}>
                          <i onClick={() => setTitle("")}>
                            <HighlightOffOutlinedIcon
                              fontSize="small"
                              sx={{ color: "#868d94" }}
                            />
                          </i>
                        </span>
                        {remainingChars}/50
                      </span>
                      <input
                        name="salary"
                        value={salary}
                        type="number"
                        autoComplete="true"
                        onChange={handleControl}
                        placeholder="Input Salary"
                        className={classes.input}
                      />
                    </div>
                  </div>
                </div>
                <div className={classes.div3}>
                  <label htmlFor="title" className={classes.label}>
                    skillLevelRequired
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div}>
                    <div className={classes.form}>
                      {/* <span className={classes.span1}>
                          <span className={classes.span2}>
                            <i onClick={() => setTitle("")}>
                              <HighlightOffOutlinedIcon
                                fontSize="small"
                                sx={{ color: "#868d94" }}
                              />
                            </i>
                          </span>
                          {remainingChars}/50
                        </span> */}
                      <input
                        name="skillLevel"
                        value={skillLevel}
                        type="number"
                        autoComplete="true"
                        onChange={handleControl}
                        placeholder="Input level"
                        className={classes.input}
                      />
                    </div>
                  </div>
                </div>
                <div className={classes.div11}>
                  <label htmlFor="title" className={classes.label}>
                    Job Type
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div}>
                    <div className={classes.div12}>
                      <div className={classes.divlocation}>
                        <div className={classes.div24}>
                          <div className={classes.div25}>
                            <div className={classes.div26}>
                              <RequiredText text="Name" />
                              <FormSelect
                                selectedValue={nameJobType}
                                setSelectedValue={setNameJobtype}
                                data={dataType}
                                placeholder="Select Jobtype name"
                              />
                            </div>
                            <div className={classes.div27}>
                              <div className={classes.div28}>
                                <RequiredText text="Description" />
                                <Input
                                  placeholder="jobtype description"
                                  value={typeDescription}
                                  onChange={(e) =>
                                    setTypeDescription(e.target.value)
                                  }
                                />
                              </div>
                              <div style={{ textAlign: "end", marginTop: 10 }}>
                                {PedingJobtype ? (
                                  <>Wait a minute</>
                                ) : (
                                  <button
                                    onClick={(e) => handleSubmitJobtype(e)}
                                    className={classes.button2}
                                  >
                                    Create JobType
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {JobTypeDatas?.map((item) => (
                          <div
                            className={`${
                              selectedTopTypeID === item.id
                                ? classes.formupload1
                                : classes.div50
                            }`}
                            style={{ border: "1px solid #dedede" }}
                          >
                            <div className={classes.div51}>
                              <div className={classes.check}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={selectedTopTypeID === item.id}
                                        onChange={() =>
                                          handleJobTypeSelect(item.id)
                                        }
                                        name="form"
                                      />
                                    }
                                    label="Select this Job Type"
                                  />
                                </FormGroup>
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDeleteJobType(item.id)}
                                >
                                  <DeleteOutlineOutlinedIcon
                                    sx={{
                                      marginLeft: ".57rem",
                                      color: "#a8afb6",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className={classes.div52}>
                                <div className={classes.div28}>
                                  <RequiredText text="Name Jobtype" />
                                  <Input value={item.name} disabled={true} />
                                </div>
                                <div className={classes.div28}>
                                  <RequiredText text="Type Description" />
                                  <Input
                                    disabled={true}
                                    value={item.description}

                                    // value={typeDescription}
                                  />
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
              <div className={classes.div29}>
                <div className={classes.div2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      color: "#212f3f",
                      fontWeight: 600,
                      marginBottom: ".5rem",
                      lineHeight: 1.2,
                      marginTop: "0px",
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  >
                    Details information
                  </Typography>
                </div>
                <div className={classes.div30}>
                  <div className={classes.div31}>
                    <span className={classes.spanlabel}>
                      Description
                      <span className={classes.span}>*</span>
                    </span>
                    <button className={classes.buttondelete}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ marginRight: ".57rem", color: "#a8afb6" }}
                      />
                      Delete
                    </button>
                  </div>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={description}
                      onChange={(content: string) => setDescription(content)}
                      placeholder="Enter your Description"
                    />
                  </div>
                </div>
                <div className={classes.div30}>
                  <div className={classes.div31}>
                    <span className={classes.spanlabel}>
                      Requirement for Candidates
                      <span className={classes.span}>*</span>
                    </span>
                    <button className={classes.buttondelete}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ marginRight: ".57rem", color: "#a8afb6" }}
                      />
                      Delete
                    </button>
                  </div>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={requirements}
                      onChange={(content: string) => setRequirement(content)}
                      placeholder="Enter your Requirments"
                    />
                  </div>
                </div>
                <div className={classes.div30}>
                  <div className={classes.div31}>
                    <span className={classes.spanlabel}>
                      Benefits
                      <span className={classes.span}>*</span>
                    </span>
                    <button className={classes.buttondelete}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ marginRight: ".57rem", color: "#a8afb6" }}
                      />
                      Delete
                    </button>
                  </div>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={benefits}
                      onChange={(content: string) => setBenefits(content)}
                      placeholder="Enter your Benefits"
                    />
                  </div>
                </div>
                <div className={classes.div30}>
                  <div className={classes.div31}>
                    <span className={classes.spanlabel}>
                      Skill need for Jobs
                      <span className={classes.span}>*</span>
                    </span>
                    <button className={classes.button2} onClick={handleOpen}>
                      Create Skilset
                    </button>
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
                          onChange={(e) =>
                            setDescriptionSkillSet(e.target.value)
                          }
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
                  <div className={classes.div33}>
                    <div className={classes.div34}>
                      <div className={classes.div35}>
                        <div
                          className={classes.div36}
                          onClick={handleOpenSelectSkill}
                        >
                          <ArrowDropDownIcon />
                        </div>
                        <div className={classes.div37}>
                          <div className={classes.div38}>
                            {/* Display selected skills */}
                            {skills.map((skill, index) => (
                              <div key={index} className={classes.div39}>
                                <span className={classes.spanskill1}>
                                  {skill.name}
                                </span>
                                <span
                                  className={classes.spanskillicon}
                                  onClick={() => handleRemoveSkill(skill)}
                                >
                                  <ClearOutlinedIcon
                                    fontSize="small"
                                    sx={{ marginRight: "2px" }}
                                  />
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className={classes.div22}></div>
                          <div className={classes.div23}></div>
                          <input
                            className={classes.inputskill}
                            type="text"
                            autoComplete="off"
                            tabIndex={0}
                            value={inputSkill}
                            onChange={handleControl}
                          />
                          {!inputSkill && !isSelectOpenSkill ? (
                            <span className={classes.spanskill}>
                              {" "}
                              EX: Java, ReactJS, .Net
                            </span>
                          ) : (
                            <span className={classes.spanskill}>
                              {inputSkill}
                            </span>
                          )}
                        </div>
                        {isSelectOpenSkill && (
                          <div className={classes.divselect}>
                            <ul className={classes.ul}>
                              {SkillSetdataa?.length ? (
                                SkillSetdataa?.map((item, index) => (
                                  <li
                                    onClick={() => handleSkill(item)}
                                    key={index}
                                    className={classes.li}
                                  >
                                    <span className={classes.spanselect}>
                                      <span>{item.name}</span>
                                    </span>
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        flex: "0 0 10%",
                                        textAlign: "center",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handledeleteSkillSet(item.id);
                                      }}
                                    >
                                      <DeleteOutlineOutlinedIcon
                                        sx={{
                                          marginTop: "5px",
                                          color: "#a8afb6",
                                        }}
                                      />
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <li className={classes.li}>
                                  <span className={classes.spanselect}>
                                    <span>No options found</span>
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.mainRight}>
            <div className={classes.div40}>
              <div className={classes.div41}>
                <div className={classes.div42}>Featured Image</div>
                <ArrowForwardIosOutlinedIcon />
              </div>
              <div className={classes.div43}>
                <div className={classes.div44}>
                  Adding Images will help your company information appear more
                  professional.
                </div>

                <div className={classes.div46}>
                  <div className={classes.div47}>
                    <div className={classes.divimg}>
                      <img
                        src={fileUrl || ""}
                        alt={`preview-${selectedFile?.name}`}
                        className={classes.divimg}
                      />
                      {/* <ImagePreview file={selectedFile}  /> */}
                    </div>
                    {/* <div
                        className={classes.divdelete}
                        onClick={() => handleRemoveFile(file)}
                      >
                        <ClearOutlinedIcon
                          fontSize="small"
                          sx={{ marginRight: "2px" }}
                        />
                      </div> */}
                  </div>
                </div>

                <div className={classes.div45}>
                  <div
                    className={classes.divupload}
                    onClick={handleUploadClick}
                  >
                    <input
                      ref={fileInputRef}
                      className={classes.inputup}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple
                      onChange={handleFileChange}
                      hidden
                    />
                    <button className={classes.button11}>
                      {" "}
                      <i className={classes.i2}>
                        <ImageIcon
                          fontSize="small"
                          sx={{ paddingTop: "2px" }}
                        />
                      </i>
                      <span className={classes.span4}>Add Image</span>
                    </button>
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
