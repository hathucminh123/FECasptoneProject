import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setKeyword,
  setDegree,
  addSkillSetFilter,
  selectSearchFilter,
  resetFilters,
} from "../../redux/slices/searchUserSlice";
import classes from "./SearchFilter.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSkillSets } from "../../Services/SkillSet/GetSkillSet";
import { GetUserSearchService } from "../../Services/UserSearchSevice/GetUserSearchService";
import { message } from "antd";

// Mock skill data (replace with API call if needed)

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
    proficiencyLevel?: string | null;
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
    benefits?: Benefits[];
  }
  

interface SkillSetFilter {
  totalJobs: number;
  setTotalJobs: (totalJobs: number) => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile[]>>;
    }

const SearchFilter: React.FC<SkillSetFilter> = ({setTotalJobs,setUser}) => {
  const dispatch = useDispatch();
  const searchFilter = useSelector(selectSearchFilter);
  const { data: SkillSetData } = useQuery({
    queryKey: ["SkillSet"],
    queryFn: ({ signal }) => GetSkillSets({ signal: signal }),
    staleTime: 1000,
  });

  const SkillSetDatas = SkillSetData?.SkillSets;
  // const skills = filteredJobs?.map((skill) => skill.skillSets);
  const skills = SkillSetDatas?.map((skill) => skill.name);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];

  
  const skillsColumns = uniqueArray;

  console.log("SkillSetData", skillsColumns);

  // Local state for selected skill and proficiency
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [proficiency, setProficiency] = useState<string>("Beginner");



  // Add selected skill to Redux
  const handleAddSkill = () => {
    if (selectedSkill.trim()) {
      dispatch(
        addSkillSetFilter({
          skillSet: selectedSkill,
          proficiencyLevel: proficiency,
        })
      );
      setSelectedSkill("");
      setProficiency("Beginner");
    }
  };

  // Remove skill from Redux
  const handleRemoveSkill = (index: number) => {
    const updatedSkills = searchFilter.skillSetFilters.filter(
      (_, i) => i !== index
    );
    dispatch(resetFilters());
    updatedSkills.forEach((skill) => dispatch(addSkillSetFilter(skill)));
  };

    //   const [totalJobs, setTotalJobs] = useState<number>(0);
  const { mutateAsync } = useMutation({
    mutationFn: GetUserSearchService,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        // setJobSearch(data.result.items);
        setUser(data.result.items);
        setTotalJobs(data.result.totalCount);
      } else {
        // setJobSearch([]);
        setUser([]);
        setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch User data");
    },
  });

  const handleSearch = () => {
    const apiPayload = {
      keyword: searchFilter.keyword,
      degree: searchFilter.degree,
      skillSetFilters: searchFilter.skillSetFilters,
      pageIndex: searchFilter.pageIndex,
      pageSize: searchFilter.pageSize,
    };

    console.log("API Payload:", apiPayload);

    mutateAsync({data: apiPayload});    
  }


  // Reset all filters
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSelectedSkill("");
    setProficiency("Beginner");
  };

  // Submit API payload


  return (
    <div className={classes.container}>
      <h4>Enter KeyWord</h4>
      <input
        type="text"
        placeholder="Search by keyword Eg: Java, React, Node"
        className={classes.input}
        value={searchFilter.keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      <h4>Degree</h4>
      <select
        className={classes.select}
        onChange={(e) => dispatch(setDegree(e.target.value))}
        value={searchFilter.degree}
      >
        <option value="">Choose Degree</option>
        <option value="Junior High School Diploma">
          Junior High School Diploma
        </option>
        <option value="High School Diploma">High School Diploma</option>
        <option value="Intermediate Diploma">Intermediate Diploma</option>
        <option value="College Diploma">College Diploma</option>
        <option value="Bachelor Degree">Bachelor Degree</option>
        <option value="Master Degree">Master Degree</option>
        <option value="Doctorate Degree">Doctorate Degree</option>
        <option value="Equivalent Level Diplomas">
          Equivalent Level Diplomas
        </option>
      </select>

      <h4>Skill Set</h4>
      <div className={classes.skillFilter}>
        <select
          className={classes.select}
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="">Select Skills</option>
          {skillsColumns.map((skill,index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <select
          className={classes.select}
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button className={classes.addButton} onClick={handleAddSkill}>
          Add
        </button>
      </div>

      <div className={classes.skillList}>
        {searchFilter.skillSetFilters.map((filter, index) => (
          <div key={index} className={classes.skillItem}>
            {filter.skillSet} - {filter.proficiencyLevel}{" "}
            <button
              className={classes.removeButton}
              onClick={() => handleRemoveSkill(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button className={classes.searchButton} onClick={handleSearch}>
        Find Talents
      </button>
      <button className={classes.resetButton} onClick={handleResetFilters}>
      Reset Filter
      </button>
    </div>
  );
};

export default SearchFilter;
