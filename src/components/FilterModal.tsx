import React, { useEffect, useState } from "react";
import classes from "./FilterModal.module.css";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation } from "@tanstack/react-query";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
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
  companyName?: string;
  skillSet?: string;
  city?: string;
  location?: string;
  experience?: number;
  jobType?: string;
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
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [searchDataArray, setSearchDataArray] = useState<SearchData[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  //exp
  const [openExp, setOpenExp] = useState<boolean>(false);
  const [selectExp, setSelectExp] = useState<number | null>();
  const [selectExpString, setSelectExpString] = useState<string | null>("");
  const navigate = useNavigate();

  const handleSalaryChange = (_event: Event, newValue: number | number[]) => {
    const [newMinSalary, newMaxSalary] = newValue as number[];
    setSalary([newMinSalary, newMaxSalary]);
    setMinSalary(newMinSalary);
    setMaxSalary(newMaxSalary);
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill((prevSkill) => (prevSkill === skill ? "" : skill));
  };
  const handleTypeSelect = (Type: string) => {
    setSelectedType((prevSkill) => (prevSkill === Type ? "" : Type));
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
    setSelectedCompany((prevSelected) => (prevSelected === name ? null : name));
  };

  const CompanyName = filteredJobs?.map((name) => name.companyName);

  const flattenedArrayCompanyName = CompanyName?.flat();
  const uniqueArrayCompanyName = [...new Set(flattenedArrayCompanyName)];
  console.log("realy1", CompanyName);

  const CompanyColums = uniqueArrayCompanyName;

  const filter = CompanyColums.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
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
  const skills = filteredJobs?.map((skill) => skill.skillSets);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];
  console.log("realy", uniqueArray);

  const skillsColumns = uniqueArray;

  //Jobtype
  const Jobtype = filteredJobs?.map((type) => type.jobType.name);
  const flattenedArrayType = Jobtype?.flat();
  const uniqueArrayType = [...new Set(flattenedArrayType)];
  console.log("realy", uniqueArrayType);

  const TypeJob = uniqueArrayType;

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

    if (selectedSkill) {
      searchObject.skillSet = selectedSkill;
    }

    if (selectedType) {
      searchObject.jobType = selectedType;
    }
    if (selectExp) {
      searchObject.experience = selectExp;
    }
    if (selectedCompany) {
      searchObject.companyName = selectedCompany;
    }

    // Push to newSearchDataArray only if at least one filter is selected
    if (selectedSkill || selectedType || selectedCompany || selectExp) {
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
  ]);
  console.log("thietko", jobSearch);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        setJobSearch(data.result.items);
        navigate("/it-jobs", {
          state: {
            jobSearch: jobSearchResults,
            // text: text,
            // location: location,
          },
        });
        onDone?.();
      } else {
        navigate("/it-jobs", { state: { jobSearch: [] } });
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
          navigate("/it-jobs", {
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
  return (
    <Modal
    text="Filter"
      title="Filter"
      onClose={onDone}
      onClickSubmit={handleNavigateJob}
      isPending={isPending}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={classes.maine}
      >
        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Skills
          </Typography>
          <div className={classes.workingModelButtons}>
            {skillsColumns.map((skills) => (
              <Button
                variant={selectedSkill === skills ? "contained" : "outlined"}
                onClick={() => handleSkillSelect(skills)}
                className={classes.modelButton}
                style={{
                  backgroundColor:
                    selectedSkill === skills ? "#ed1b2f" : "transparent",
                  color: selectedSkill === skills ? "#ffffff" : "#ed1b2f",
                  borderColor: "#ed1b2f",
                }}
              >
                {skills}
              </Button>
            ))}
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
            JobType
          </Typography>
          <div className={classes.workingModelButtons}>
            {TypeJob.map((type) => (
              <Button
                variant={selectedType === type ? "contained" : "outlined"}
                onClick={() => handleTypeSelect(type)}
                className={classes.modelButton}
                style={{
                  backgroundColor:
                    selectedType === type ? "#ed1b2f" : "transparent",
                  color: selectedType === type ? "#ffffff" : "#ed1b2f",
                  borderColor: "#ed1b2f",
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
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
            <Typography variant="h4" className={classes.sectionTitle}>
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
          <Typography variant="h4" className={classes.sectionTitle}>
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
                <input
                  type="checkbox"
                  className={classes.inputchecked}
                  checked={selectedCompany === name}
                  onChange={() => handleCheckboxChange(name)}
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
