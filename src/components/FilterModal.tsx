import React, { useEffect, useState } from "react";
import classes from "./FilterModal.module.css";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { GetSkillSets } from "../Services/SkillSet/GetSkillSet";
import { GetJobType } from "../Services/JobTypeService/GetJobType";
// import { useQuery } from "@tanstack/react-query";
// import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
// import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}
interface SearchData {
  jobTitle?: string;
  companyNames?: string[];
  companyName?: string;
  skillSet?: string;
  skillSets?: string[];
  city?: string;
  cities?: string[];
  location?: string;
  locations?: string;
  experience?: number;
  jobType?: string;
  jobTypes?: string[];
  pageSize: number;
  minSalary?: number;
  maxSalary?: number;
}
interface Props {
  onDone?: () => void;
  filteredJobs?: JobPost[];
}

// const experienceLevels = [
//   "0+ years of experience",
//   "1+ years of experience",
//   "2+ years of experience",
//   "3+ years of experience",
//   "4+ years of experience",
//   "5+ years of experience",
//   "6+ years of experience",
//   "7+ years of experience",
//   "8+ years of experience",
// ];

const datacities = [
  "HO CHI MINH",
  "HA NOI",
  "DA NANG",
  "HAI PHONG",
  "CAN THO",
  "NHA TRANG",
];

export default function FilterModal({ onDone, filteredJobs }: Props) {
  const JobSalary = filteredJobs?.map((salary) => salary.salary);
  const flattenedArraySalary = JobSalary?.flat();

  const uniqueArraySalary = [...new Set(flattenedArraySalary)];
  console.log("realyne", uniqueArraySalary);

  const SalaryJob = uniqueArraySalary;
  const maxSalaryJob = Math.max(...SalaryJob);

  const [salary, setSalary] = useState<number[]>([500, maxSalaryJob]);
  const [minSalary, setMinSalary] = useState<number>(500);
  const [maxSalary, setMaxSalary] = useState<number>(maxSalaryJob);

  // const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedSkill") || "[]")
  );
  // const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedType") || "[]")
  );
  // const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedCompany") || "[]")
  );
  const [searchDataArray, setSearchDataArray] = useState<SearchData[]>([]);
  // const [selectedCites, setSelectedCites] = useState<string[]>([]);
  const [selectedCites, setSelectedCites] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedCities") || "[]")
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryCities, setSearchQueryCities] = useState<string>("");

  //exp
  const [openExp, setOpenExp] = useState<boolean>(false);
  // const [selectExp, setSelectExp] = useState<number | null>();
  const [selectExp, setSelectExp] = useState<number | null>(() =>
    JSON.parse(localStorage.getItem("selectExp") || "null")
  );
  const [selectExpString, setSelectExpString] = useState<string | null>("");
  const navigate = useNavigate();

  const handleSalaryChange = (_event: Event, newValue: number | number[]) => {
    const [newMinSalary, newMaxSalary] = newValue as number[];
    setSalary([newMinSalary, newMaxSalary]);
    setMinSalary(newMinSalary);
    setMaxSalary(newMaxSalary);
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };
  const handleTypeSelect = (type: string) => {
    setSelectedType((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  //exp
  function getExperienceString(experienceNumber: number | null) {
    return experienceNumber !== null
      ? `${experienceNumber}+ years of experience`
      : null;
  }

  const handleOpenSelectExp = () => {
    setOpenExp((prev) => !prev);
  };

  const handleSelectExp = (exp: number) => {
    // const experienceNumber = getExperienceNumber(exp);

    const stringExp = getExperienceString(exp);
    setSelectExp((prev) => (prev === exp ? null : exp));
    setSelectExpString((prev) => (prev === stringExp ? " " : stringExp));
  };

  const handleCheckboxChange = (name: string) => {
    setSelectedCompany((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((company) => company !== name)
        : [...prevSelected, name]
    );
  };

  const handleCheckboxChangeCities = (name: string) => {
    setSelectedCites((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((company) => company !== name)
        : [...prevSelected, name]
    );
  };

  // const CompanyName = filteredJobs?.map((name) => name.companyName);
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;

  const CompanyName = Companiesdata?.map((name) => name.companyName);

  const flattenedArrayCompanyName = CompanyName?.flat();
  const uniqueArrayCompanyName = [...new Set(flattenedArrayCompanyName)];
  console.log("realy1", CompanyName);

  const CompanyColums = uniqueArrayCompanyName;

  const filter = CompanyColums.filter((name) =>
    name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filtercites = datacities.filter((name) =>
    name.toLowerCase().includes(searchQueryCities.toLowerCase())
  );
  // const {
  //   data: JobPosts,
  //   // isLoading: isJobLoading,
  //   // isError: isJobError,
  // } = useQuery({
  //   queryKey: ["JobPosts"],
  //   queryFn: ({ signal }) => GetJobPost({ signal: signal }),
  //   staleTime: 5000,
  // });

  // const JobPostsdata = JobPosts?.JobPosts;
  //skills
  const { data: SkillSetData } = useQuery({
    queryKey: ["SkillSetDetails"],
    queryFn: ({ signal }) => GetSkillSets({ signal: signal }),
    staleTime: 1000,
  });

  const SkillSetDatas = SkillSetData?.SkillSets;
  // const skills = filteredJobs?.map((skill) => skill.skillSets);
  const skills = SkillSetDatas?.map((skill) => skill.name);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];
  console.log("realy", uniqueArray);

  const skillsColumns = uniqueArray;
  useEffect(() => {
    localStorage.setItem("selectedSkill", JSON.stringify(selectedSkill));
  }, [selectedSkill]);
  //Jobtype
  const { data: JobTypedata } = useQuery({
    queryKey: ["JobType"],
    queryFn: ({ signal }) => GetJobType({ signal }),
    staleTime: 5000,
  });

  const JobTypeDatas = JobTypedata?.JobTypes;
  // const Jobtype = filteredJobs?.map((type) => type.jobType.name);
  const Jobtype = JobTypeDatas?.map((type) => type.name);
  const flattenedArrayType = Jobtype?.flat();
  const uniqueArrayType = [...new Set(flattenedArrayType)];
  console.log("realy", uniqueArrayType);

  const TypeJob = uniqueArrayType;
  useEffect(() => {
    localStorage.setItem("selectedType", JSON.stringify(selectedType));
  }, [selectedType]);
  useEffect(() => {
    localStorage.setItem("selectedCompany", JSON.stringify(selectedCompany));
  }, [selectedCompany]);
  useEffect(() => {
    localStorage.setItem("selectedCities", JSON.stringify(selectedCites));
  }, [selectedCites]);

  useEffect(() => {
    localStorage.setItem("selectExp", JSON.stringify(selectExp));
  }, [selectExp]);
  //Experience
  const JobExp = filteredJobs?.map((exp) => exp.experienceRequired);
  const flattenedArrayExp = JobExp?.flat();
  const uniqueArrayExp = [...new Set(flattenedArrayExp)];
  console.log("realyne", uniqueArrayExp);

  const ExpJob = uniqueArrayExp;

  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);

  // useEffect(() => {
  //   const newSearchDataArray: SearchData[] = [];
  //   const searchObject: SearchData = {
  //     pageSize: 9,
  //     minSalary: minSalary,
  //     maxSalary: maxSalary,
  //   };

  //   if (selectedSkill ) {
  //     newSearchDataArray.push({
  //       skillSet: selectedSkill,

  //       minSalary: minSalary,
  //       maxSalary: maxSalary,
  //       pageSize: 9,
  //     });
  //   }

  //   if (selectedType) {
  //     newSearchDataArray.push({
  //       jobType: selectedType,
  //       minSalary: minSalary,
  //       maxSalary: maxSalary,
  //       pageSize: 9,
  //     });
  //   }
  //   if (selectExp) {
  //     newSearchDataArray.push({
  //       experience: selectExp,
  //       minSalary: minSalary,
  //       maxSalary: maxSalary,
  //       pageSize: 9,
  //     });
  //   }
  //   if (selectedCompany) {
  //     newSearchDataArray.push({
  //       companyName: selectedCompany,
  //       minSalary: minSalary,
  //       maxSalary: maxSalary,
  //       pageSize: 9,
  //     });
  //   }

  //   setSearchDataArray(newSearchDataArray);
  // }, [
  //   selectedSkill,
  //   selectedType,
  //   selectExp,
  //   selectedCompany,
  //   maxSalary,
  //   minSalary,
  // ]);

  useEffect(() => {
    const newSearchDataArray: SearchData[] = [];

    // Build the search object conditionally
    const searchObject: SearchData = {
      pageSize: 9,
      minSalary: minSalary,
      maxSalary: maxSalary,
    };

    if (selectedSkill.length > 0) {
      searchObject.skillSets = selectedSkill;
    }

    if (selectedType.length > 0) {
      searchObject.jobTypes = selectedType;
    }
    if (selectExp) {
      searchObject.experience = selectExp;
    }
    if (selectedCompany.length > 0) {
      searchObject.companyNames = selectedCompany;
    }
    if (selectedCites.length > 0) {
      searchObject.cities = selectedCites;
    }
    // Push to newSearchDataArray only if at least one filter is selected
    if (
      selectedSkill ||
      selectedType ||
      selectedCompany ||
      selectExp ||
      selectedCites
    ) {
      newSearchDataArray.push(searchObject);
    }

    setSearchDataArray(newSearchDataArray);
  }, [
    selectedSkill,
    selectedType,
    minSalary,
    maxSalary,
    selectedCompany,
    selectExp,
    selectedCites,
  ]);
  console.log("thietko", jobSearch);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        setJobSearch(data.result.items);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            // text: text,
            // location: location,
          },
        });
        onDone?.();
      } else {
        navigate("/it_jobs", { state: { jobSearch: [] } });
        onDone?.();
      }

      queryClient.invalidateQueries({
        queryKey: ["JobSearch"],
        refetchType: "active",
      });

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search");
    },
  });

  const handleNavigateJob = async () => {
    try {
      for (let i = 0; i < searchDataArray.length; i++) {
        const result = await mutateAsync({
          data: searchDataArray[i],
        });

        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);
          navigate("/it_jobs", {
            state: {
              jobSearch: result.result.items,
            },
          });
          break;
        }
      }
    } catch (error) {
      console.error("Error during job search:", error);
    }
  };

  const handleClearAll = () => {
    setSelectedSkill([]);
    setSelectedType([]);
    setSelectedCompany([]);
    setSelectedCites([]);
    setSelectExp(null);

    // Remove items from localStorage
    localStorage.removeItem("selectedSkill");
    localStorage.removeItem("selectedType");
    localStorage.removeItem("selectedCompany");
    localStorage.removeItem("selectedCities");
    localStorage.removeItem("selectExp");
  };
  const [showAllSkills, setShowAllSkills] = useState(false);

  const displayedSkills = showAllSkills
    ? skillsColumns
    : skillsColumns.slice(0, 10);
  return (
    <Modal
      text="Filter"
      title="Filter"
      onClose={onDone}
      onClickSubmit={handleNavigateJob}
      isPending={isPending}
      Appear={true}
      onClickReset={handleClearAll}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={classes.maine}
      >
        <section className={classes.main}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Skills
          </Typography>
          <div className={classes.workingModelButtons}>
            {displayedSkills.map((skills) => (
              <Button
                variant={
                  selectedSkill.includes(skills) ? "contained" : "outlined"
                }
                onClick={() => handleSkillSelect(skills)}
                className={classes.modelButton}
                style={{
                  backgroundColor: selectedSkill.includes(skills)
                    ? "#ed1b2f"
                    : "transparent",
                  color: selectedSkill.includes(skills) ? "#ffffff" : "#ed1b2f",
                  borderColor: "#ed1b2f",
                }}
              >
                {skills}
              </Button>
            ))}
            <div onClick={()=>setShowAllSkills(!showAllSkills)}>
              <Typography
                sx={{
                  fontWeight: 400,
                  cursor: "pointer",
                  lineHeight: 1.5,
                  fontSize: "16px",
                  color: "red",
                }}
              >
               {showAllSkills ? "Show Less" : "View More"}
              </Typography>
            </div>
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h6" className={classes.sectionTitle}>
            JobType
          </Typography>
          <div className={classes.workingModelButtons}>
            {TypeJob.map((type) => (
              <Button
                variant={selectedType.includes(type) ? "contained" : "outlined"}
                onClick={() => handleTypeSelect(type)}
                className={classes.modelButton}
                style={{
                  backgroundColor: selectedType.includes(type)
                    ? "#ed1b2f"
                    : "transparent",
                  color: selectedType.includes(type) ? "#ffffff" : "#ed1b2f",
                  borderColor: "#ed1b2f",
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Salary
          </Typography>
          <div className={classes.main1}>
            <div className={classes.main2}>
              <div className={classes.main3}>
                <div className={classes.salaryRange}>
                  {/* {`${salary[0]}$ - ${salary[1]}$`} */}
                  <p>Minimum Salary: {minSalary}</p>
                  <p>Maximum Salary: {maxSalary}</p>
                </div>
              </div>
              <Slider
                value={salary}
                onChange={handleSalaryChange}
                min={500}
                max={maxSalaryJob}
                valueLabelDisplay="auto"
                sx={{
                  width: "60%",
                  marginTop: "16px",
                  color: "#4CAF50",
                }}
              />
            </div>
          </div>
        </section>
        <section className={classes.main}>
          <label
            htmlFor=""
            className={classes.label}
            style={{ marginTop: "50px", gap: "10px" }}
          >
            {/* <div className={classes.main9}>
                  <div className={classes.main10}>
                    Work experience
                    <span className={classes.span}>*</span>
                  </div>
                </div> */}
            <Typography variant="h6" className={classes.sectionTitle}>
              Work experience
            </Typography>
            <div className={classes.main13} onClick={handleOpenSelectExp}>
              <div className={classes.main14}>
                <div className={classes.main15}>
                  {selectExpString ? (
                    <div className={classes.select}>{selectExpString}</div>
                  ) : (
                    <div className={classes.main16}>Select Year Experience</div>
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
                ExpJob?.length &&
                ExpJob?.length > 0 &&
                ExpJob?.map((comp, index) => (
                  <div className={classes.dropdown}>
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
                      <span className={classes.companyName}>
                        {comp} years of experience
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
        </section>

        <section className={classes.main}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Company
          </Typography>
          <input
            placeholder="Search Company"
            type="text"
            className={classes.input}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={classes.industryList}>
            {filter.map((name) => (
              <label key={name} className={classes.label}>
                {/* <input
                  type="checkbox"
                  className={classes.inputchecked}
                  checked={selectedCompany === name}
                  onChange={() => handleCheckboxChange(name)}
                /> */}
                <input
                  type="checkbox"
                  className={classes.inputchecked}
                  checked={selectedCompany.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                />
                <span className={classes.span2}>{name}</span>
              </label>
            ))}
          </div>
        </section>
        <section className={classes.main}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Cities
          </Typography>
          <input
            placeholder="Search Cities"
            type="text"
            className={classes.input}
            onChange={(e) => setSearchQueryCities(e.target.value)}
          />
          <div className={classes.industryList}>
            {filtercites.map((name) => (
              <label key={name} className={classes.label}>
                {/* <input
                  type="checkbox"
                  className={classes.inputchecked}
                  checked={selectedCompany === name}
                  onChange={() => handleCheckboxChange(name)}
                /> */}
                <input
                  type="checkbox"
                  className={classes.inputchecked}
                  checked={selectedCites.includes(name)}
                  onChange={() => handleCheckboxChangeCities(name)}
                />
                <span className={classes.span2}>{name}</span>
              </label>
            ))}
          </div>
        </section>
      </Box>
    </Modal>
  );
}
