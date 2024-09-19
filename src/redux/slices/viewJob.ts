import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


interface JobItem {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string;
}

interface JobState {
  item: JobItem[];
}

// Initial state
const initialState: JobState = {
  item: [], 
};

export const searchSlice = createSlice({
  name: "View",
  initialState,
  reducers: {

    view: (state, action: PayloadAction<JobItem>) => {
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
