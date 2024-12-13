import React, { useState } from "react";
import classes from "./JobsTitle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { queryClient } from "../Services/mainService";
import { message } from "antd";

interface JobType {
    id: number;
    name: string;
    description: string;
  }
  
  // interface JobLocation {
  //   id: number;
  //   district: string;
  //   city: string;
  //   postCode: string;
  //   state: string;
  //   country: string;
  //   stressAddress: string;
  // }
  interface Benefits {
    id: number;
    name: string;
    // shorthand: string;
    // description: string;
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
    jobType: JobType; // jobType là đối tượng JobType
    jobLocationCities:string[];
    jobLocationAddressDetail:string[]
    skillSets: string[]; // Array of skill sets, có thể là array rỗng
    benefitObjects?: Benefits[];
  }
const JobsTitle: React.FC = () => {
    const [text,setText] =useState<string>("")
    const [jobSearch, setJobSearch] = useState<JobPost[] |undefined>([]);
    const [totalJobs, setTotalJobs] = useState<number>(0);
    console.log('total',totalJobs)
    console.log('data',jobSearch)
  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });


  const JobPostsdata = JobPosts?.JobPosts;

  const JobTitle = JobPostsdata?.map((name) => name.jobTitle);

  const flattenedArrayJobTitle = JobTitle?.flat();
  const uniqueArrayJobTitle = [...new Set(flattenedArrayJobTitle)];

  const JobTitleColums = uniqueArrayJobTitle;

 const navigate =useNavigate()

 const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        const total =data.result.totalCount

        setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: text || "",
            // location: location,
            total:total
            
          },
        });
      } else {
        navigate("/it_jobs", {
          state: { text: text || "", jobSearch: [] ,total :0},
        });
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
  const handleNavigateSkill = async (skill: string) => {
    setText(skill);
    try {
        const result = await mutateAsync({
            data: { keyword: skill, pageSize: 9, pageIndex: 1 },
        });

        if (result && result.result && result.result.items.length > 0) {
            setJobSearch(result.result.items);
            // navigate("/it_jobs", {
            //     state: { jobSearch: result.result.items, textt: skill ,total:totalJobs},
            // });
        } else {
            setJobSearch([]);
            // navigate("/it_jobs", { state: { jobSearch: [], textt: skill,total:0 } });
        }
    } catch (error) {
        console.error("Error during job search:", error);
    }
};
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <h1 className={classes.main2}>Jobs by Title</h1>
        {isPending && <div>Loading...</div>}
        <ul className={classes.ul}>
          {JobTitleColums.map((item, index) => (
            <li key={index} className={classes.li} onClick={() =>handleNavigateSkill(item)}>
              <Link to={""}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default JobsTitle;
