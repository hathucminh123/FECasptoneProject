import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface JobType {
    id: number;
    name: string;
    description: string;
  }
  
  interface JobLocation {
    id: number;
    district: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
    stressAddress: string;
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
    jobLocation: JobLocation | string | null; // Allow jobLocation to be either JobLocation, string, or null
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
  }
interface CompanyJobState {
  companies: Company[];
  jobPosts: JobPost[];
}

const initialState: CompanyJobState = {
  companies:[],
  jobPosts: [],
};

const companyJobSlice = createSlice({
  name: "companyJob",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setJobPosts: (state, action: PayloadAction<JobPost[]>) => {
      state.jobPosts = action.payload;
    },
  },
});

export const { setCompanies, setJobPosts } = companyJobSlice.actions;
export const selectJobs = (state: RootState) => state.companyJobs.jobPosts;
export const selectCompanies= (state: RootState) => state.companyJobs.companies;
export default companyJobSlice.reducer;
