// import httpClient from "../httpClient/httpClient";

import { QueryClient } from "@tanstack/react-query";

// const baseURL = "https://finalcapstonebe-aib5.onrender.com/api";
const baseURL = "https://finalcapstonebe-nd0l.onrender.com/api";

// const baseURL = "https://ca4b-104-28-237-70.ngrok-free.app/api";
// const baseURL = "https://5f7c-14-161-0-210.ngrok-free.app/api";


const baseURLLocation ="https://finalcapstonebe-nd0l.onrender.com"
// const baseURLLocation ="https://6a43-115-73-106-242.ngrok-free.app"
// const baseURL = "https://1ae3-115-73-106-242.ngrok-free.app/api";
// const baseURL = "https://12e3-116-109-208-219.ngrok-free.app/api";
// const baseURL ="https://6e7c-14-187-237-206.ngrok-free.app/api"
// const baseURLL = "https://finalcapstonebe-aib5.onrender.com";
const baseURLL = "https://finalcapstonebe-nd0l.onrender.com";
// const baseURL = "https://946a-14-187-150-194.ngrok-free.app/api";
// const baseURL = "https://cors-anywhere.herokuapp.com/https://b732-14-187-150-194.ngrok-free.app/api";
// const baseSignalURL = "https://finalcapstonebe-aib5.onrender.com";
const baseSignalURL = "https://finalcapstonebe-nd0l.onrender.com";

// const LocalURL="https://b57e-14-187-156-252.ngrok-free.app/api"

export const queryClient = new QueryClient();

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
    register: `${baseURL}/Auth/register`,
    password: `${baseURL}/Auth/UpdatePassword`,
    AUTH: `${baseURL}/Auth/Verification`,
    Email: `${baseURL}/Auth/Email`,
    EMPLOYEE: `${baseURL}/Auth/register-for-employee`,
    Verifi: `${baseURL}/Auth/Verification-for-employee`,
  },
  Company: {
    POST: `${baseURL}/Company`,
    GET: `${baseURL}/Company`,
    PUT: `${baseURL}/Company`,
    DELETE: `${baseURL}/Company`,
    GetCompaniesbyId: `${baseURL}/Company`,
    GetSearch: `${baseURL}/Company/company-name`,
    getSeacrhByname: `${baseURLL}`,
    PUTCOMPANYSTATUS: `${baseURL}/Company/company-status`,
    PUTCompanyRejected: `${baseURL}/Company/Reject`,
  },
  JobPosts: {
    POST: `${baseURL}/JobPosts`,
    GET: `${baseURL}/JobPosts/accept`,
    PostJobPostsSkillset: `${baseURL}/JobPosts/SkillSet`,
    GetJobbyId: `${baseURL}/JobPosts`,
    GetSeekerByJobPosts: `${baseURL}/JobPosts/Id`,
    PUT: `${baseURL}/JobPosts/update`,
    DELETE:`${baseURL}/JobPosts/Soft`,
    PUTACTIVE:`${baseURL}/JobPosts/Activate`,
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
    DELETE: `${baseURL}/ExperienceDetail`,
  },
  SkillSet: {
    POST: `${baseURL}/SkillSet`,
    GET: `${baseURL}/SkillSet`,
    DELETE: `${baseURL}/SkillSet`,
  },
  Benefits: {
    POST: `${baseURL}/Benefit`,
    GET: `${baseURL}/Benefit`,
    DELETE: `${baseURL}/Benefit`,
  },
  Award: {
    POST: `${baseURL}/Awards`,
    PUT: `${baseURL}/Awards`,
    DELETE: `${baseURL}/Awards`,
  },
  Certificates: {
    POST: `${baseURL}/Certificates`,
    PUT: `${baseURL}/Certificates`,
    DELETE: `${baseURL}/Certificates`,
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
    ReadAllNotifications: `${baseURL}/JobPostActivity/notification/read-all`,
    AddUser: `${baseURL}/JobPostActivity/Add-User-To-JobPostActivity`,
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
    DELETESKILL: `${baseURL}/User/SkilSet`,
  },
  UserBenefits: {
    POST: `${baseURL}/User/Benefit`,
    DELETEBENEFIT: `${baseURL}/User/Benefit`,
  },
  UserProfile: {
    GET: `${baseURL}/User/Profile`,
  },

  CompanyFollow: {
    POST: `${baseURL}/FollowCompany`,
    GET: `${baseURL}/FollowCompany`,
    DELETE: `${baseURL}/FollowCompany`,
  },
  FavoriteJobs: {
    POST: `${baseURL}/FollowJobPost`,
    GET: `${baseURL}/FollowJobPost`,
    DELETE: `${baseURL}/FollowJobPost`,
  },
  JobsComment: {
    POST: `${baseURL}/JobPostActivityComment`,
    GET: `${baseURL}/JobPostActivityComment`,
    DELETE: `${baseURL}/JobPostActivityComment`,
    PUT: `${baseURL}/JobPostActivityComment`,
    GETBYID: `${baseURL}/JobPostActivityComment/Id`,
  },

  jobSearch: {
    POST: `${baseURL}/JobPosts/search`,
  },
  userSearch: {
    POST: `${baseURL}/User/search`,
  },
  customEmail: {
    POST: `${baseURL}/Email`,
  },
  payment: {
    POST: `${baseURL}/Payment`,
  },
  PostCVAI: {
    POST: `${baseURL}/FileHandling/Analyze`,
  },
  Subscription: {
    GET: `${baseURL}/Subscription`,
  },
  UserJobAlertCriteria: {
    POST: `${baseURL}/UserJobAlertCriteria`,
    GET: `${baseURL}/UserJobAlertCriteria`,
    DELETE: `${baseURL}/UserJobAlertCriteria`,
  },

  GetSeekers: {
    GET: `${baseURL}/User/JobSeekerRole`,
  },

  SearchQuery: {
    POST: `${baseURL}/JobPosts/SearchJobsQuery`,
  },
  TaxCode: {
    GET: `https://api.vietqr.io/v2/business`,
  },
  ReviewCompany: {
    POST: `${baseURL}/Review`,
    GETApproved: `${baseURL}/Review/GetApprovedReviewList`,
    GETPending: `${baseURL}/Review/GetPendingReviewList`,
    PUTRejected: `${baseURL}/Review/RejectReview`,
    PUTAprroved: `${baseURL}/Review/ApproveReview`,
  },

  Location: {
    GET: `${baseURL}/Location`,
    POST: `${baseURL}/Location`,
    DELETE: `${baseURL}/Location`,
    PUT: `${baseURL}/Location`,
  },

  Service: {
    GET: `${baseURL}/Service`,
    POST: `${baseURL}/Service`,
    PUT: `${baseURL}/Service`,
    DELETE: `${baseURL}/Service`,
    GETServiceById: `${baseURL}/Service`,
  },
  companyLocation: {
    GET: `${baseURLLocation}/Location`,
  },
  EmailReject:{
    POST: `${baseURL}/Email/SendEmailRejectCompany`,
  }

 
};

export const signalR = {
  employer: {
    groupNotificationsKey: `GroupReceiveMessage`,
    getNotificationsURL: `${baseSignalURL}/signalrHub`,
  },
};
