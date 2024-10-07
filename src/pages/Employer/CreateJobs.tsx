import React, { useState } from "react";
import classes from "./CreateJobs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import Typography from "@mui/material/Typography";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormSelect from "../../components/Employer/FormSelect";
import { districts } from "../../assets/data/locationData";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { jobSkills } from "../../assets/data/SkillData";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ImageIcon from "@mui/icons-material/Image";
import { useRef } from "react";
import ImagePreview from "../../components/Employer/ImagePreview ";
// import { useAppDispatch } from "../../redux/hooks/hooks";
import { v4 as uuidv4 } from "uuid";
// import { add } from "../../redux/slices/createJobs";
import NotificationAlert from "../../components/NotificationAlert";

export default function CreateJobs() {
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [isSelectOpenSkill, setIsSelectOpenSkill] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [specificLocation, setSpecificLocation] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]); // Array for multiple skills
  const [inputSkill, setInputSkill] = useState<string>("");
  const [salary,setSalary]=useState<number>();
  const [skillLevel,setSkillLevel]=useState<number>();
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirement] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [showAlert,setShowAlert]=useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const dispatch = useAppDispatch();
  const handleOncreate = () => {
    const data = {
      id: uuidv4(),
      jobTitle: title,
      salary:salary,
      selectedDate: selectedDate,
      experienceRequired: count,
      city: city,
      district: district,
      specificLocation: specificLocation,
      jobDescription: description,
      qualificationRequired: requirements,
      benefits: benefits,
      skills: skills,
      skillLevelRequired:skillLevel,
      selectedFile: selectedFile,
    };

    // dispatch(add(data))
    setShowAlert(true)
  };

  console.log("city", city);
  const locationData: string[] = [
    "Miền Bắc",
    "Hà Nội",
    "Ba Đình",
    "Hoàn Kiếm",
    "Tây Hồ",
    "Long Biên",
    "Hải Phòng",
    "Lê Chân",
    "Ngô Quyền",
    "Hồng Bàng",
    "Quảng Ninh",
    "Hạ Long",
    "Cẩm Phả",
    "Uông Bí",
    "Miền Trung",
    "Đà Nẵng",
    "Cẩm Lệ",
    "Hải Châu",
    "Liên Chiểu",
    "Thừa Thiên Huế",
    "Huế",
    "Hương Thủy",
    "Phú Vang",
    "Quảng Nam",
    "Tam Kỳ",
    "Hội An",
    "Điện Bàn",
    "Miền Nam",
    "Hồ Chí Minh",
    "Quận 1",
    "Quận 3",
    "Bình Thạnh",
    "Đồng Nai",
    "Biên Hòa",
    "Long Khánh",
    "Nhơn Trạch",
    "Bình Dương",
    "Thủ Dầu Một",
    "Dĩ An",
    "Thuận An",
  ];

  const onChange = (value: number) => {
    setCount(Number(value));
  };
  const handleLocation = (data: string) => {
    setCity(data);
    setIsSelectOpen(false);
  };
  const handleSkill = (selectedSkill: string) => {
    // Add skill if it's not already in the array
    if (!skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
    setIsSelectOpenSkill(false);
    setInputSkill("");
  };
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Spread previous files and add new ones
      setSelectedFile((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };
  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFile((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (selectedFile) {
      // Thực hiện logic upload file, ví dụ gửi file lên server qua API
      console.log("File to upload:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };
  const handleChangeCount = (type: string, limited: boolean) => {
    if (type === "increase") {
      if (!limited) {
        setCount(count + 1);
        console.log("Tăng");
      }
    } else {
      if (!limited && count > 1) {
        setCount(count - 1);
      }
    }
  };

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleOpenSelect = () => {
    setIsSelectOpen(!isSelectOpen);
    console.log("ok chua,", isSelectOpen);
  };

  const handleOpenSelectSkill = () => {
    setIsSelectOpenSkill(!isSelectOpenSkill);
  };
  const handleControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "salary") {
      setSalary(Number(value));
    } else if (name === "skillLevel") {
      setSkillLevel(Number(value));
    }
  };
  const maxLength = 50;

  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(title).length;

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title="Recruitment Post"
          buttonstring="Save and Post "
          onclick={handleOncreate}
        />
      </div>
      <NotificationAlert showAlert={showAlert} severity="success" location="List jobs" notification="created successfully" link="/employer-verify/jobs" />
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
                    Work place
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div}>
                    <div className={classes.div12}>
                      <div className={classes.div13}>
                        <div className={classes.div14}>
                          <div className={classes.div15}>
                            <LocationOnIcon
                              fontSize="small"
                              sx={{ color: "#FF6F61", marginRight: ".57rem" }}
                            />
                            <span className={classes.span3}>location</span>
                          </div>
                          <div className={classes.div16}>
                            <div className={classes.div17}>
                              <div className={classes.div18}>
                                {city && (
                                  <span className={classes.spande}>
                                    <i onClick={() => setCity("")}>
                                      <HighlightOffOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "#868d94" }}
                                      />
                                    </i>
                                  </span>
                                )}

                                <div className={classes.div19}>
                                  <div
                                    className={classes.div20}
                                    onClick={handleOpenSelect}
                                  >
                                    <ArrowDropDownIcon />
                                  </div>
                                  <div className={classes.div21}>
                                    <div className={classes.div22}></div>
                                    <div className={classes.div23}></div>
                                    <input
                                      className={classes.inputlocation}
                                      type="text"
                                      autoComplete="nope"
                                      placeholder="chọn khu vực/Tỉnh/Thành phố"
                                      tabIndex={0}
                                      value={city}
                                      onChange={(e) => setCity(e.target.value)}
                                    />
                                    {city ? (
                                      <span className={classes.spanlocation}>
                                        {city}
                                      </span>
                                    ) : (
                                      <span className={classes.spanlocation}>
                                        Select Region/ Province/ City
                                      </span>
                                    )}
                                  </div>
                                  {isSelectOpen && (
                                    <div className={classes.divselect}>
                                      <ul className={classes.ul}>
                                        {locationData.map((data, index) => (
                                          <li
                                            onClick={() => handleLocation(data)}
                                            key={index}
                                            className={classes.li}
                                          >
                                            <span
                                              className={classes.spanselect}
                                            >
                                              <span> {data}</span>
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.divlocation}>
                        <div className={classes.div24}>
                          <div className={classes.div25}>
                            <div className={classes.div26}>
                              <FormSelect
                                placeholder="Select District"
                                selectedValue={district}
                                setSelectedValue={setDistrict}
                                data={districts}
                              />
                            </div>
                            <div className={classes.div27}>
                              <div className={classes.div28}>
                                <input
                                  type="text"
                                  className={classes.inputdetaillocation}
                                  autoComplete="on"
                                  placeholder="Enter specific workplace location."
                                  onChange={(e) =>
                                    setSpecificLocation(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
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
                                  {skill}
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
                              {jobSkills.length > 0 ? (
                                jobSkills.map((item, index) => (
                                  <li
                                    onClick={() => handleSkill(item)}
                                    key={index}
                                    className={classes.li}
                                  >
                                    <span className={classes.spanselect}>
                                      <span>{item}</span>
                                    </span>
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
                {selectedFile.map((file, index) => (
                  <div key={index} className={classes.div46}>
                    <div className={classes.div47}>
                      <div className={classes.divimg}>
                        {/* <img
                    
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className={classes.divimg}
                        /> */}
                        <ImagePreview file={file} index={index} key={index} />
                      </div>
                      <div
                        className={classes.divdelete}
                        onClick={() => handleRemoveFile(file)}
                      >
                        <ClearOutlinedIcon
                          fontSize="small"
                          sx={{ marginRight: "2px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

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
