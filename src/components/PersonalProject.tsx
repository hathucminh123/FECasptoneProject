import React, { useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
import Box from "@mui/material/Box";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import Typography from "@mui/material/Typography";
import Modal from "./Modal";
import "react-quill/dist/quill.snow.css";
import classes from "./PersonalProject.module.css";
// import TextField from "@mui/material/TextField";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
// import { PostSkillSets } from "../Services/SkillSet/PostSkillSet";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSkillSets } from "../Services/SkillSet/GetSkillSet";
import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import CardSkillModal from "./CardSkillModal";
// import { renderButton } from "./RenderButton";
// import RenderButton from "./RenderButton";
import { PostUserSkill } from "../Services/UserSkillService/PostUserSkill";
// import { default as modal } from "@mui/material/Modal";

// import Button from "@mui/material/Button";

interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
}
interface Props {
  onDone?: () => void;
}

const level =["Excellent","Intermediate","Beginner"]

export default function PersonalProject({ onDone }: Props) {
  const userId = localStorage.getItem("userId");
  // const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  const [skills, setSkills] = useState<SkillSet | null>(null);
  const [hovered, setHovered] = useState<null | number>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLevel, setDropdownOpenLevel] = useState(false);
  const [skillId, setSkillId] = useState<number | null>(null);
  // const [open, setOpen] = useState(false);
  const [inputSkill, setInputSkill] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputSkillLevel, setInputSkillLevel] = useState<string>("");
  const [skillsLevel, setSkillsLevel] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<null | number>(null);
  const dropdownRefLevel = useRef<HTMLDivElement>(null);
  // const [value, setValue] = useState<string>("");
  const { data: SkillSetData } = useQuery({
    queryKey: ["SkillSetDetails"],
    queryFn: ({ signal }) => GetSkillSets({ signal: signal }),
    staleTime: 1000,
  });

  const SkillSetDatas = SkillSetData?.SkillSets;
  const [filteredSkills, setFilteredSkills] = useState(SkillSetDatas);
  const [filteredSkillsLevel, setFilteredSkillsLevel] = useState(level);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputSkill(inputValue);
    if (inputValue) {
      setFilteredSkills(
        SkillSetDatas?.filter((comp) =>
          comp.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpen(true);
    } else {
      setFilteredSkills([]);
      setDropdownOpen(false);
    }
  };

  const handleChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputSkillLevel(inputValue);
    if (inputValue) {
      setFilteredSkillsLevel(
        level?.filter((comp) =>
          comp.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenLevel(true);
    } else {
      setFilteredSkillsLevel([]);
      setDropdownOpenLevel(false);
    }
  };

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

    const handleClickOutsideLevel = (event: MouseEvent) => {
    if (
      dropdownRefLevel.current &&
      !dropdownRefLevel.current.contains(event.target as Node)
    ) {
      setDropdownOpenLevel(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLevel);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLevel);
    };
  }, []);

  const handleSkill = (selectedSkill: SkillSet) => {
    setSkills(selectedSkill);
    setSkillId(selectedSkill.id);
  };

  const handleSkillLevel =(selectlevel :string)=>{
    setSkillsLevel(selectlevel)
  }

  const handleRemoveSkill = (skillToRemove: SkillSet) => {
    setSkillId((prev) => (prev === skillToRemove.id ? null : skillToRemove.id));
    setSkills((prev) => (prev === skillToRemove ? null : skillToRemove));
  };

  const handleRemoveSkillLevel =(level :string) =>{
    setSkillsLevel((prev) =>( prev === level ?null :level))
  }

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   shorthand: "",
  //   description: "",
  // });
  const { mutate: Save, isPending: isSaving } = useMutation({
    mutationFn: PostUserSkill,
    onSuccess: async() => {
       await queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      onDone?.();
      message.success("SkillSet Details Save Successfully");
    },
    onError: () => {
      message.error("Failed to Save the skill set");
    },
  });



  
  const handleMouseEnter = (id: number) => {
    setHovered(id || null);
    console.log('test',id)
  };


const handleMouseEnterLevel =(index :number) =>{
  setHoveredLevel(index || null)
}
const handleMouseLeaveLevel = () => {
  setHoveredLevel(null);
};

  const handleMouseLeave = () => {
    setHovered(null);
  };
  // const maxLength = 2500;

  // Strip HTML tags to count only text characters
  // const stripHTML = (html: string) => {
  //   const tmp = document.createElement("DIV");
  //   tmp.innerHTML = html;
  //   return tmp.textContent || tmp.innerText || "";
  // };

  // const remainingChars = maxLength - stripHTML(formData.description).length;

  // const navigate = useNavigate();
  // const { mutate, isPending } = useMutation({
  //   mutationFn: PostSkillSets,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["SkillSetDetails"] });
  //     navigate("#");
  //     setFormData({
  //       name: "",
  //       shorthand: "",
  //       description: "",
  //     });
  //     // onDone?.();
  //     message.success("SkillSet Details Updated Successfully");
  //   },
  //   onError: () => {
  //     message.error("Failed to update experience details");
  //   },
  // });
  const handleSaveSkillSet = () => {
    Save({
      data: {
        userId: Number(userId),
        skillSetId: skillId,
        proficiencyLevel: skillsLevel,
      },
    });
  };

  // const handleSubmit = () => {
  //   // Perform validation and submit formData
  //   if (!formData.name || !formData.shorthand || !formData.description) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   mutate({
  //     data: {
  //       name: formData.name,
  //       shorthand: formData.shorthand,
  //       description: formData.description,
  //     },
  //   });
  //   // Call your API or perform any action with the form data
  //   console.log("Submitting:", formData);
  // };

  return (
    <Modal
      text="Save"
      title="Skill Sets"
      onClose={onDone}
      isPending={isSaving}
      onClickSubmit={handleSaveSkillSet}
      height={true}
    >
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.tipContainer}>
            <div className={classes.iconContainer}>
              <CreateOutlinedIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
            </div>
            <div className={classes.tipText}>
              <b>
                <span className={classes.tipHighlight}>Tips: </span>
                You can share the project that relates to your skills and
                capabilities
              </b>
            </div>
          </div>

          <div className={classes.form}>
            {/* Project Name (name) */}
            {/* <div className={classes.projectname}>
              <TextField
                label="Skill Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                variant="outlined"
                className={classes.inputGroup}
              />
            </div> */}

            {/* Short Description (shorthand) */}
            {/* <div className={classes.description}>
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Short Hand
                </Typography>
                <TextField
                  label="shorthand"
                  value={formData.shorthand}
                  onChange={(e) =>
                    setFormData({ ...formData, shorthand: e.target.value })
                  }
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                  className={classes.inputGroup}
                />
              </div>
            </div> */}

            {/* Detailed Description (description) */}
            {/* <div className={classes.description}>
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Detailed Description
                </Typography>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Enter your detailed description"
                  // style={{ height: "300px", marginBottom: "16px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    color: remainingChars < 0 ? "red" : "#a6a6a6",
                    fontSize: "14px",
                  }}
                >
                  {remainingChars} of 2500 characters remaining
                </Typography>
              </div>
           
             {isPending ? (
  <RenderButton
    text="Wait a minute"
    color="white"
    variant="outlined"
    disabled={true}  // Disabled when pending
  />
) : (
  <RenderButton
    text="Add Skill Set"
    color="#ed1b2f"
    variant="contained"
    sxOverrides={{ minWidth: "180px" }}
    onClick={handleSubmit}  // Action when button is clicked
    disabled={false}  // Enabled by default when not pending
  />
)}

            </div> */}

            {/* <label
              htmlFor=""
              className={classes.label}
              style={{ marginTop: "50px" }}
            >
              <div className={classes.main9}>
                <div className={classes.main10}>
                  Select Your Skills
                  <span className={classes.span}>*</span>
                </div>
              </div>
              {skills ? (
                <div className={classes.main24}>
                  <span
                    className={classes.span2}
                    onClick={() => handleRemoveSkill(skills)}
                  >
                    {skills.name}
                    <span className={classes.spanicon}>
                      <CloseIcon />
                    </span>
                  </span>
                </div>
              ) : undefined}

              <div className={classes.div1} aria-expanded="false">
                <div className={inputSkill ? classes.divne : classes.div2}>
                  <div className={classes.div3}>
                    <div className={classes.div4}>
                      <div className={classes.icon}>
                        <SearchIcon />
                      </div>
                      <input
                        value={inputSkill}
                        onChange={handleChange}
                        className={classes.input2}
                        type="text"
                        placeholder="e.g. Python,Reactjs"
                        aria-autocomplete="list"
                        autoComplete="off"
                        // onFocus={() => setDropdownOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </label> */}
            {/* <CardSkillModal
              title="Skills"
              text="Highlight Your skills Set"
              icon2={<AddCircleOutlineIcon sx={{ color: "red" }} />}
               icon={<EditNoteOutlinedIcon />}
              setSelectedCvId={setSelectedCvId}
              selectedCvId={selectedCvId}
              img="https://itviec.com/assets/profile/project_no_info-393d7f7ad578814bcce189f5681ba7e90f6a33343cdb0172eb9761ece4094b5d.svg"
              data={SkillSetDatas}
            /> */}

            {/* Submit Button */}
            <div style={{ marginTop: "20px" }}></div>
          </div>
        </div>

        <div className={classes.main30}>
          <div className={classes.main31}>
            <div className={classes.main32}>
            {skills ? (
                <div className={classes.main24} style={{marginTop:'10px'}}>
                  <span
                    className={classes.span2}
                    onClick={() => handleRemoveSkill(skills)}
                  >
                    {skills.name}
                    <span className={classes.spanicon}>
                      <CloseIcon />
                    </span>
                  </span>
                </div>
              ) : undefined}
              <input
                type="text"
                className={classes.input}
                value={inputSkill}
                onChange={handleChange}
                size={1}
                aria-haspopup="listbox"
                aria-expanded="true"
                tabIndex={0}
                placeholder="Search skills"
                onFocus={() => setDropdownOpen(true)}
              />
            </div>
            {dropdownOpen && (
              <div className={classes.main33} ref={dropdownRef}>
                {" "}
                <div className={classes.main34}>
                  {filteredSkills?.length && filteredSkills?.length > 0 ? (
                    filteredSkills?.map((comp, index) => (
                      <div
                        key={index}
                        // className={classes.main35}
                        onMouseEnter={() => handleMouseEnter(comp.id)}
                        onMouseLeave={() => handleMouseLeave}
                        onClick={() => handleSkill(comp)}
                        className={
                          hovered === comp.id
                            ? classes.main36
                            : classes.main35
                        }
                      >
                        {comp.name}
                      </div>
                    ))
                  ) : (
                    <div
                      className={classes.createNewCompany}
                      //   onClick={handleOpenRegister}
                      // onClick={handleOpen}
                      // style={{ cursor: "pointer" }}
                    >
                      <span>Not Found {inputSkill}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={classes.main31}>
            <div className={classes.main32}>
            {skillsLevel ? (
                <div className={classes.main24} style={{marginTop:'10px'}}>
                  <span
                    className={classes.span2}
                    onClick={() => handleRemoveSkillLevel(skillsLevel)}
                  >
                    {skillsLevel}
                    <span className={classes.spanicon}>
                      <CloseIcon />
                    </span>
                  </span>
                </div>
              ) : undefined}
              <input
                type="text"
                className={classes.input}
                value={inputSkillLevel}
                onChange={handleChangeLevel}
                // disabled={true}
               
                size={1}
                aria-haspopup="listbox"
                aria-expanded="true"
                tabIndex={0}
                placeholder="Select level"
                onFocus={() => setDropdownOpenLevel(true)}
              />
            </div>
            {dropdownOpenLevel && (
              <div className={classes.main33} ref={dropdownRefLevel}>
                {" "}
                <div className={classes.main34}>
                  {filteredSkillsLevel?.length && filteredSkillsLevel?.length > 0 ? (
                    filteredSkillsLevel?.map((comp, index) => (
                      <div
                        key={index}
                        // className={classes.main35}
                        onMouseEnter={() => handleMouseEnterLevel(index)}
                        onMouseLeave={() => handleMouseLeaveLevel}
                        onClick={() => handleSkillLevel(comp)}
                        className={
                          hoveredLevel === index
                            ? classes.main36
                            : classes.main35
                        }
                      >
                        {comp}
                      </div>
                    ))
                  ) : (
                    <div
                      className={classes.createNewCompany}
                      //   onClick={handleOpenRegister}
                      // onClick={handleOpen}
                      // style={{ cursor: "pointer" }}
                    >
                      <span>Not Found {inputSkill}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
