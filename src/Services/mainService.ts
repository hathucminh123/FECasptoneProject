// import httpClient from "../httpClient/httpClient";

import { QueryClient } from "@tanstack/react-query";

const baseURL = "https://finalcapstonebe-aib5.onrender.com/api";
// const baseURL = "https://946a-14-187-150-194.ngrok-free.app/api";
// const baseURL = "https://cors-anywhere.herokuapp.com/https://b732-14-187-150-194.ngrok-free.app/api";
const baseSignalURL = "https://finalcapstonebe-aib5.onrender.com";
// const LocalURL="https://b57e-14-187-156-252.ngrok-free.app/api"

export const queryClient = new QueryClient();

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
    register: `${baseURL}/Auth/register`,
    password:`${baseURL}/Auth/UpdatePassword`,
    AUTH:`${baseURL}/Auth/Verification`,
    Email:`${baseURL}/Auth/Email`,
    EMPLOYEE:`${baseURL}/Auth/register-for-employee`,
    Verifi:`${baseURL}/Auth/Verification-for-employee`,
  },
  Company: {
    POST: `${baseURL}/Company`,
    GET: `${baseURL}/Company`,
    DELETE: `${baseURL}/Company`,
    GetCompaniesbyId: `${baseURL}/Company`,
  },
  JobPosts: {
    POST: `${baseURL}/JobPosts`,
    GET: `${baseURL}/JobPosts/accept`,
    PostJobPostsSkillset: `${baseURL}/JobPosts/SkillSet`,
    GetJobbyId:`${baseURL}/JobPosts`,
    GetSeekerByJobPosts: `${baseURL}/JobPosts/Id`,
    PUT:`${baseURL}/JobPosts/update`,
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
    DELETE: `${baseURL}/EducationDetails`,
  },
  ExperienceDetail: {
    POST: `${baseURL}/ExperienceDetail`,
    GET: `${baseURL}/ExperienceDetail`,
    PUT: `${baseURL}/ExperienceDetail`,
    DELETE:`${baseURL}/ExperienceDetail`,
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
    GetNotifications: `${baseURL}/JobPostActivity/notifications`,
    ReadNotification: `${baseURL}/JobPostActivity/notification/read?notificationId=`,
    ReadAllNotifications: `${baseURL}/JobPostActivity/notification/read-all`
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
  
  },

  CompanyFollow:{
    POST: `${baseURL}/FollowCompany`,
    GET:`${baseURL}/FollowCompany`,
    DELETE:`${baseURL}/FollowCompany`,
  },
  FavoriteJobs:{
    POST: `${baseURL}/FollowJobPost`,
    GET:`${baseURL}/FollowJobPost`,
    DELETE:`${baseURL}/FollowJobPost`,
  },
  JobsComment:{
    POST: `${baseURL}/JobPostActivityComment`,
    GET:`${baseURL}/JobPostActivityComment`,
    DELETE:`${baseURL}/JobPostActivityComment`,
    PUT: `${baseURL}/JobPostActivityComment`,
    GETBYID:`${baseURL}/JobPostActivityComment/Id`,
  },

  jobSearch:{
    POST:`${baseURL}/JobPosts/search`,
  },
  customEmail:{
    POST:`${baseURL}/Email`,
  },
  payment:{
    POST:`${baseURL}/Payment`
  },
  PostCVAI:{
    POST:`${baseURL}/FileHandling/Analyze`
  },
  Subscription:{
    GET:`${baseURL}/Subscription`
  },
  UserJobAlertCriteria:{
    POST:`${baseURL}/UserJobAlertCriteria`,
    GET:`${baseURL}/UserJobAlertCriteria`,
    DELETE:`${baseURL}/UserJobAlertCriteria`
  }


};

export const signalR = {
  employer: {
    groupNotificationsKey: `GroupReceiveMessage`,
    getNotificationsURL: `${baseSignalURL}/signalrHub`,
  }
}
