import React, { useEffect, useRef, useState } from "react";
import classes from "./FormCreateEmployer.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetSkillSets } from "../../Services/SkillSet/GetSkillSet";
import { useMutation, useQuery } from "@tanstack/react-query";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
// import { PostSkillSets } from "../../Services/SkillSet/PostSkillSet";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DatePicker from "react-datepicker";
// import { PostJobType } from "../../Services/JobTypeService/PostJobType";
import { GetJobType } from "../../Services/JobTypeService/GetJobType";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PostJobPosts } from "../../Services/JobsPost/PostJobPosts";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import { GetBenefits } from "../../Services/Benefits/GetBenefits";
// import { PostBenefits } from "../../Services/Benefits/PostBenefits";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { AnimatePresence } from "framer-motion";
import EmployerServiceModal from "../../components/Employer/EmployerServiceModal";
import { GetLocationService } from "../../Services/Location/GetLocationService";
import { GetcompanyLocationService } from "../../Services/CompanyLocation/GetcompanyLocationService";
// type JobContextType = {
//   selectJobId: number | null;
//   setSelectJobId: React.Dispatch<React.SetStateAction<number | null>>;
// };
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const countrydata = ["dsa", "asdasd"];

const experienceLevels = [
  "0+ years of experience",
  "1+ years of experience",
  "2+ years of experience",
  "3+ years of experience",
  "4+ years of experience",
  "5+ years of experience",
  "6+ years of experience",
  "7+ years of experience",
  "8+ years of experience",
];
interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
}
interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
}

interface Locations {
  id: number;
  city: string;
  stressAddressDetail:string;
}
interface JobType {
  id: number;
  name: string;
  description: string;
}

interface Services {
  id: number;
  name: string;
  numberOfPost: number;
  description: string;
  price: number;
}
export default function FormCreateEmployer() {
  const navigate = useNavigate();

   const [companyId, setCompanyId] = useState<string | null>(null);
  
    useEffect(() => {
      const CompanyId = localStorage.getItem("CompanyId");
      setCompanyId(CompanyId);
    }, []);

  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [qualificationRequired, setQualificationRequired] =
    useState<string>("");
  // const companyId = localStorage.getItem("CompanyId");
  const userId = localStorage.getItem("userId");
  //imageurl
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  //   jobExperience

  const [openExp, setOpenExp] = useState<boolean>(false);
  const [selectExp, setSelectExp] = useState<number | null>();
  const [selectExpString, setSelectExpString] = useState<string | null>("");
  console.log(selectExp);
  //   jobtype
  const [openType, setOpenType] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<JobType | null>();
  const [selectTypeId, setSelectTypeId] = useState<number | null>();
  // const [openFormType, setOpenFormType] = useState<boolean>(false);
  // const [nameType, setNameType] = useState<string>("");
  // const [descriptionType, setDescriptionType] = useState<string>("");

  //service
  // const [openService, setOpenService] = useState<boolean>(false);
  const [selectService, setSelectService] = useState<
    Services | null | undefined
  >();
  const [selectServiceId, setSelectServiceId] = useState<
    number | null | undefined
  >();

  // skill
  // const [open, setOpen] = useState(false);
  // const [nameSkill, setNameSkill] = useState("");
  // const [shorthand, setShorthand] = useState("");
  // const [descriptionSkillSet, setDescriptionSkillSet] = useState("");

  // const [shorthand, setShorthand] = useState("");
  // const [descriptionSkillSet, setDescriptionSkillSet] = useState("");

  const { data: SkillSetdata } = useQuery({
    queryKey: ["SkillSet"],
    queryFn: ({ signal }) => GetSkillSets({ signal }),
    staleTime: 5000,
  });
  // const [nameBenefits, setNameBenefits] = useState("");
  const SkillSetdataa = SkillSetdata?.SkillSets;
  const [skills, setSkills] = useState<SkillSet[]>([]);
  const [filteredSkills, setFilteredSkills] = useState(SkillSetdataa);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [skillId, setSkillId] = useState<number[]>([]);
  const [inputSkill, setInputSkill] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  //benefits
  const { data: BenefitsData } = useQuery({
    queryKey: ["Benefits"],
    queryFn: ({ signal }) => GetBenefits({ signal }),
    staleTime: 5000,
  });
  const Benefitsdataa = BenefitsData?.Benefits;
  // const [openBenefit, setOpenBenefit] = useState(false);
  const [benefitsdata, setBenefitsdata] = useState<Benefits[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dropdownOpenBenefit, setDropdownOpenBenefit] = useState(false);
  const [filteredBenefits, setFilteredBenefits] = useState(Benefitsdataa);
  const [benefitId, setBenefitId] = useState<number[]>([]);
  const [inputBenefit, setInputBenefit] = useState<string>("");
  const dropdownRefBenefit = useRef<HTMLDivElement>(null);

  //location
  const { data: LocationData } = useQuery({
    queryKey: ["Locations"],
    queryFn: ({ signal }) => GetLocationService({ signal }),
    staleTime: 5000,
  });
  const Locationsdataa = LocationData?.Locations;
  console.log(Locationsdataa);

  const { data: CompanyLocation } = useQuery({
    queryKey: ["CompanyLocation"],
    queryFn: ({ signal }) =>
      GetcompanyLocationService({ id: Number(companyId), signal: signal }),
    staleTime: 1000,
  });

  const CompanyLocationdata = CompanyLocation?.Locations;
  const [locationId, setLocationId] = useState<number|null>(null);
  const [locationsdata, setLocationsdata] = useState<Locations|null>(null);
  const [filteredLocations, setFilteredLocations] = useState(CompanyLocationdata);
  const [inputLocation, setInputLocation] = useState<string>("");
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false);
  const dropdownRefLocation = useRef<HTMLDivElement>(null);
  //salary
  const [salary, setSalary] = useState<string>("");
  const [minsalary, setMinSalary] = useState<string>("");
  //date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


//companyLocation
 
const { data: UserProfile } = useQuery({
  queryKey: ["UserProfile"],
  queryFn: ({ signal }) =>
    GetUserProfile({ id: Number(userId), signal: signal }),
  staleTime: 1000,
});

const UserProfileData = UserProfile?.UserProfiles;
  //Date

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  //profile





  console.log(UserProfileData);
  //imageurl
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);

      const previewUrl = URL.createObjectURL(file);
      setFileUrl(previewUrl);
    }
  };

  const handleUploadClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //skills
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const handleOpenBenefit = () => setOpenBenefit(true);
  // const handleCloseBenefit = () => setOpenBenefit(false);

  // const { mutate: createSkillSet, isPending: isLoadingSkillSet } = useMutation({
  //   mutationFn: PostSkillSets,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["SkillSet"] });
  //     message.success("Skill set created successfully.");
  //     handleClose();
  //   },
  //   onError: () => {
  //     message.error("Failed to create skill set.");
  //   },
  // });
  // const { mutate: createBenefits, isPending: isLoadingBenefit } = useMutation({
  //   mutationFn: PostBenefits,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["Benefits"] });
  //     message.success("Benefits created successfully.");
  //     handleClose();
  //   },
  //   onError: () => {
  //     message.error("Failed to create Benefits.");
  //   },
  // });

  // const handleSubmitSkillSet = () => {
  //   if (!nameSkill.trim()) {
  //     return message.error("Please enter a valid skill name.");
  //   }
  //   if (!shorthand.trim()) {
  //     return message.error("Please enter a shorthand for the skill.");
  //   }
  //   if (!descriptionSkillSet.trim()) {
  //     return message.error("Please enter a description for the skill.");
  //   }

  //   createSkillSet({
  //     data: {
  //       name: nameSkill.trim(),
  //       shorthand: shorthand.trim(),
  //       description: descriptionSkillSet.trim(),
  //     },
  //   });
  // };

  // const handleSubmitBenefits = () => {
  //   if (!nameBenefits.trim()) {
  //     return message.error("Please enter a valid benefits name.");
  //   }
  //   createBenefits({
  //     data: {
  //       name: nameBenefits,
  //       // shorthand: shorthand,
  //       // description: descriptionSkillSet,
  //     },
  //   });
  // };
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

  const handleBenefit = (selectedBenefit: Benefits) => {
    if (
      !benefitsdata.includes(selectedBenefit) &&
      !benefitId.includes(selectedBenefit.id)
    ) {
      setBenefitsdata([...benefitsdata, selectedBenefit]);
      setBenefitId([...benefitId, selectedBenefit.id]);
    }
    setDropdownOpenBenefit(false);
    setInputBenefit("");
  };

  const handleLocation = (selectedLocation: Locations) => {
    // if (
    //   !locationsdata.includes(selectedLocation) &&
    //   !locationId.includes(selectedLocation.id)
    // ) {
    //   setLocationsdata([...locationsdata, selectedLocation]);
    //   // setBenefitId([...benefitId, selectedLocation.id]);
    //   setLocationId([...locationId, selectedLocation.id]);
    // }

    setLocationsdata(selectedLocation) ;
    setLocationId(selectedLocation.id);
    setDropdownOpenLocation(false);
    setInputLocation("");
  };

  const handleRemoveSkill = (skillToRemove: SkillSet) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    setSkillId(skillId.filter((skill) => skill !== skillToRemove.id));
  };
  const handleRemoveBenefits = (BenefitToRemove: Benefits) => {
    setBenefitsdata(
      benefitsdata.filter((benefit) => benefit !== BenefitToRemove)
    );
    setBenefitId(benefitId.filter((benefit) => benefit !== BenefitToRemove.id));
  };

  // const handleRemoveLocation = (LocationToRemove: Locations) => {
  //   setLocationsdata(
  //     locationsdata.filter((location) => location !== LocationToRemove)
  //   );
  //   setLocationId(
  //     locationId.filter((location) => location !== LocationToRemove.id)
  //   );
  // };
  const handleRemoveLocation = () => {
    setLocationsdata(null); // Clear the selected location
    setLocationId(null); // Clear the selected location ID
    setInputLocation(""); // Clear the input field
  };
  

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  const handleClickOutsideBenefit = (event: MouseEvent) => {
    if (
      dropdownRefBenefit.current &&
      !dropdownRefBenefit.current.contains(event.target as Node)
    ) {
      setDropdownOpenBenefit(false);
    }
  };
  const handleClickOutsideLocation = (event: MouseEvent) => {
    if (
      dropdownRefLocation.current &&
      !dropdownRefLocation.current.contains(event.target as Node)
    ) {
      setDropdownOpenLocation(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLocation);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLocation);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBenefit);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBenefit);
    };
  }, []);
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
  const handleChangeBenefit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputBenefit(inputValue);
    if (inputValue) {
      setFilteredBenefits(
        Benefitsdataa?.filter((comp) =>
          comp.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenBenefit(true);
    } else {
      setFilteredBenefits([]);
      setDropdownOpenBenefit(false);
    }
  };

  const handleInputFocus = () => {
    setFilteredLocations(CompanyLocationdata); // Show all data initially
    setDropdownOpenLocation(true);
  };
  const handleInputFocusSkill = () => {
    setFilteredSkills(SkillSetdataa); // Show all data initially
    setDropdownOpen(true);
  };

  const handleInputFocusBenefit = () => {
    setFilteredBenefits(Benefitsdataa); // Show all data initially
    setDropdownOpenBenefit(true);
  };

  //Locations
  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputLocation(inputValue);
    if (inputValue) {
      setFilteredLocations(
        CompanyLocationdata?.filter((comp) =>
          comp.city.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenLocation(true);
    } else {
      setFilteredLocations([]);
      setDropdownOpenLocation(false);
    }
  };

  // exp

  function getExperienceNumber(experienceString: string) {
    const match = experienceString.match(/^\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  const handleOpenSelectExp = () => {
    setOpenExp((prev) => !prev);
  };

  const handleSelectExp = (exp: string) => {
    const experienceNumber = getExperienceNumber(exp);
    setSelectExp(experienceNumber);
    setSelectExpString(exp);
  };
  // type

  // const { mutate: JobType, isPending: PedingJobtype } = useMutation({
  //   mutationFn: PostJobType,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["JobType"] });
  //     message.success("Job type created successfully.");
  //     setNameType("");
  //     setDescriptionType("");
  //   },
  //   onError: () => {
  //     message.error("Failed to create job type.");
  //   },
  // });

  // const handleSubmitJobtype = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!nameType || !descriptionType) {
  //     message.error("Please fill in both the name and description!");
  //     return;
  //   }

  //   JobType({ data: { name: nameType, description: descriptionType } });
  // };

  const { data: JobTypedata } = useQuery({
    queryKey: ["JobType"],
    queryFn: ({ signal }) => GetJobType({ signal }),
    staleTime: 5000,
  });

  const JobTypeDatas = JobTypedata?.JobTypes;
  // const handleOpenFormType = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setOpenFormType((prev) => !prev);
  // };
  const handleOpenSelectType = () => {
    setOpenType((prev) => !prev);
  };

  // const handleOpenSelectService = () => {
  //   setOpenService((prev) => !prev);
  // };
  const handleSelectType = (type: JobType) => {
    if (selectType?.id === type.id) {
      // Nếu mục được chọn lại giống mục hiện tại, đặt lại giá trị thành null
      setSelectType(null);
      setSelectTypeId(null);
    } else {
      // Ngược lại, cập nhật mục mới
      setSelectType(type);
      setSelectTypeId(type.id);
    }
  };

  // const handleSelectService = (type: Services) => {
  //   if (selectService?.id === type.id) {
  //     // Nếu mục được chọn lại giống mục hiện tại, đặt lại giá trị thành null
  //     setSelectService(null);
  //     setSelectServiceId(null);
  //   } else {
  //     // Ngược lại, cập nhật mục mới
  //     setSelectService(type);
  //     setSelectServiceId(type.id);
  //   }
  // };
  const adjustTimezone = (date: Date) => {
    const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - offsetInMs).toISOString();
  };
  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;
  // const { selectJobId, setSelectJobId } = useOutletContext<JobContextType>();
  const [selectJobId, setSelectJobId] = useState<number | null>();
  const jobincompanyData = JobPostsdata?.filter(
    (item) => item.companyId === Number(companyId)
  );
  useEffect(() => {
    if (!selectJobId && jobincompanyData && jobincompanyData.length > 0) {
      setSelectJobId(jobincompanyData[0].id);
    }
  }, [selectJobId, jobincompanyData, setSelectJobId]);

  const { mutate: JobPost, isPending: PostPending } = useMutation({
    mutationFn: PostJobPosts,
    onSuccess: (data) => {
      const idJob = data.result.jobPost;
      queryClient.invalidateQueries({ queryKey: ["JobPosts"] });
      queryClient.invalidateQueries({ queryKey: ["Job-details"] });
      message.success("Post Job successfully.");
      navigate(`/EmployerJob/listjobs/OverView/${idJob}`);
      //   setShowAlert(true);
    },
    onError: () => {
      message.error("Failed to post the job.");
    },
  });

  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };
  const handleOnCreate = async () => {
    if (!selectServiceId) {
      message.warning("Please select a service package to post the job.");
      return;
    }
    try {
      // Kiểm tra nếu `selectedFile` tồn tại trước khi tiếp tục
      if (!selectedFile) {
        console.error("No file selected");
        message.warning("Please select a file to upload.");
        return;
      }
      if (
        !jobTitle ||
        !jobDescription ||
        !salary ||
        !selectExp ||
        !qualificationRequired ||
        !benefits ||
        !selectTypeId ||
        !skillId ||
        !benefitId||
        !locationId
      ) {
        message.error("Please fill in all the required fields.");
      }

      if (parseInt(salary) === 0) {
        message.warning("Salary must be more than 0");
        return;
      }
      if (parseInt(minsalary) === 0) {
        message.warning("Min Salary must be more than 0");
        return;
      }
      if (parseInt(minsalary) >= parseInt(salary)) {
        message.warning("Minimum salary must be less than the salary.");
        return;
      }

      if (selectedDate && new Date(selectedDate) <= new Date()) {
        message.warning("The expiry date must be a future date.");
        return;
      }
      const fileName = `${uuidv4()}-${selectedFile.name}`;
      const fileRef = ref(storage, fileName);

      await uploadBytes(fileRef, selectedFile);

      const fileUrl = await getDownloadURL(fileRef);

      setFileUrl(fileUrl);

      const data = {
        jobtitle: jobTitle,
        jobDescription: jobDescription,
        salary: parseInt(salary) ?? 0,
        experienceRequired: selectExp,
        qualificationRequired: qualificationRequired,
        benefits,
        // skillLevelRequired:   0,
        jobTypeId: selectTypeId ?? 0,
        companyID: Number(companyId),
        imageURL: fileUrl,
        userID: Number(userId),
        skillSetIds: skillId,
        benefitIds: benefitId,
        expiryDate: selectedDate ? adjustTimezone(selectedDate) : "",
        serviceId: selectServiceId,
        minsalary: parseInt(minsalary) ?? 0,
        // locationIds: locationId,
        companyLocation:locationId
      };

      // Gửi yêu cầu tạo công việc mới với dữ liệu đã chuẩn bị
      await JobPost({ data });

      console.log("Job created successfully with image URL:", fileUrl);
    } catch (error) {
      console.error("Error creating job:", error);
      message.error("Failed to create job. Please try again.");
    }
  };
  return (
    <div className={classes.main}>
      <AnimatePresence>
        {openModal && (
          <EmployerServiceModal
            onClose={handleCloseModalPayment}
            setSelectService={setSelectService}
            setSelectServiceId={setSelectServiceId}
            // profile={profileScore}
            // id={idApplicants}
            // idJob={id}
          />
        )}
      </AnimatePresence>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>New Job Posting</p>
          </div>
          <div className={classes.main3}>
            <div>
              {PostPending ? (
                <button className={classes.button}>Wait a seconds</button>
              ) : (
                <button className={classes.button} onClick={handleOnCreate}>
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>
        <nav className={classes.main4}>
          <NavLink to="" className={classes.link1}>
            <div className={classes.main5}>
              <span>Overview</span>{" "}
            </div>{" "}
          </NavLink>
          <NavLink to="" className={classes.link2}>
            <div className={classes.main5}>
              <span>Edit Job</span>{" "}
            </div>
            {""}
          </NavLink>
          <NavLink
            to=" "
            className={classes.link1}
            style={{ marginLeft: "24px" }}
          >
            <div className={classes.main5}>
              <span>Applicants</span>{" "}
            </div>{" "}
          </NavLink>
        </nav>
      </header>
      <div className={classes.main6}>
        <form action="">
          <div className={classes.main7}>
            <header className={classes.header1}>
              <p className={classes.p1}>Job Details</p>
            </header>
            {/*  outlet */}
            <div className={classes.main8}>
              <label htmlFor="" className={classes.label}>
                <div className={classes.label1}>
                  <div className={classes.label2}>
                    Logo Image
                    <span className={classes.span1}>*</span>
                  </div>
                </div>
                <div className={classes.input6}>
                  <div className={classes.input7}>
                    {selectedFile ? (
                      <>
                        <div className={classes.img1}>
                          <img
                            src={fileUrl}
                            alt={selectedFile.name}
                            className={classes.img2}
                          />
                        </div>
                        <span className={classes.spanimg}>
                          {selectedFile.name}
                          <button
                            className={classes.clear}
                            onClick={() => setSelectedFile(null)}
                          >
                            (Clear)
                          </button>
                        </span>

                        <div onClick={() => setSelectedFile(null)}>
                          <CloseIcon
                            sx={{
                              position: "absolute",
                              top: "-8px",
                              right: 0,
                              width: "16px",
                              boxSizing: "border-box",
                              borderWidth: 0,
                              borderStyle: "solid",
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <button
                        className={classes.input8}
                        onClick={handleUploadClick}
                      >
                        <CloudUploadIcon />
                        Upload Logo/Image
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    className={classes.upload}
                    onChange={handleFileChange}
                    hidden
                  />
                </div>
              </label>
              <label htmlFor="" className={classes.label}>
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Title
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main11}>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="e.g. Software Engineer, Product Designer, etc."
                    className={classes.input}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </label>
              <label htmlFor="" className={classes.label}>
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Description
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main12}>
                  <ReactQuill
                    value={jobDescription}
                    onChange={setJobDescription}
                    placeholder="Enter your summary"
                    style={{ height: "300px", marginBottom: "16px" }}
                  />
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: 70 }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Benefit
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main12}>
                  <ReactQuill
                    value={benefits}
                    onChange={setBenefits}
                    placeholder="Enter your summary"
                    style={{ height: "300px", marginBottom: "16px" }}
                  />
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: 70 }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    QualificationRequired
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main12}>
                  <ReactQuill
                    value={qualificationRequired}
                    onChange={setQualificationRequired}
                    placeholder="Enter your summary"
                    style={{ height: "300px", marginBottom: "16px" }}
                  />
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: "50px" }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Type of position
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main13} onClick={handleOpenSelectType}>
                  <div className={classes.main14}>
                    <div className={classes.main15}>
                      {selectType ? (
                        <div className={classes.select}>{selectType.name}</div>
                      ) : (
                        <div className={classes.main16}>Select Type</div>
                      )}

                      <div className={classes.main17}>
                        <div className={classes.main18}>
                          <input
                            type="text"
                            name=""
                            id=""
                            className={classes.input1}
                          />
                          <div className={classes.main19}></div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.main20}>
                      <span className={classes.span1}></span>
                      <div className={classes.main21}>
                        <ExpandMoreIcon />
                      </div>
                    </div>
                  </div>

                  {openType &&
                    JobTypeDatas?.length &&
                    JobTypeDatas?.length > 0 &&
                    JobTypeDatas?.map((comp, index) => (
                      <div className={classes.dropdown} key={comp.id}>
                        <div
                          key={index}
                          className={classes.dropdownItem}
                          onClick={() => handleSelectType(comp)}
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
                      </div>
                    ))}

                  {/* <input type="hidden" name="jobTypeId"></input> */}
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: "50px" }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Select service package
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div
                  className={classes.main13}
                  // onClick={handleOpenSelectService}
                  onClick={() => setOpenModal(true)}
                >
                  <div className={classes.main14}>
                    <div className={classes.main15}>
                      {selectService ? (
                        <div className={classes.select}>
                          {selectService.name}
                        </div>
                      ) : (
                        <div className={classes.main16}>Select Services</div>
                      )}

                      <div className={classes.main17}>
                        <div className={classes.main18}>
                          <input
                            type="text"
                            name=""
                            id=""
                            className={classes.input1}
                          />
                          <div className={classes.main19}></div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.main20}>
                      <span className={classes.span1}></span>
                      <div className={classes.main21}>
                        <ExpandMoreIcon />
                      </div>
                    </div>
                  </div>

                  {/* {openService &&
                  UserProfileData?.userAccountServices &&
                  UserProfileData?.userAccountServices?.length > 0 && (
                    UserProfileData?.userAccountServices.map((comp) => (
                      <div
                        className={`${classes.dropdown} ${
                          comp.numberOfPostLeft === 0 ? classes.disabled : ""
                        }`}
                        key={comp.id}
                      >
                        <div
                          className={classes.dropdownItem}
                          onClick={() => {
                            if (comp.numberOfPostLeft > 0)
                              handleSelectService(comp.serviceResponse);
                          }}
                          style={{
                            pointerEvents:
                              comp.numberOfPostLeft === 0 ? "none" : "auto",
                            opacity: comp.numberOfPostLeft === 0 ? 0.5 : 1,
                          }}
                        >
                          <span className={classes.companyName}>
                            {comp.serviceResponse.name}: {comp.numberOfPostLeft}{" "}
                            post left
                          </span>
                        </div>
                      </div>
                    ))
                  ) 
                  // : (
                  //   <div className={classes.dropdownItem}>
                  //     No service package available
                  //   </div>
                  } */}
                  {/* <input type="hidden" name="jobTypeId"></input> */}
                </div>
              </label>
              {/* <div className={classes.main12}>
                <button
                  className={classes.button1}
                  onClick={handleOpenFormType}
                >
                  Add another Type
                </button>
              </div> */}

              {/* {openFormType && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  {" "}
                  <label
                    htmlFor=""
                    className={classes.label}
                    style={{ width: "50%" }}
                  >
                    <div className={classes.main9}>
                      <div className={classes.main10}>
                        Name Job Type
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main11}>
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder="e.g. Full time , Part time ..."
                        className={classes.input}
                        value={nameType}
                        onChange={(e) => setNameType(e.target.value)}
                      />
                    </div>
                  </label>
                  <label
                    htmlFor=""
                    className={classes.label}
                    style={{ width: "50%" }}
                  >
                    <div className={classes.main9}>
                      <div className={classes.main10}>
                        JobType Description
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main11}>
                      <input
                        type="text"
                        name="jobTitle"
                        // placeholder="e.g. Software Engineer, Product Designer, etc."
                        className={classes.input}
                        value={descriptionType}
                        onChange={(e) => setDescriptionType(e.target.value)}
                      />
                    </div>
                  </label>
                  {PedingJobtype ? (
                    <button
                      className={classes.link5}
                      //   onClick={(e) => handleSubmitJobtype(e)}
                    >
                      Wait a seconds
                    </button>
                  ) : (
                    <button
                      className={classes.link5}
                      onClick={(e) => handleSubmitJobtype(e)}
                      type="button"
                    >
                      Create new Type
                    </button>
                  )}
                </div>
              )} */}
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: "50px" }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Work experience
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main13} onClick={handleOpenSelectExp}>
                  <div className={classes.main14}>
                    <div className={classes.main15}>
                      {selectExpString ? (
                        <div className={classes.select}>{selectExpString}</div>
                      ) : (
                        <div className={classes.main16}>
                          Select Year Experience
                        </div>
                      )}

                      <div className={classes.main17}>
                        <div className={classes.main18}>
                          <input
                            type="text"
                            name=""
                            id=""
                            className={classes.input1}
                          />
                          <div className={classes.main19}></div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.main20}>
                      <span className={classes.span1}></span>
                      <div className={classes.main21}>
                        <ExpandMoreIcon />
                      </div>
                    </div>
                  </div>

                  {openExp &&
                    experienceLevels?.length &&
                    experienceLevels?.length > 0 &&
                    experienceLevels?.map((comp, index) => (
                      <div className={classes.dropdown} key={index}>
                        <div
                          key={index}
                          className={classes.dropdownItem}
                          onClick={() => handleSelectExp(comp)}
                        >
                          {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                          <span className={classes.companyName}>{comp}</span>
                          {/* <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span> */}
                        </div>
                      </div>
                    ))}

                  {/* <input type="hidden" name="jobTypeId"></input> */}
                </div>
              </label>
              <label
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
                {skills.length && skills.length > 0 ? (
                  <div className={classes.main24}>
                    {skills.map((skills) => (
                      <span
                        key={skills.id}
                        className={classes.span2}
                        onClick={() => handleRemoveSkill(skills)}
                      >
                        {skills.name}
                        <span className={classes.spanicon}>
                          <CloseIcon />
                        </span>
                      </span>
                    ))}
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
                          onFocus={handleInputFocusSkill}
                          // onFocus={() => setDropdownOpen(true)}
                        />
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
                              // onClick={handleOpen}
                              style={{ cursor: "pointer" }}
                            >
                              <span>No skills name: {inputSkill}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: "50px" }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Select Your Benefits
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                {benefitsdata.length && benefitsdata.length > 0 ? (
                  <div className={classes.main24}>
                    {benefitsdata.map((benefits) => (
                      <span
                        key={benefits.id}
                        className={classes.span2}
                        onClick={() => handleRemoveBenefits(benefits)}
                      >
                        {benefits.name}
                        <span className={classes.spanicon}>
                          <CloseIcon />
                        </span>
                      </span>
                    ))}
                  </div>
                ) : undefined}

                <div className={classes.div1} aria-expanded="false">
                  <div className={inputBenefit ? classes.divne : classes.div2}>
                    <div className={classes.div3}>
                      <div className={classes.div4}>
                        <div className={classes.icon}>
                          <SearchIcon />
                        </div>
                        <input
                          value={inputBenefit}
                          onChange={handleChangeBenefit}
                          className={classes.input2}
                          type="text"
                          // placeholder="e.g. Python,Reactjs"
                          aria-autocomplete="list"
                          autoComplete="off"
                          // onFocus={() => setDropdownOpenBenefit(true)}
                          onFocus={handleInputFocusBenefit}
                        />
                      </div>

                      {dropdownOpenBenefit && (
                        <div
                          className={classes.dropdown}
                          ref={dropdownRefBenefit}
                        >
                          {filteredBenefits?.length &&
                          filteredBenefits?.length > 0 ? (
                            filteredBenefits?.map((comp, index) => (
                              <div
                                key={index}
                                className={classes.dropdownItem}
                                onClick={() => handleBenefit(comp)}
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
                              // onClick={handleOpenBenefit}
                              style={{ cursor: "pointer" }}
                            >
                              <span>No Benefits name: {inputBenefit}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
              <label
                htmlFor=""
                className={classes.label}
                style={{ marginTop: "50px" }}
              >
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Select Your Location
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                {locationsdata &&  (
                  <div className={classes.main24}>
                    {/* {locationsdata.map((locations) => ( */}
                      <span
                        key={locationsdata.id}
                        className={classes.span2}
                        // onClick={() => handleRemoveLocation(locationsdata)}
                        onClick={handleRemoveLocation}
                      >
                        {locationsdata.city}, {locationsdata.stressAddressDetail}
                        <span className={classes.spanicon}>
                          <CloseIcon />
                        </span>
                      </span>
                    {/* ))} */}
                  </div>
                ) }

                <div className={classes.div1} aria-expanded="false">
                  <div className={inputLocation ? classes.divne : classes.div2}>
                    <div className={classes.div3}>
                      <div className={classes.div4}>
                        <div className={classes.icon}>
                          <SearchIcon />
                        </div>
                        <input
                          value={inputLocation}
                          onChange={handleChangeLocation}
                          className={classes.input2}
                          type="text"
                          // placeholder="e.g. Python,Reactjs"
                          aria-autocomplete="list"
                          autoComplete="off"
                          // onFocus={() => setDropdownOpenLocation(true)}
                          onFocus={handleInputFocus}
                        />
                      </div>

                      {dropdownOpenLocation && (
                        <div
                          className={classes.dropdown}
                          ref={dropdownRefLocation}
                        >
                          {filteredLocations?.length &&
                          filteredLocations?.length > 0 ? (
                            filteredLocations?.map((comp, index) => (
                              <div
                                key={index}
                                className={classes.dropdownItem}
                                onClick={() => handleLocation(comp)}
                              >
                                {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                                <span className={classes.companyName}>
                                  {comp.city}, {comp.stressAddressDetail}
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
                              // onClick={handleOpenBenefit}
                              style={{ cursor: "pointer" }}
                            >
                              <span>No Location avalable: {inputLocation}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
              <div className={classes.div5}>
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Application Deadline
                    <span className={classes.span}>*</span>
                  </div>
                </div>
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
                    className={classes.input3}
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
              <hr className={classes.hr} />
              <Typography
                variant="h4"
                sx={{
                  marginBottom: ".75rem",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                  padding: 0,
                  boxSizing: "border-box",
                  borderWidth: 0,
                  borderStyle: "solid",
                }}
              >
                Salary
              </Typography>
              <label htmlFor="" className={classes.label}>
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Min Salary
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main26}>
                  <input
                    type="text"
                    name="salary"
                    placeholder="10,000"
                    className={classes.input3}
                    value={minsalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                  />
                  <div className={classes.main27}>$</div>
                </div>
              </label>
              <label htmlFor="" className={classes.label}>
                <div className={classes.main9}>
                  <div className={classes.main10}>
                    Max Salary
                    <span className={classes.span}>*</span>
                  </div>
                </div>
                <div className={classes.main26}>
                  <input
                    type="text"
                    name="salary"
                    placeholder="10,000"
                    className={classes.input3}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <div className={classes.main27}>$</div>
                </div>
              </label>
            </div>
          </div>
        </form>
        {/* <Modal open={open} onClose={handleClose}>
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
        </Modal> */}
        {/* <Modal open={openBenefit} onClose={handleCloseBenefit}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Create Benefits
            </Typography>
            <TextField
              label="Name"
              value={nameBenefits}
              onChange={(e) => setNameBenefits(e.target.value)}
              fullWidth
              margin="normal"
            />
           
            <Button
              variant="contained"
              onClick={handleSubmitBenefits}
              disabled={isLoadingSkillSet}
            >
              {isLoadingBenefit ? "Creating..." : "Create"}
            </Button>
            <Button onClick={handleCloseBenefit} variant="text">
              Cancel
            </Button>
          </Box>
        </Modal> */}
      </div>
    </div>
  );
}
