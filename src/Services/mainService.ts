// import httpClient from "../httpClient/httpClient";

import { QueryClient } from "@tanstack/react-query";

const baseURL = "https://finalcapstonebe-aib5.onrender.com/api";

export const queryClient = new QueryClient();

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
    register: `${baseURL}/Auth/register`,
  },
  Company: {
    POST: `${baseURL}/Company`,
    GET: `${baseURL}/Company`,
    DELETE: `${baseURL}/Company`,
    GetCompaniesbyId: `${baseURL}/Company`,
  },
  JobPosts: {
    POST: `${baseURL}/JobPosts`,
    GET: `${baseURL}/JobPosts`,
    PostJobPostsSkillset: `${baseURL}/JobPosts/SkillSet`,
    // GetJobbyId:`${baseURL}/JobPosts`,
    GetSeekerByJobPosts: `${baseURL}/JobPosts/Id`,
  },
  CV: {
    POST: `${baseURL}/CV`,
    GET: `${baseURL}/CV/JobSeeker`,
    DELETE: `${baseURL}/CV/JobSeeker`,
  },
  EducationDetails: {
    POST: `${baseURL}/EducationDetails`,
    GET: `${baseURL}/EducationDetails`,
    PUT: `${baseURL}/EducationDetails`,
  },
  ExperienceDetail: {
    POST: `${baseURL}/ExperienceDetail`,
    GET: `${baseURL}/ExperienceDetail`,
    PUT: `${baseURL}/ExperienceDetail`,
  },
  SkillSet: {
    POST: `${baseURL}/SkillSet`,
    GET: `${baseURL}/SkillSet`,
    DELETE: `${baseURL}/SkillSet`,
  },
  JobLocation: {
    POST: `${baseURL}/JobLocation`,
    GET: `${baseURL}/JobLocation`,
    DELETE: `${baseURL}/JobLocation`,
  },
  JobPostActivity: {
    POST: `${baseURL}/JobPostActivity`,
    PUT: `${baseURL}/JobPostActivity`,
  },
  JobType: {
    POST: `${baseURL}/JobType`,
    GET: `${baseURL}/JobType`,
    DELETE: `${baseURL}/JobType`,
  },
  UserApply: {
    GET: `${baseURL}/User/JobPostActivity`,
    PUT: `${baseURL}/User`,
    POST: `${baseURL}/User/Company`,
  },
  BusinessStream: {
    POST: `${baseURL}/BusinessStream`,
    GET: `${baseURL}/BusinessStream`,
  },
  UserSkills: {
    POST: `${baseURL}/User/SkilSet`,
      DELETESKILL:`${baseURL}/User/SkilSet`
  },
  UserProfile:{
    GET: `${baseURL}/User/Profile`,
  
  }
};
