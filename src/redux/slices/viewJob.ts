import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

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

interface JobState {
  item: JobPost[];
}

// Initial state
const initialState: JobState = {
  item: [], 
};

export const searchSlice = createSlice({
  name: "View",
  initialState,
  reducers: {

    view: (state, action: PayloadAction<JobPost>) => {
      const jobExists = state.item.find((job) => job.id === action.payload.id);
      if (!jobExists) {
        state.item.push(action.payload);
      }
    },

  
  },
});

// Export the actions for dispatching
export const { view } = searchSlice.actions;

// Selector to access the job items in the state
export const selectJob = (state: RootState) => state.view.item;


export default searchSlice.reducer;
