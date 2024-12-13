import React, { useState } from "react";
import classes from "./JobsCompany.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { SearchCompanyByName } from "../Services/CompanyService/CompanySearchbyName";

const JobsCompany: React.FC = () => {
  const [text, setText] = useState<string>("");

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

  //   const JobTitle = JobPostsdata?.map((name) => name.jobTitle);

  //   const flattenedArrayJobTitle = JobTitle?.flat();
  //   const uniqueArrayJobTitle = [...new Set(flattenedArrayJobTitle)];

  //   const JobTitleColums = uniqueArrayJobTitle;
  const CompanyName = Companiesdata?.map((name) => name.companyName);

  const navigate = useNavigate();

  const handleNavigateSkill = async (skill: string) => {
    setText(skill);
    try {
      const companyData = await SearchCompanyByName({ name: skill });
      if (companyData) {
        console.log("Company search results:", companyData.Companies);
        navigate(`/company/detail/${companyData?.Companies.id}`);
      } else {
        console.warn("No results found for company search.");
        navigate("/it_jobs", { state: { text: text } });
      }
    } catch (error) {
      console.error("Error during company search:", error);
    }
    return;
  };
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <h1 className={classes.main2}>Jobs By Company</h1>

        <ul className={classes.ul}>
          {CompanyName?.map((item, index) => (
            <li
              key={index}
              className={classes.li}
              onClick={() => handleNavigateSkill(item)}
            >
              <Link to={""}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default JobsCompany;
