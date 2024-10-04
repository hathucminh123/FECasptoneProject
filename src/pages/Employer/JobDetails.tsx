import React, { useState, useRef } from "react";
import classes from "./CreateJobs.module.css"; // Using the same styles as CreateJobs
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReactQuill from "react-quill";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import "react-quill/dist/quill.snow.css";
import ImagePreview from "../../components/Employer/ImagePreview ";
import { useLocation } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ImageIcon from "@mui/icons-material/Image";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { districts } from "../../assets/data/locationData";
// import FormSelect from "../../components/Employer/FormSelect";
import { jobSkills } from "../../assets/data/SkillData";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import FormSelect from "../../components/Employer/FormSelect";
import { districts } from "../../assets/data/locationData";
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
export default function EditableJobDetailPage() {
  const location = useLocation();
  const job = location.state?.job; // Job data passed via location

  const [title, setTitle] = useState<string>(job?.title || "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(job?.selectedDate || null);
  const [count, setCount] = useState<number>(job?.count || 1);
  const [city, setCity] = useState<string>(job?.city || "");
  const [district, setDistrict] = useState<string>(job?.district || "");
  const [specificLocation, setSpecificLocation] = useState<string>(job?.specificLocation || "");
  const [description, setDescription] = useState<string>(job?.description || "");
  const [requirements, setRequirements] = useState<string>(job?.requirements || "");
  const [benefits, setBenefits] = useState<string>(job?.benefits || "");
  const [skills, setSkills] = useState<string[]>(job?.skills || []);
  const [inputSkill, setInputSkill] = useState<string>("");
  const [isSelectOpenSkill, setIsSelectOpenSkill] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File[]>(job?.selectedFile || []);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFile((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeCount = (type: string, limited: boolean) => {
    if (type === "increase") {
      if (!limited) {
        setCount(count + 1);
      }
    } else {
      if (!limited && count > 1) {
        setCount(count - 1);
      }
    }
  };
  const handleOpenSelect = () => {
    setIsSelectOpen(!isSelectOpen);
    console.log("ok chua,", isSelectOpen);
  };

  const handleSkill = (selectedSkill: string) => {
    if (!skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
    setIsSelectOpenSkill(false);
    setInputSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };
  const handleLocation = (data: string) => {
    setCity(data);
    setIsSelectOpen(false);
  };
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title={job.title}
          buttonstring="Update"
          // onclick={handleSave}
        />
      </div>

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
                    General Information
                  </Typography>
                </div>

                {/* Job Title */}
                <div className={classes.div3}>
                  <label htmlFor="title" className={classes.label}>
                    Job Title
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.form}>
                    <input
                      value={title}
                      type="text"
                      autoComplete="true"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Job Title"
                      className={classes.input}
                    />
                  </div>
                </div>

                {/* Application Deadline */}
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

                  {/* Number of recruitment */}
                  <div className={classes.div7}>
                    <label htmlFor="Number of recruitment" className={classes.label}>
                      Number of recruitment
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={classes.div8}>
                      <div
                        className={classes.div9}
                        onClick={() => handleChangeCount("decrease", count === 1)}
                      >
                        <RemoveOutlinedIcon />
                      </div>
                      <input
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
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

                {/* Work Place */}
                {/* <div className={classes.div11}>
                  <label htmlFor="title" className={classes.label}>
                    Work place
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.location}>
                    <LocationOnIcon sx={{ color: "#FF6F61", marginRight: ".5rem" }} />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={classes.input}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className={classes.input}
                      placeholder="District"
                    />
                  </div>
                  <input
                    type="text"
                    value={specificLocation}
                    onChange={(e) => setSpecificLocation(e.target.value)}
                    className={classes.inputdetaillocation}
                    placeholder="Specific Location"
                  />
                </div> */}
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
                                  value={specificLocation}
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

              {/* Job Details */}
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
                    Job Details
                  </Typography>
                </div>

                {/* Description */}
                <div className={classes.div30}>
                  <label htmlFor="description" className={classes.spanlabel}>
                    Description
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={description}
                      onChange={setDescription}
                      placeholder="Enter job description"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className={classes.div30}>
                  <label htmlFor="requirements" className={classes.spanlabel}>
                    Requirement for Candidates
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={requirements}
                      onChange={setRequirements}
                      placeholder="Enter job requirements"
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div className={classes.div30}>
                  <label htmlFor="benefits" className={classes.spanlabel}>
                    Benefits
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div32}>
                    <ReactQuill
                      value={benefits}
                      onChange={setBenefits}
                      placeholder="Enter job benefits"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className={classes.div30}>
                  <label className={classes.spanlabel}>
                    Skill need for Jobs
                    <span className={classes.span}>*</span>
                  </label>
                  <div className={classes.div33}>
                    <div className={classes.div34}>
                      <div className={classes.div35}>
                        <div
                          className={classes.div36}
                          onClick={() => setIsSelectOpenSkill(!isSelectOpenSkill)}
                        >
                          <ArrowDropDownIcon />
                        </div>
                        <div className={classes.div37}>
                          <div className={classes.div38}>
                            {skills.map((skill, index) => (
                              <div key={index} className={classes.div39}>
                                <span className={classes.spanskill1}>{skill}</span>
                                <span className={classes.spanskillicon} onClick={() => handleRemoveSkill(skill)}>
                                  <ClearOutlinedIcon fontSize="small" sx={{ marginRight: "2px" }} />
                                </span>
                              </div>
                            ))}
                          </div>
                          <input
                            className={classes.inputskill}
                            type="text"
                            autoComplete="off"
                            value={inputSkill}
                            onChange={(e) => setInputSkill(e.target.value)}
                            placeholder="EX: Java, ReactJS, .Net"
                          />
                        </div>
                        {isSelectOpenSkill && (
                          <div className={classes.divselect}>
                            <ul className={classes.ul}>
                              {jobSkills.length > 0 ? (
                                jobSkills.map((item, index) => (
                                  <li onClick={() => handleSkill(item)} key={index} className={classes.li}>
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

          {/* Image Upload */}
          <div className={classes.mainRight}>
            <div className={classes.div40}>
              <div className={classes.div41}>
                <div className={classes.div42}>Featured Image</div>
                <ArrowForwardIosOutlinedIcon />
              </div>
              <div className={classes.div43}>
                <div className={classes.div44}>
                  Adding Images will help your company information appear more professional.
                </div>
                {selectedFile.map((file, index) => (
                  <div key={index} className={classes.div46}>
                    <div className={classes.div47}>
                      <div className={classes.divimg}>
                        <ImagePreview file={file} index={index} />
                      </div>
                      <div className={classes.divdelete} onClick={() => handleRemoveFile(file)}>
                        <ClearOutlinedIcon fontSize="small" sx={{ marginRight: "2px" }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className={classes.div45}>
                  <div className={classes.divupload} onClick={handleUploadClick}>
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
                      <ImageIcon fontSize="small" />
                      <span>Add Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={classes.saveButtonWrapper}>
        <button className={classes.saveButton}>Save Changes</button>
      </div>
    </div>
  );
}
