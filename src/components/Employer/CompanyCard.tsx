import React from "react";
import classes from "./CompanyCard.module.css";
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
  jobType: JobType | string | null;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
}
interface props {
  company?: Company;
  onChoose?: () => void;
  jobs: JobPost[] | undefined;
}

export default function CompanyCard({ company, onChoose, jobs }: props) {
  const skills = jobs?.map((skill) => skill.skillSets);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.img}>
          <img
            src={company?.imageUrl}
            alt="Company Image"
            className={classes.img}
          />
        </div>
      </div>
      <div className={classes.main2}>
        <p className={classes.p}>{company?.companyName}</p>
        <div className={classes.main3}>
          <span className={classes.span1}>
            {" "}
            {company?.companyDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: company?.companyDescription,
                }}
              />
            )}
          </span>
          <span className={classes.span2}> | </span>
          <span className={classes.span3}>
            {" "}
            {company?.numberOfEmployees} employees
          </span>
        </div>
        <p className={classes.p1}>
          {uniqueArray.map((tag, index) => (
            <span key={index} className={classes.span4}>
              {tag}
            </span>
          ))}
        </p>
      </div>
      <div className={classes.main4}>
        <button type="button" className={classes.button} onClick={onChoose}>
          Choose
        </button>
      </div>
    </div>
  );
}
