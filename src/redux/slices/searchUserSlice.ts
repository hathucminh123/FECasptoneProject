import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SkillSetFilter {
  skillSet: string;
  proficiencyLevel: string;
}

interface SearchFilterState {
  keyword: string;
  degree: string;
  skillSetFilters: SkillSetFilter[];
  location: string;
  cvUpdateTime: string;
  pageIndex: number;
  pageSize: number;
}

const initialState: SearchFilterState = {
  keyword: '',
  degree: '',
  skillSetFilters: [],
  location: '',
  cvUpdateTime: 'Tất cả',
  pageIndex: 1,
  pageSize: 10,
};

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setDegree: (state, action: PayloadAction<string>) => {
      state.degree = action.payload;
    },
    addSkillSetFilter: (state, action: PayloadAction<SkillSetFilter>) => {
      state.skillSetFilters.push(action.payload);
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCvUpdateTime: (state, action: PayloadAction<string>) => {
      state.cvUpdateTime = action.payload;
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.pageIndex = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setKeyword,
  setDegree,
  addSkillSetFilter,
  setLocation,
  setCvUpdateTime,
  setPageIndex,
  setPageSize,
  resetFilters,
} = searchFilterSlice.actions;

export const selectSearchFilter = (state: RootState) => state.searchFilter;

export default searchFilterSlice.reducer;
