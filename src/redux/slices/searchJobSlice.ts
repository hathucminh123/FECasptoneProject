import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the interface for the search state
interface SearchState {
  search: {
    keyword: string | null;
    companyNames: string[] | null;
    jobTitles: string[] | null;
    skillSets: string[] | null;
    minSalary: number | null;
    maxSalary: number | null;
    locations: string[] | null;
    cities: string[] | null;
    experience: number | null;
    jobTypes: string[] | null;
    pageIndex: number | null;
    pageSize: number | null;
  };
}

// Initial state
const initialState: SearchState = {
  search: {
    keyword: null,
    companyNames: null,
    jobTitles: null,
    skillSets: null,
    minSalary: null,
    maxSalary: null,
    locations: null,
    cities: null,
    experience: null,
    jobTypes: null,
    pageIndex: null,
    pageSize: null,
  },
};

export const searchJobSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.search.keyword = action.payload;
    },
    setCompanyNames: (state, action: PayloadAction<string>) => {
      state.search.companyNames = state.search.companyNames ? [...state.search.companyNames, action.payload] : [action.payload];
    },
    setJobTitles: (state, action: PayloadAction<string>) => {
      state.search.jobTitles = state.search.jobTitles ? [...state.search.jobTitles, action.payload] : [action.payload];
    },
    setSkillSets: (state, action: PayloadAction<string>) => {
      state.search.skillSets = state.search.skillSets ? [...state.search.skillSets, action.payload] : [action.payload];
    },
    setMinSalary: (state, action: PayloadAction<number>) => {
      state.search.minSalary = action.payload;
    },
    setMaxSalary: (state, action: PayloadAction<number>) => {
      state.search.maxSalary = action.payload;
    },
    setLocations: (state, action: PayloadAction<string>) => {
      state.search.locations = state.search.locations ? [...state.search.locations, action.payload] : [action.payload];
    },
    setCities: (state, action: PayloadAction<string>) => {
      state.search.cities = state.search.cities ? [...state.search.cities, action.payload] : [action.payload];
    },
    setExperience: (state, action: PayloadAction<number>) => {
      state.search.experience = action.payload;
    },
    setJobTypes: (state, action: PayloadAction<string>) => {
      state.search.jobTypes = state.search.jobTypes ? [...state.search.jobTypes, action.payload] : [action.payload];
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.search.pageIndex = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.search.pageSize = action.payload;
    },
  },
});

// Export the actions for dispatching
export const {
  setKeyword,
  setCompanyNames,
  setJobTitles,
  setSkillSets,
  setMinSalary,
  setMaxSalary,
  setLocations,
  setCities,
  setExperience,
  setJobTypes,
  setPageIndex,
  setPageSize,
} = searchJobSlice.actions;

// Selector to access the search state in the store
export const selectSearchJob = (state: RootState) => state.search.search;

// Export the reducer to be included in the store
export default searchJobSlice.reducer;
